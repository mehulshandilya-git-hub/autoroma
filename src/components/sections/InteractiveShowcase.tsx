"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useCursor } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function InteractiveBottle() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={1.5}
      >
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 1.6, 64]} />
          <meshPhysicalMaterial
            color="#0a0a1a"
            metalness={0.9}
            roughness={0.05}
            transmission={0.6}
            thickness={0.5}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.03}
            ior={1.5}
            toneMapped
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 0.4, 32]} />
          <meshPhysicalMaterial
            color="#c9a96e"
            metalness={1}
            roughness={0.08}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.25, 32]} />
          <meshPhysicalMaterial
            color="#c9a96e"
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={3}
          />
        </mesh>

        {/* Gold band */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.42, 0.012, 16, 64]} />
          <meshStandardMaterial
            color="#c9a96e"
            metalness={1}
            roughness={0.15}
            emissive="#c9a96e"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Liquid */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.36, 0.4, 1.1, 64]} />
          <meshPhysicalMaterial
            color="#d4a43a"
            transmission={0.85}
            thickness={0.4}
            roughness={0}
            metalness={0}
            ior={1.33}
            opacity={0.35}
            transparent
          />
        </mesh>

        {/* Brand label */}
        <mesh position={[0, 0, 0.43]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.45, 0.04]} />
          <meshStandardMaterial
            color="#c9a96e"
            metalness={1}
            roughness={0.2}
            emissive="#c9a96e"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function InteractiveShowcase() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
        }}
      />

      <div className="text-center mb-16 md:mb-24 px-6">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6">
          Interactive
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-white mb-6">
          Explore Every{" "}
          <span className="gold-gradient font-medium">Angle</span>
        </h2>
        <p className="text-sm text-white/30 font-light tracking-wide max-w-md mx-auto">
          Drag to rotate. Move to tilt. Experience the craftsmanship from every perspective.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <div
          className="relative w-full aspect-square md:aspect-video"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,169,110,0.03), rgba(0,0,0,0.5))",
            border: "1px solid rgba(201,169,110,0.08)",
          }}
        >
          <Canvas
            camera={{ position: [0, 0.5, 4], fov: 35 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <Environment preset="studio" environmentIntensity={0.5} />
              <ambientLight intensity={0.3} />
              <spotLight
                position={[5, 8, 3]}
                angle={0.3}
                penumbra={1}
                intensity={3}
                color="#c9a96e"
              />
              <pointLight position={[-3, 2, -2]} intensity={1} color="#ffffff" />
              <InteractiveBottle />
            </Suspense>
          </Canvas>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/20" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/20" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/20" />
        </div>

        {/* Instructions */}
        <div className="flex justify-center gap-12 mt-8">
          {["Drag to Rotate", "Scroll to Zoom", "Move to Tilt"].map((instruction) => (
            <span
              key={instruction}
              className="text-[10px] tracking-[0.3em] uppercase text-white/20"
            >
              {instruction}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
