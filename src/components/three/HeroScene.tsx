"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function PerfumeBottle() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group} position={[2.5, 0, 0]} scale={1.2}>
        {/* Bottle body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 1.6, 32]} />
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.05}
            transmission={0.6}
            thickness={0.5}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            ior={1.5}
          />
        </mesh>

        {/* Bottle neck */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 0.4, 16]} />
          <meshPhysicalMaterial
            color="#c9a96e"
            metalness={1}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhysicalMaterial
            color="#c9a96e"
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Liquid inside */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 1.2, 32]} />
          <meshPhysicalMaterial
            color="#d4a43a"
            metalness={0}
            roughness={0}
            transmission={0.8}
            thickness={0.3}
            opacity={0.4}
            transparent
          />
        </mesh>

        {/* Label accent */}
        <mesh position={[0, 0, 0.42]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.05]} />
          <meshStandardMaterial color="#c9a96e" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function CarSilhouette() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });

  return (
    <group ref={ref} position={[-2, -0.8, 0]} scale={0.8}>
      {/* Car body - sleek sports car shape */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4, 0.4, 1.6]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Cabin */}
      <mesh position={[0.2, 0.7, 0]}>
        <boxGeometry args={[2.2, 0.5, 1.4]} />
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.15}
          transmission={0.3}
          envMapIntensity={1}
        />
      </mesh>

      {/* Front hood slope */}
      <mesh position={[-1.6, 0.45, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1.2, 0.15, 1.5]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Rear slope */}
      <mesh position={[1.3, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[1, 0.15, 1.5]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-1.2, 0.05, 0.85],
        [-1.2, 0.05, -0.85],
        [1.2, 0.05, 0.85],
        [1.2, 0.05, -0.85],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 24]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Headlights - glowing amber */}
      <mesh position={[-2.02, 0.35, 0.5]}>
        <boxGeometry args={[0.05, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#d4a43a"
          emissive="#d4a43a"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-2.02, 0.35, -0.5]}>
        <boxGeometry args={[0.05, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#d4a43a"
          emissive="#d4a43a"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Tail lights */}
      <mesh position={[2.02, 0.35, 0.5]}>
        <boxGeometry args={[0.05, 0.06, 0.25]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff2222"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[2.02, 0.35, -0.5]}>
        <boxGeometry args={[0.05, 0.06, 0.25]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff2222"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function EnvironmentScene() {
  return (
    <>
      <Environment preset="city" environmentIntensity={0.3} />
      <spotLight
        position={[5, 8, 3]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#c9a96e"
        castShadow
      />
      <spotLight
        position={[-5, 5, -3]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#d4a43a" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 45 }}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <EnvironmentScene />
        <CarSilhouette />
        <PerfumeBottle />
        <fog attach="fog" args={["#000000", 8, 25]} />
      </Suspense>
    </Canvas>
  );
}
