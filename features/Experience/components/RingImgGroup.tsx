"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import planeFragment from "../shaders/plane.fragment.glsl";
import planeVertex from "../shaders/plane.vertex.glsl";
import { useFrame } from "@react-three/fiber";

type RingImgGroupType = {
  index: number;
  height: number;
  width: number;
  gap: number;
  totalHeight: number;
  textures: THREE.Texture[];
  radius: number;
};

export default function RingImgGroup({
  gap,
  height,
  index,
  radius,
  textures,
  totalHeight,
  width,
}: RingImgGroupType) {
  const groupRef = useRef<THREE.Group>(null);
  const speed = useMemo(() => Math.random() * 0.05 + 0.05, []);
  const direction = useMemo(() => (index % 2 === 0 ? 1 : -1), [index]);

  useFrame(({ clock: { elapsedTime } }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.set(0, elapsedTime * speed * direction, 0);
  });

  return (
    <group
      ref={groupRef}
      position={[
        0,
        // i * (height + gap) - totalHeight / 2 + (height + gap) / 2,
        (index + 0.5) * (height + gap) - totalHeight / 2,
        0,
      ]}
    >
      {textures.map((texture, i, arr) => {
        const length = arr.length;
        const angle = i * ((Math.PI * 2) / length);

        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, angle, 0]}
          >
            <planeGeometry args={[width, height, 32, 32]} />
            <shaderMaterial
              fragmentShader={planeFragment}
              vertexShader={planeVertex}
              side={THREE.DoubleSide}
              transparent
              uniforms={{
                uImgTexture: { value: texture },
                uRadius: { value: radius },
              }}
            />
          </mesh>
        );
      })}
    </group>
  );
}
