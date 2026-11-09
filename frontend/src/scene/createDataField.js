import * as THREE from "three";

function buildLinks(base, count, maxDist, maxPerNode) {
  const pairs = [];
  const seen = new Set();
  const maxDist2 = maxDist * maxDist;

  for (let i = 0; i < count; i += 1) {
    const ix = i * 3;
    const candidates = [];
    for (let j = 0; j < count; j += 1) {
      if (i === j) continue;
      const jx = j * 3;
      const dx = base[ix] - base[jx];
      const dy = base[ix + 1] - base[jx + 1];
      const dz = base[ix + 2] - base[jx + 2];
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < maxDist2) candidates.push({ j, d2 });
    }
    candidates.sort((a, b) => a.d2 - b.d2);
    const n = Math.min(maxPerNode, candidates.length);
    for (let k = 0; k < n; k += 1) {
      const a = Math.min(i, candidates[k].j);
      const b = Math.max(i, candidates[k].j);
      const key = `${a}:${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push(a, b);
      }
    }
  }
  return pairs;
}

export function createDataField(mobile) {
  const count = mobile ? 110 : 240;
  const base = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color("#00f0ff");
  const green = new THREE.Color("#00ff66");
  const mix = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const ix = i * 3;
    base[ix] = (Math.random() - 0.35) * 14;
    base[ix + 1] = (Math.random() - 0.5) * 7.2;
    base[ix + 2] = (Math.random() - 0.15) * 16 - 2;
    pos[ix] = base[ix];
    pos[ix + 1] = base[ix + 1];
    pos[ix + 2] = base[ix + 2];
    phases[i] = Math.random() * Math.PI * 2;
    mix.copy(cyan).lerp(green, Math.random() * 0.65);
    colors[ix] = mix.r;
    colors[ix + 1] = mix.g;
    colors[ix + 2] = mix.b;
  }

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const pointsMat = new THREE.PointsMaterial({
    size: mobile ? 0.055 : 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);

  let lines = null;
  let linkIdx = null;
  let linePos = null;
  if (!mobile) {
    linkIdx = buildLinks(base, count, 2.35, 2);
    linePos = new Float32Array((linkIdx.length / 2) * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x67f7ff,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    lines = new THREE.LineSegments(linesGeo, lineMat);
    points.add(lines);
  }

  return {
    object: points,
    update(t) {
      for (let i = 0; i < count; i += 1) {
        const ix = i * 3;
        const ph = phases[i];
        pos[ix] = base[ix] + Math.sin(t * 0.45 + ph) * 0.16;
        pos[ix + 1] = base[ix + 1] + Math.cos(t * 0.35 + ph) * 0.12;
        pos[ix + 2] = base[ix + 2] + Math.sin(t * 0.25 + ph * 0.7) * 0.14;
      }
      pointsGeo.attributes.position.needsUpdate = true;
      if (lines && linkIdx && linePos) {
        const linkCount = linkIdx.length / 2;
        for (let l = 0; l < linkCount; l += 1) {
          const a = linkIdx[l * 2] * 3;
          const b = linkIdx[l * 2 + 1] * 3;
          const o = l * 6;
          linePos[o] = pos[a];
          linePos[o + 1] = pos[a + 1];
          linePos[o + 2] = pos[a + 2];
          linePos[o + 3] = pos[b];
          linePos[o + 4] = pos[b + 1];
          linePos[o + 5] = pos[b + 2];
        }
        lines.geometry.attributes.position.needsUpdate = true;
      }
      points.rotation.y = Math.sin(t * 0.05) * 0.04;
    },
    dispose() {
      pointsGeo.dispose();
      pointsMat.dispose();
      if (lines) {
        lines.geometry.dispose();
        lines.material.dispose();
      }
    },
  };
}
