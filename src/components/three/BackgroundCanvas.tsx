"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SmokeParticles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const time = useRef(0);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 15 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      siz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, siz];
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    time.current += delta * 0.2;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.15;
      arr[i * 3] += Math.sin(time.current + i * 0.1) * delta * 0.03;
      if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = -5;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c9a96e"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingDust({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const time = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    time.current += delta;
    mesh.current.rotation.y = time.current * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <SmokeParticles count={150} />
        <FloatingDust count={80} />
      </Canvas>

      {/* Volumetric light layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 30% 20%, rgba(201,169,110,0.04), transparent)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 70% 80%, rgba(212,164,58,0.03), transparent)",
        }}
      />
    </div>
  );
}
