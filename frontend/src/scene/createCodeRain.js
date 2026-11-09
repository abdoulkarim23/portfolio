import * as THREE from "three";

function makeCodeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "13px monospace";
  const glyphs = ["0", "1", "00", "01", "10", "11", "2.0", "0.0", "1.3"];

  for (let col = 0; col < 7; col += 1) {
    for (let row = 0; row < 40; row += 1) {
      const hot = Math.random() < 0.07;
      ctx.fillStyle = hot ? "rgba(255, 148, 64, 0.95)" : "rgba(0, 240, 255, 0.82)";
      ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], 6 + col * 36, 18 + row * 12);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function createCodeRain() {
  const group = new THREE.Group();
  const texture = makeCodeTexture();
  const geo = new THREE.PlaneGeometry(1.7, 3.4);
  const mats = [];

  for (let i = 0; i < 8; i += 1) {
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (i % 2 === 0 ? -1 : 1) * (3.4 + (i % 4) * 0.85),
      (i - 3.5) * 0.48,
      -3.2 - (i % 5) * 1.15
    );
    mesh.rotation.set(0, i % 2 === 0 ? 0.42 : -0.42, (i - 4) * 0.03);
    mesh.scale.setScalar(1.35 + (i % 3) * 0.28);
    group.add(mesh);
  }

  return {
    object: group,
    update(t) {
      group.position.y = Math.sin(t * 0.15) * 0.12;
    },
    dispose() {
      geo.dispose();
      texture.dispose();
      mats.forEach((mat) => mat.dispose());
    },
  };
}
