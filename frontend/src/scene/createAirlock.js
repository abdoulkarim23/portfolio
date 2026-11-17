import * as THREE from "three";

const COPPER = 0xc4845a;

function pushRect(coords, z, w, h) {
  const x = w / 2;
  const y = h / 2;
  const corners = [
    [-x, -y],
    [x, -y],
    [x, y],
    [-x, y],
  ];
  for (let i = 0; i < 4; i += 1) {
    const a = corners[i];
    const b = corners[(i + 1) % 4];
    coords.push(a[0], a[1], z, b[0], b[1], z);
  }
}

export function createAirlock() {
  const coords = [];
  const frames = [
    { z: 12.2, w: 7.4, h: 4.6 },
    { z: 8.4, w: 6.4, h: 4.0 },
    { z: 4.6, w: 5.6, h: 3.5 },
    { z: 0.8, w: 4.8, h: 3.1 },
  ];
  frames.forEach((frame) => pushRect(coords, frame.z, frame.w, frame.h));

  const first = frames[0];
  const last = frames[frames.length - 1];
  const corners = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  corners.forEach(([sx, sy]) => {
    coords.push(
      sx * first.w / 2,
      sy * first.h / 2,
      first.z,
      sx * last.w / 2,
      sy * last.h / 2,
      last.z
    );
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
  const lines = new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({
      color: COPPER,
      transparent: true,
      opacity: 0.72,
      toneMapped: false,
    })
  );
  lines.frustumCulled = false;

  return {
    object: lines,
    update() {},
    dispose() {
      geometry.dispose();
      lines.material.dispose();
    },
  };
}
