#!/usr/bin/env python3
"""Génère la baie de dépôts publics affichée sur le profil GitHub.

Une image par langue : rack.svg (français) et rack.en.svg (anglais).
Bibliothèque standard uniquement, aucun service tiers : les données viennent
de l'API GitHub et le SVG est écrit ici.

    python3 scripts/build_rack.py

GITHUB_TOKEN est facultatif. Sans lui, l'API limite à 60 requêtes par heure.
"""

import json
import math
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "rack.json"
API = "https://api.github.com"

LOCALES = {
    "fr": {
        "output": "rack.svg",
        "months": ["janv.", "févr.", "mars", "avr.", "mai", "juin",
                   "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        "heading": "BAIE PUBLIQUE",
        "last_push": "dernier push : {date}",
        "legend": {"live": "actif, moins de 30 j", "warm": "moins de 6 mois",
                   "idle": "au repos", "offline": "hors ligne"},
        "bars": "barres : commits par semaine, {weeks} sem.",
        "title": "Baie de dépôts publics de {user}",
        "desc": "Dépôts publics, du plus récent au plus ancien : {names}. "
                "Le reste du travail tourne sur des réseaux isolés et n'est pas publié.",
    },
    "en": {
        "output": "rack.en.svg",
        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "heading": "PUBLIC RACK",
        "last_push": "last push: {date}",
        "legend": {"live": "active, under 30 d", "warm": "under 6 months",
                   "idle": "idle", "offline": "offline"},
        "bars": "bars: commits per week, {weeks} wk",
        "title": "Rack of {user}'s public repositories",
        "desc": "Public repositories, most recent first: {names}. "
                "The rest of the work runs on isolated networks and is not published.",
    },
}

WIDTH = 840
UNIT_X = 52
UNIT_W = 736
UNIT_H = 54
UNIT_GAP = 8
HEADER_H = 66
FOOTER_H = 46
BAR_W = 5
BAR_GAP = 3
BAR_MAX_H = 22

MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
SANS = "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"

LED_COLORS = {"live": "#00ff66", "warm": "#00f0ff", "idle": "#3a4a66", "offline": "#ff3355"}


def api_get(path, params=None):
    url = f"{API}{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "profile-rack",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def parse_time(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def week_start(day):
    return day - timedelta(days=day.weekday())


def list_repos(user, exclude, limit):
    repos = api_get(f"/users/{user}/repos", {"per_page": 100, "type": "owner", "sort": "pushed"})
    hidden = set(exclude) | {user}
    kept = [
        repo for repo in repos
        if not repo["fork"] and not repo["archived"] and not repo["private"]
        and repo["name"] not in hidden
    ]
    kept.sort(key=lambda repo: repo["pushed_at"], reverse=True)
    return kept[:limit]


def weekly_commits(user, name, weeks, today):
    """Nombre de commits par semaine, de la plus ancienne à la semaine en cours."""
    first = week_start(today) - timedelta(weeks=weeks - 1)
    since = datetime(first.year, first.month, first.day, tzinfo=timezone.utc).isoformat()
    counts = [0] * weeks
    for page in range(1, 6):
        try:
            commits = api_get(
                f"/repos/{user}/{name}/commits",
                {"since": since, "per_page": 100, "page": page},
            )
        except urllib.error.HTTPError as error:
            if error.code == 409:  # dépôt vide
                break
            raise
        for commit in commits:
            day = parse_time(commit["commit"]["committer"]["date"]).date()
            index = (week_start(day) - first).days // 7
            if 0 <= index < weeks:
                counts[index] += 1
        if len(commits) < 100:
            break
    return counts


def recency(pushed, today):
    age = (today - pushed).days
    if age <= 30:
        return "live"
    if age <= 182:
        return "warm"
    return "idle"


def short_date(day, locale):
    return f"{day.day} {locale['months'][day.month - 1]} {day.year}"


def localized(value, lang):
    """Accepte un texte simple ou un dictionnaire {"fr": ..., "en": ...}."""
    if isinstance(value, dict):
        return value.get(lang) or value.get("fr") or ""
    return value or ""


def shorten(text, limit):
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def led(x, y, state, index):
    color = LED_COLORS[state]
    delay = f"animation-delay:-{index * 0.43:.2f}s"
    return (
        f'<circle cx="{x}" cy="{y}" r="9" fill="{color}" opacity="0.18" filter="url(#halo)"/>'
        f'<circle class="led led-{state}" style="{delay}" cx="{x}" cy="{y}" r="4" fill="{color}"/>'
    )


def rail_holes(x, top):
    return "".join(
        f'<circle cx="{x}" cy="{top + dy}" r="2" fill="#050814" stroke="#1b2a44"/>'
        for dy in (13, UNIT_H - 13)
    )


def render_unit(index, top, unit, scale_max):
    right = UNIT_X + UNIT_W
    middle = top + UNIT_H // 2
    parts = [rail_holes(32, top), rail_holes(WIDTH - 32, top)]

    if unit["state"] == "offline":
        parts.append(
            f'<rect x="{UNIT_X}" y="{top}" width="{UNIT_W}" height="{UNIT_H}" rx="4" '
            f'fill="url(#hatch)" stroke="#ff3355" stroke-opacity="0.45" stroke-dasharray="5 4"/>'
        )
    else:
        parts.append(
            f'<rect x="{UNIT_X}" y="{top}" width="{UNIT_W}" height="{UNIT_H}" rx="4" '
            f'fill="#070b19" stroke="#00f0ff" stroke-opacity="0.35"/>'
        )

    parts.append(led(UNIT_X + 22, middle, unit["state"], index))
    parts.append(
        f'<text x="{UNIT_X + 44}" y="{top + 23}" font-family="{MONO}" font-size="14" '
        f'font-weight="600" fill="#e8f1ff">{escape(unit["name"])}</text>'
    )
    parts.append(
        f'<text x="{UNIT_X + 44}" y="{top + 41}" font-family="{SANS}" font-size="12" '
        f'fill="#8fa3bf">{escape(unit["text"])}</text>'
    )

    if unit["state"] == "offline":
        parts.append(
            f'<text x="{right - 18}" y="{middle + 4}" text-anchor="end" font-family="{MONO}" '
            f'font-size="12" fill="#ff8095">{escape(unit["tag"])}</text>'
        )
        return "".join(parts)

    bars_x = right - 250
    for week, count in enumerate(unit["weeks"]):
        x = bars_x + week * (BAR_W + BAR_GAP)
        if count:
            height = max(3, round(BAR_MAX_H * math.sqrt(count / scale_max)))
            fill = "#00f0ff"
        else:
            height, fill = 2, "#1b2a44"
        parts.append(
            f'<rect x="{x}" y="{top + 39 - height}" width="{BAR_W}" height="{height}" '
            f'rx="1" fill="{fill}"/>'
        )

    parts.append(
        f'<text x="{right - 18}" y="{top + 23}" text-anchor="end" font-family="{MONO}" '
        f'font-size="12" fill="#8fa3bf">{escape(unit["language"])}</text>'
    )
    parts.append(
        f'<text x="{right - 18}" y="{top + 41}" text-anchor="end" font-family="{MONO}" '
        f'font-size="11" fill="#5f7391">{escape(unit["date"])}</text>'
    )
    return "".join(parts)


def render_legend(y, weeks, locale):
    parts = []
    x = UNIT_X + 6
    for state, label in locale["legend"].items():
        parts.append(f'<circle cx="{x}" cy="{y - 4}" r="3.5" fill="{LED_COLORS[state]}"/>')
        parts.append(
            f'<text x="{x + 10}" y="{y}" font-family="{MONO}" font-size="11" '
            f'fill="#5f7391">{label}</text>'
        )
        x += 24 + len(label) * 6.7
    parts.append(
        f'<text x="{UNIT_X + UNIT_W - 6}" y="{y}" text-anchor="end" font-family="{MONO}" '
        f'font-size="11" fill="#5f7391">{escape(locale["bars"].format(weeks=weeks))}</text>'
    )
    return "".join(parts)


def render(user, units, weeks, last_push, locale):
    body_h = len(units) * (UNIT_H + UNIT_GAP) - UNIT_GAP
    height = HEADER_H + body_h + FOOTER_H
    scale_max = max([4] + [count for unit in units for count in unit.get("weeks", [])])
    right = UNIT_X + UNIT_W
    names = ", ".join(unit["name"] for unit in units if unit["state"] != "offline")
    heading = locale["heading"]
    # 12 px en chasse fixe : environ 7,2 px par caractère, plus l'interlettrage.
    heading_w = len(heading) * (7.2 + 2.4)

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {height}" '
        f'width="{WIDTH}" height="{height}" role="img" aria-labelledby="rack-title rack-desc">',
        f'<title id="rack-title">{escape(locale["title"].format(user=user))}</title>',
        f'<desc id="rack-desc">{escape(locale["desc"].format(names=names))}</desc>',
        "<defs>",
        '<filter id="halo" x="-100%" y="-100%" width="300%" height="300%">'
        '<feGaussianBlur stdDeviation="3"/></filter>',
        '<pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" '
        'patternTransform="rotate(45)"><rect width="8" height="8" fill="#0a0d1c"/>'
        '<rect width="2" height="8" fill="#ff3355" opacity="0.10"/></pattern>',
        "<style>",
        "@keyframes pulse{0%,100%{opacity:1}50%{opacity:.22}}",
        "@keyframes flow{to{stroke-dashoffset:-260}}",
        ".led-live{animation:pulse 1.7s ease-in-out infinite}",
        ".led-warm{animation:pulse 4.6s ease-in-out infinite}",
        ".flow{stroke-dasharray:46 214;animation:flow 3.2s linear infinite}",
        "@media (prefers-reduced-motion:reduce){.led,.flow{animation:none}}",
        "</style>",
        "</defs>",
        f'<rect x="0.5" y="0.5" width="{WIDTH - 1}" height="{height - 1}" rx="10" '
        f'fill="#050814" stroke="#16233f"/>',
        f'<text x="{UNIT_X}" y="30" font-family="{MONO}" font-size="12" letter-spacing="2.4" '
        f'fill="#00f0ff">{escape(heading)}</text>',
        f'<text x="{UNIT_X + heading_w + 8:.0f}" y="30" font-family="{MONO}" font-size="12" '
        f'fill="#5f7391">github.com/{escape(user)}</text>',
        f'<text x="{right}" y="30" text-anchor="end" font-family="{MONO}" font-size="12" '
        f'fill="#5f7391">'
        f'{escape(locale["last_push"].format(date=short_date(last_push, locale)))}</text>',
        f'<line x1="{UNIT_X}" y1="46" x2="{right}" y2="46" stroke="#16233f"/>',
        f'<line class="flow" x1="{UNIT_X}" y1="46" x2="{right}" y2="46" stroke="#00f0ff" '
        f'stroke-opacity="0.85"/>',
    ]
    for x in (24, WIDTH - 40):
        out.append(
            f'<rect x="{x}" y="{HEADER_H - 6}" width="16" height="{body_h + 12}" rx="2" '
            f'fill="#0a1022" stroke="#16233f"/>'
        )
    for index, unit in enumerate(units):
        top = HEADER_H + index * (UNIT_H + UNIT_GAP)
        out.append(render_unit(index, top, unit, scale_max))
    out.append(render_legend(HEADER_H + body_h + 29, weeks, locale))
    out.append("</svg>")
    return "\n".join(out) + "\n"


def main():
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    user = config["user"]
    weeks = config.get("weeks", 12)
    today = datetime.now(timezone.utc).date()

    repos = list_repos(user, config.get("exclude", []), config.get("max_units", 6))
    if not repos:
        sys.exit(f"Aucun dépôt public à afficher pour {user}.")

    for repo in repos:
        repo["pushed"] = parse_time(repo["pushed_at"]).date()
        repo["weeks"] = weekly_commits(user, repo["name"], weeks, today)

    descriptions = config.get("descriptions", {})
    offline = config.get("offline")
    last_push = repos[0]["pushed"]

    for lang, locale in LOCALES.items():
        units = [{
            "name": repo["name"],
            "text": shorten(
                localized(descriptions.get(repo["name"]), lang) or repo["description"] or "", 62
            ),
            "language": repo["language"] or "",
            "date": short_date(repo["pushed"], locale),
            "state": recency(repo["pushed"], today),
            "weeks": repo["weeks"],
        } for repo in repos]
        if offline:
            units.append({
                "name": localized(offline["name"], lang),
                "text": shorten(localized(offline["text"], lang), 84),
                "tag": localized(offline.get("tag"), lang),
                "state": "offline",
            })
        output = ROOT / locale["output"]
        output.write_text(render(user, units, weeks, last_push, locale), encoding="utf-8")
        print(f"{output.name} : {len(units)} unités")


if __name__ == "__main__":
    main()
