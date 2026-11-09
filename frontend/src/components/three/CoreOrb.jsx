import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const CoreOrb = () => {
  const mountRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reduced) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      20
    );
    camera.position.z = 4.2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      })
    );
    group.add(outer);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 0),
      new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      })
    );
    group.add(inner);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.35,
      })
    );
    ring.rotation.x = Math.PI / 2.6;
    group.add(ring);

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
      { threshold: 0.08 }
    );
    io.observe(mount);

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
    let hidden = document.hidden;
    const onVis = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      group.rotation.y += 0.004;
      inner.rotation.y -= 0.007;
      ring.rotation.z += 0.003;
      group.rotation.x = mouse.y * 0.25;
      group.rotation.z = mouse.x * 0.12;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      outer.geometry.dispose();
      outer.material.dispose();
      inner.geometry.dispose();
      inner.material.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
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
      className="absolute -inset-10 md:-inset-16 pointer-events-none three-canvas"
      aria-hidden="true"
    />
  );
};

export default CoreOrb;
