import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function buildLinks(base, count, maxDist, maxPerNode) {
  const pairs = [];
  const seen = new Set();
  const maxDist2 = maxDist * maxDist;

  for (let i = 0; i < count; i++) {
    const ix = i * 3;
    const candidates = [];
    for (let j = 0; j < count; j++) {
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
    for (let k = 0; k < n; k++) {
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

const NeuralField = () => {
  const mountRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return;

    const mobile = isMobile();
    const count = mobile ? 140 : 320;
    const maxLinks = mobile ? 2 : 3;
    const maxDist = mobile ? 2.4 : 2.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      40
    );
    camera.position.set(0, 0, 8.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !mobile,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const base = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#38bdf8");
    const indigo = new THREE.Color("#818cf8");
    const mix = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Bias toward the right so the field doesn't fight the title.
      base[ix] = (Math.random() - 0.22) * 14;
      base[ix + 1] = (Math.random() - 0.5) * 8.2;
      base[ix + 2] = (Math.random() - 0.5) * 7;
      pos[ix] = base[ix];
      pos[ix + 1] = base[ix + 1];
      pos[ix + 2] = base[ix + 2];
      phases[i] = Math.random() * Math.PI * 2;
      mix.copy(cyan).lerp(indigo, Math.random());
      colors[ix] = mix.r;
      colors[ix + 1] = mix.g;
      colors[ix + 2] = mix.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: mobile ? 0.055 : 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const linkIdx = buildLinks(base, count, maxDist, maxLinks);
    const linkCount = linkIdx.length / 2;
    const linePos = new Float32Array(linkCount * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: mobile ? 0.09 : 0.13,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const hubs = [];
    const hubCount = mobile ? 2 : 4;
    for (let h = 0; h < hubCount; h++) {
      const geo = new THREE.IcosahedronGeometry(0.18 + h * 0.04, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: h % 2 ? 0x38bdf8 : 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        2.2 + h * 1.3,
        (h - 1.4) * 1.1,
        -0.4 + (h % 2) * -1.2
      );
      scene.add(mesh);
      hubs.push(mesh);
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    let hidden = document.hidden;
    const onVis = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);
    onResize();

    let raf = 0;
    let t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || hidden) return;

      t += 0.0065;
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const ph = phases[i];
        pos[ix] = base[ix] + Math.sin(t * 0.7 + ph) * 0.22;
        pos[ix + 1] = base[ix + 1] + Math.cos(t * 0.55 + ph * 1.3) * 0.18;
        pos[ix + 2] = base[ix + 2] + Math.sin(t * 0.4 + ph * 0.7) * 0.2;
      }
      pointsGeo.attributes.position.needsUpdate = true;

      for (let l = 0; l < linkCount; l++) {
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
      lineGeo.attributes.position.needsUpdate = true;

      hubs.forEach((mesh, i) => {
        mesh.rotation.y += 0.003 + i * 0.001;
        mesh.rotation.x += 0.0015;
        const s = 1 + Math.sin(t * 0.8 + i) * 0.06;
        mesh.scale.setScalar(s);
      });

      camera.position.x = mouse.x * 0.55;
      camera.position.y = mouse.y * 0.28;
      camera.lookAt(1.4, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      hubs.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none three-canvas"
      aria-hidden="true"
    />
  );
};

export default NeuralField;
