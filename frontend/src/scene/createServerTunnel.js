import * as THREE from "three";

const CYAN = new THREE.Color("#00f0ff");
const RED = new THREE.Color("#ff3355");

function pushTransformed(target, attribute, matrix) {
  const v = new THREE.Vector3();
  for (let i = 0; i < attribute.count; i += 1) {
    v.fromBufferAttribute(attribute, i).applyMatrix4(matrix);
    target.push(v.x, v.y, v.z);
  }
}

export function createServerTunnel(mobile) {
  const group = new THREE.Group();
  const bays = mobile ? 8 : 14;
  const pitch = 1.42;
  const zStart = -6.2;
  const dummy = new THREE.Object3D();

  const rackGeo = new THREE.BoxGeometry(0.34, 2.52, 1.02);
  const rackMat = new THREE.MeshPhysicalMaterial({
    color: 0x070b19,
    metalness: 0.95,
    roughness: 0.1,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  });
  const racks = new THREE.InstancedMesh(rackGeo, rackMat, bays * 2);
  racks.frustumCulled = false;

  const edgeSource = new THREE.EdgesGeometry(rackGeo);
  const edgeAttr = edgeSource.getAttribute("position");
  const edgeCoords = [];
  const ledCoords = [];
  const ledBase = [];
  const ledPhase = [];

  let index = 0;
  for (let bay = 0; bay < bays; bay += 1) {
    const z = zStart - bay * pitch;
    for (const side of [-1, 1]) {
      dummy.position.set(side * 2.18, 0.02, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      racks.setMatrixAt(index, dummy.matrix);
      pushTransformed(edgeCoords, edgeAttr, dummy.matrix);

      const faceX = side * (2.18 - 0.2);
      for (let led = 0; led < 8; led += 1) {
        ledCoords.push(faceX, -1.05 + led * 0.3, z - 0.42);
        const alert = (bay + led) % 9 === 0;
        const color = alert ? RED : CYAN;
        ledBase.push(color.r, color.g, color.b);
        ledPhase.push(Math.random() * Math.PI * 2);
      }
      index += 1;
    }
  }
  racks.count = index;
  racks.instanceMatrix.needsUpdate = true;

  const edgesGeo = new THREE.BufferGeometry();
  edgesGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgeCoords, 3));
  const edges = new THREE.LineSegments(
    edgesGeo,
    new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      toneMapped: false,
    })
  );
  edges.frustumCulled = false;

  const ledGeo = new THREE.BufferGeometry();
  ledGeo.setAttribute("position", new THREE.Float32BufferAttribute(ledCoords, 3));
  const ledColors = new Float32Array(ledBase);
  ledGeo.setAttribute("color", new THREE.BufferAttribute(ledColors, 3));
  const leds = new THREE.Points(
    ledGeo,
    new THREE.PointsMaterial({
      size: mobile ? 0.045 : 0.034,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  leds.frustumCulled = false;

  const columnCount = mobile ? 5 : 8;
  const dropsPerColumn = mobile ? 5 : 8;
  const dropCount = columnCount * dropsPerColumn;
  const dropPos = new Float32Array(dropCount * 6);
  const drops = [];
  for (let col = 0; col < columnCount; col += 1) {
    const x = -0.95 + (col / Math.max(columnCount - 1, 1)) * 1.9;
    const z = zStart - Math.random() * bays * pitch;
    for (let d = 0; d < dropsPerColumn; d += 1) {
      drops.push({
        x: x + (Math.random() - 0.5) * 0.08,
        y: (Math.random() - 0.5) * 2.2,
        z: z - d * 1.7,
        len: 0.35 + Math.random() * 0.9,
        speed: 1.6 + Math.random() * 2.8,
      });
    }
  }
  const dropGeo = new THREE.BufferGeometry();
  dropGeo.setAttribute("position", new THREE.BufferAttribute(dropPos, 3));
  const dropLines = new THREE.LineSegments(
    dropGeo,
    new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  dropLines.frustumCulled = false;

  const packetCount = mobile ? 70 : 180;
  const packetPos = new Float32Array(packetCount * 3);
  const packets = Array.from({ length: packetCount }, () => ({
    x: (Math.random() - 0.5) * 1.7,
    y: (Math.random() - 0.5) * 1.8,
    z: zStart - Math.random() * bays * pitch,
    speed: 10 + Math.random() * 18,
  }));
  const packetGeo = new THREE.BufferGeometry();
  packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
  const packetPoints = new THREE.Points(
    packetGeo,
    new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: mobile ? 0.045 : 0.03,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  packetPoints.frustumCulled = false;

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, bays * pitch + 10),
    new THREE.MeshPhysicalMaterial({
      color: 0x070b19,
      metalness: 0.95,
      roughness: 0.12,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.32, zStart - (bays * pitch) / 2);

  group.add(floor, racks, edges, leds, dropLines, packetPoints);

  const far = zStart - bays * pitch - 1.5;
  const writeDrops = () => {
    drops.forEach((drop, i) => {
      const o = i * 6;
      dropPos[o] = drop.x;
      dropPos[o + 1] = drop.y;
      dropPos[o + 2] = drop.z;
      dropPos[o + 3] = drop.x;
      dropPos[o + 4] = drop.y - drop.len;
      dropPos[o + 5] = drop.z;
    });
    dropGeo.attributes.position.needsUpdate = true;
  };
  const writePackets = () => {
    packets.forEach((packet, i) => {
      packetPos[i * 3] = packet.x;
      packetPos[i * 3 + 1] = packet.y;
      packetPos[i * 3 + 2] = packet.z;
    });
    packetGeo.attributes.position.needsUpdate = true;
  };
  writeDrops();
  writePackets();

  return {
    object: group,
    update(t) {
      for (let n = 0; n < ledPhase.length; n += 1) {
        const wave = 0.5 + 0.5 * Math.sin(t * 1.7 + ledPhase[n]);
        const blink = 0.28 + 0.72 * wave * wave;
        ledColors[n * 3] = ledBase[n * 3] * blink;
        ledColors[n * 3 + 1] = ledBase[n * 3 + 1] * blink;
        ledColors[n * 3 + 2] = ledBase[n * 3 + 2] * blink;
      }
      ledGeo.attributes.color.needsUpdate = true;

      drops.forEach((drop) => {
        drop.y -= drop.speed * 0.016;
        if (drop.y < -1.45) drop.y = 1.45 + Math.random() * 0.4;
      });
      writeDrops();

      packets.forEach((packet) => {
        packet.z += packet.speed * 0.016;
        if (packet.z > 2.2) packet.z = far - Math.random() * 3;
      });
      writePackets();
    },
    dispose() {
      rackGeo.dispose();
      rackMat.dispose();
      edgeSource.dispose();
      edgesGeo.dispose();
      edges.material.dispose();
      ledGeo.dispose();
      leds.material.dispose();
      dropGeo.dispose();
      dropLines.material.dispose();
      packetGeo.dispose();
      packetPoints.material.dispose();
      floor.geometry.dispose();
      floor.material.dispose();
    },
  };
}
