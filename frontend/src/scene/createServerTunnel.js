import * as THREE from "three";

const CYAN = new THREE.Color("#00f0ff");
const RED = new THREE.Color("#ff3355");

export function createServerTunnel(mobile) {
  const group = new THREE.Group();
  const bays = mobile ? 10 : 18;
  const span = 2.35;
  const length = bays * span;
  const zStart = -5.2;

  const wallGeo = new THREE.PlaneGeometry(length, 2.7);
  const wallMat = new THREE.MeshPhysicalMaterial({
    color: 0x050814,
    metalness: 0.9,
    roughness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55,
  });
  const walls = [-1, 1].map((side) => {
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(side * 2.2, 0.02, zStart - length / 2);
    wall.rotation.y = side * Math.PI / 2;
    wall.frustumCulled = false;
    return wall;
  });

  const frame = [];
  for (let bay = 0; bay <= bays; bay += 1) {
    const z = zStart - bay * span;
    for (const x of [-2.2, 2.2]) {
      frame.push(x, -1.28, z, x, 1.32, z);
    }
  }
  for (let slot = 0; slot < 6; slot += 1) {
    const y = -1.05 + slot * 0.44;
    for (const x of [-2.2, 2.2]) {
      frame.push(x, y, zStart, x, y, zStart - length);
    }
  }
  const frameGeo = new THREE.BufferGeometry();
  frameGeo.setAttribute("position", new THREE.Float32BufferAttribute(frame, 3));
  const frames = new THREE.LineSegments(
    frameGeo,
    new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
      toneMapped: false,
    })
  );
  frames.frustumCulled = false;

  const ledCoords = [];
  const ledBase = [];
  const ledPhase = [];
  for (let bay = 0; bay < bays; bay += 1) {
    const z = zStart - bay * span - span * 0.5;
    for (const side of [-1, 1]) {
      for (let slot = 0; slot < 6; slot += 1) {
        ledCoords.push(side * 2.05, -1.05 + slot * 0.44, z);
        const alert = (bay * 3 + slot) % 13 === 0;
        const color = alert ? RED : CYAN;
        ledBase.push(color.r, color.g, color.b);
        ledPhase.push(Math.random() * Math.PI * 2);
      }
    }
  }
  const ledGeo = new THREE.BufferGeometry();
  ledGeo.setAttribute("position", new THREE.Float32BufferAttribute(ledCoords, 3));
  const ledColors = new Float32Array(ledBase);
  ledGeo.setAttribute("color", new THREE.BufferAttribute(ledColors, 3));
  const leds = new THREE.Points(
    ledGeo,
    new THREE.PointsMaterial({
      size: mobile ? 0.05 : 0.038,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  leds.frustumCulled = false;

  const streakCount = mobile ? 48 : 150;
  const streakPos = new Float32Array(streakCount * 6);
  const streaks = Array.from({ length: streakCount }, () => ({
    x: (Math.random() - 0.5) * 1.2,
    y: (Math.random() - 0.5) * 1.55,
    z: zStart - Math.random() * length,
    len: 0.7 + Math.random() * 2.2,
    speed: 8 + Math.random() * 16,
  }));
  const streakGeo = new THREE.BufferGeometry();
  streakGeo.setAttribute("position", new THREE.BufferAttribute(streakPos, 3));
  const streakLines = new THREE.LineSegments(
    streakGeo,
    new THREE.LineBasicMaterial({
      color: 0x9af8ff,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    })
  );
  streakLines.frustumCulled = false;

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, length + 8),
    new THREE.MeshPhysicalMaterial({
      color: 0x050814,
      metalness: 0.92,
      roughness: 0.14,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.32, zStart - length / 2);

  const railCoords = [];
  for (const x of [-0.7, 0.7]) {
    railCoords.push(x, -1.3, 2, x, -1.3, zStart - length);
  }
  const railsGeo = new THREE.BufferGeometry();
  railsGeo.setAttribute("position", new THREE.Float32BufferAttribute(railCoords, 3));
  const rails = new THREE.LineSegments(
    railsGeo,
    new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.3,
      toneMapped: false,
    })
  );

  group.add(floor, ...walls, frames, leds, streakLines, rails);

  const writeStreaks = () => {
    streaks.forEach((streak, s) => {
      const o = s * 6;
      streakPos[o] = streak.x;
      streakPos[o + 1] = streak.y;
      streakPos[o + 2] = streak.z;
      streakPos[o + 3] = streak.x;
      streakPos[o + 4] = streak.y;
      streakPos[o + 5] = streak.z - streak.len;
    });
    streakGeo.attributes.position.needsUpdate = true;
  };
  writeStreaks();

  const far = zStart - length - 2;
  return {
    object: group,
    update(t) {
      for (let n = 0; n < ledPhase.length; n += 1) {
        const blink = 0.18 + 0.82 * (0.5 + 0.5 * Math.sin(t * 3.6 + ledPhase[n]));
        ledColors[n * 3] = ledBase[n * 3] * blink;
        ledColors[n * 3 + 1] = ledBase[n * 3 + 1] * blink;
        ledColors[n * 3 + 2] = ledBase[n * 3 + 2] * blink;
      }
      ledGeo.attributes.color.needsUpdate = true;

      streaks.forEach((streak) => {
        streak.z += streak.speed * 0.016;
        if (streak.z > 2.5) streak.z = far - Math.random() * 4;
      });
      writeStreaks();
    },
    dispose() {
      wallGeo.dispose();
      wallMat.dispose();
      frameGeo.dispose();
      frames.material.dispose();
      ledGeo.dispose();
      leds.material.dispose();
      streakGeo.dispose();
      streakLines.material.dispose();
      floor.geometry.dispose();
      floor.material.dispose();
      railsGeo.dispose();
      rails.material.dispose();
    },
  };
}
