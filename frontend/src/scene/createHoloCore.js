import * as THREE from "three";

export function createHoloCore() {
  const group = new THREE.Group();
  group.position.set(2.85, 0.2, 0.15);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.92, 1),
    new THREE.MeshBasicMaterial({
      color: "#00f0ff",
      wireframe: true,
      transparent: true,
      opacity: 0.42,
      toneMapped: false,
    })
  );
  const inner = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.46, 0),
    new THREE.MeshBasicMaterial({
      color: "#00ff66",
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      toneMapped: false,
    })
  );
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.012, 12, 96),
    new THREE.MeshBasicMaterial({
      color: "#00f0ff",
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
    })
  );
  ring.rotation.x = Math.PI / 2.5;
  group.add(shell, inner, ring);

  return {
    object: group,
    update(t) {
      group.rotation.y = t * 0.32;
      group.position.y = 0.2 + Math.sin(t * 0.7) * 0.07;
      inner.rotation.y = -t * 0.5;
      inner.rotation.x = t * 0.18;
      ring.rotation.z = t * 0.2;
    },
    dispose() {
      [shell, inner, ring].forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    },
  };
}
