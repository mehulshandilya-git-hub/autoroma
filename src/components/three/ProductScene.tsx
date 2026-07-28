"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

interface ProductBottleProps {
  color: string;
  accentColor: string;
  name: string;
  isHovered: boolean;
}

function ProductBottle({ color, accentColor, name, isHovered }: ProductBottleProps) {
  const group = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return positions;
  });

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.3;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3 + 1] += 0.008;
        if (arr[i * 3 + 1] > 2.5) {
          arr[i * 3 + 1] = 0;
          arr[i * 3] = (Math.random() - 0.5) * 0.5;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      posAttr.needsUpdate = true;
      if (!Array.isArray(particlesRef.current.material)) {
        particlesRef.current.material.opacity = isHovered ? 0.6 : 0.15;
      }
    }
  });

  return (
    <group ref={group}>
      {/* Main bottle body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1.4, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.08}
          transmission={0.5}
          thickness={0.5}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.1, 0.18, 0.35, 16]} />
        <meshPhysicalMaterial
          color={accentColor}
          metalness={1}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshPhysicalMaterial
          color={accentColor}
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Accent band */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.38, 0.01, 8, 48]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.2} />
      </mesh>

      {/* Fragrance particles on hover */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={accentColor}
          transparent
          opacity={0.15}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

interface ProductSceneProps {
  color: string;
  accentColor: string;
  name: string;
  isHovered: boolean;
}

export default function ProductScene({ color, accentColor, name, isHovered }: ProductSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.4} />
        <ambientLight intensity={0.3} />
        <spotLight position={[3, 5, 2]} angle={0.3} penumbra={1} intensity={2} color={accentColor} />
        <pointLight position={[-2, 2, -1]} intensity={0.8} color="#ffffff" />
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <ProductBottle
            color={color}
            accentColor={accentColor}
            name={name}
            isHovered={isHovered}
          />
        </Float>
      </Suspense>
    </Canvas>
  );
}
