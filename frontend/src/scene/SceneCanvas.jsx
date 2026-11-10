import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { scrollMotion } from "./scrollMotion";
import { createDataField } from "./createDataField";
import { createCodeRain } from "./createCodeRain";
import { createServerTunnel } from "./createServerTunnel";
import { createHoloCore } from "./createHoloCore";

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

const SceneCanvas = () => {
  const mountRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? isMobileViewport() : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onMq = () => setMobile(mq.matches);
    const onMove = (e) => {
      scrollMotion.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollMotion.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    mq.addEventListener("change", onMq);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050814, 0.04);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xd9fff8, 0.75);
    key.position.set(1.5, 3.5, 6);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
    camera.position.set(0, 0.35, 7.4);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !mobile,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }
    renderer.setClearColor("#050814");
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5));
    mount.appendChild(renderer.domElement);

    const parts = [createDataField(mobile), createServerTunnel(mobile)];
    if (!mobile) {
      parts.push(createCodeRain(), createHoloCore());
    }
    parts.forEach((part) => scene.add(part.object));

    let composer = null;
    if (!mobile) {
      composer = new EffectComposer(renderer);
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(
        new UnrealBloomPass(new THREE.Vector2(256, 256), 0.72, 0.42, 0.28)
      );
      composer.addPass(new OutputPass());
    }

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (composer) {
        composer.setPixelRatio(renderer.getPixelRatio());
        composer.setSize(w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const started = performance.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const t = (performance.now() - started) / 1000;
      const m = scrollMotion;
      m.mouseX += (m.targetX - m.mouseX) * 0.045;
      m.mouseY += (m.targetY - m.mouseY) * 0.045;
      const x = m.mouseX * 0.42;
      const y = 0.28 + m.mouseY * 0.22;
      const z = 7.4 - m.progress * 42;
      camera.position.x += (x - camera.position.x) * 0.08;
      camera.position.y += (y - camera.position.y) * 0.08;
      camera.position.z += (z - camera.position.z) * 0.1;
      camera.lookAt(x * 0.25, 0.05, camera.position.z - 7);
      camera.rotateZ(m.mouseX * -0.025);
      parts.forEach((part) => part.update(t));
      if (composer) composer.render();
      else renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parts.forEach((part) => part.dispose());
      composer?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [mobile, reduced]);

  if (reduced) return null;

  return <div ref={mountRef} className="scene-root" aria-hidden="true" />;
};

export default SceneCanvas;
