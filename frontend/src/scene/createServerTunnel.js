import * as THREE from "three";

export function createServerTunnel(mobile) {
  const group = new THREE.Group();
  const depth = mobile ? 12 : 22;
  const rows = mobile ? 3 : 4;
  const count = depth * 2 * rows;

  const rackGeo = new THREE.BoxGeometry(1, 1, 1);
  const rackMat = new THREE.MeshStandardMaterial({
    color: "#101820",
    emissive: "#00ff66",
    emissiveIntensity: 0.18,
    roughness: 0.55,
    metalness: 0.45,
  });
  const racks = new THREE.InstancedMesh(rackGeo, rackMat, count);

  const lampGeo = new THREE.BoxGeometry(1, 1, 1);
  const lampMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const lamps = new THREE.InstancedMesh(lampGeo, lampMat, count);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let i = 0;
  for (let z = 0; z < depth; z += 1) {
    for (const side of [-1, 1]) {
      for (let row = 0; row < rows; row += 1) {
        dummy.position.set(side * 2.45, -1.05 + row * 0.62, -8 - z * 2.15);
        dummy.scale.set(0.95, 0.5, 0.42);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        racks.setMatrixAt(i, dummy.matrix);

        dummy.position.set(side * 1.92, -0.95 + row * 0.62, -7.78 - z * 2.15);
        dummy.scale.set(0.045, 0.26, 0.045);
        dummy.updateMatrix();
        lamps.setMatrixAt(i, dummy.matrix);
        color.set((z + row) % 6 === 0 ? "#00f0ff" : "#00ff66");
        lamps.setColorAt(i, color);
        i += 1;
      }
    }
  }
  racks.count = i;
  lamps.count = i;
  racks.instanceMatrix.needsUpdate = true;
  lamps.instanceMatrix.needsUpdate = true;
  if (lamps.instanceColor) lamps.instanceColor.needsUpdate = true;

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 78),
    new THREE.MeshStandardMaterial({ color: "#070b16", metalness: 0.85, roughness: 0.32 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.42, -30);

  group.add(floor, racks, lamps);

  return {
    object: group,
    update() {},
    dispose() {
      rackGeo.dispose();
      rackMat.dispose();
      lampGeo.dispose();
      lampMat.dispose();
      floor.geometry.dispose();
      floor.material.dispose();
    },
  };
}
