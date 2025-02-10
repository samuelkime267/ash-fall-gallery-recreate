"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { imagesData } from "@/data/images.data";
import { useTexture, OrbitControls } from "@react-three/drei";
import planeFragment from "../shaders/plane.fragment.glsl";
import planeVertex from "../shaders/plane.vertex.glsl";

export default function Experience() {
  const textures = useTexture(imagesData.map((image) => image.image));

  const instanceCount = textures.length * 7;
  const instancedBufferGeoRef = useRef<THREE.InstancedBufferGeometry>(null);
  const PlaneGeometry = useMemo(
    () => new THREE.PlaneGeometry(1.5, 1, 32, 32),
    []
  );

  const { positionsArr, rotationArr, flipRotationArr, colorArr } =
    useMemo(() => {
      const positionsArr = new Float32Array(instanceCount * 3);
      const colorArr = new Float32Array(instanceCount * 3);
      const rotationArr = new Float32Array(instanceCount);
      const flipRotationArr = new Float32Array(instanceCount);

      const hotpink = new THREE.Color("hotpink");
      const yellow = new THREE.Color("yellow");
      const blue = new THREE.Color("blue");
      const red = new THREE.Color("red");
      const green = new THREE.Color("green");

      const radius = 2.5;
      const elementsPerCircle = 10;
      const numberOfGroups = Math.ceil(instanceCount / elementsPerCircle);

      const height = 1;
      const gap = 2;
      const totalHeight = (numberOfGroups - 1) * (height + gap);

      for (let i = 0; i < instanceCount; i++) {
        const group = Math.floor((i % numberOfGroups) + 1);
        const planeGroupIndex = Math.floor(
          (i / instanceCount) * elementsPerCircle
        );

        const circularAngle =
          (planeGroupIndex / elementsPerCircle) * Math.PI * 2;
        const x = Math.sin(circularAngle) * radius;
        const z = Math.cos(circularAngle) * radius;

        const i3 = i * 3;
        positionsArr[i3] = x; //x
        positionsArr[i3 + 1] = group * (height + gap) - totalHeight / 2; // y
        positionsArr[i3 + 2] = z; // z

        const rotationAngle = (planeGroupIndex / elementsPerCircle) * 360;
        rotationArr[i] = rotationAngle;

        if (planeGroupIndex > 1 && planeGroupIndex < elementsPerCircle / 2) {
          flipRotationArr[i] = 1;

          colorArr[i3] = green.r; //x
          colorArr[i3 + 1] = green.g; // y
          colorArr[i3 + 2] = green.b; // z
        } else if (
          planeGroupIndex >= elementsPerCircle / 2 &&
          planeGroupIndex < elementsPerCircle - 1
        ) {
          flipRotationArr[i] = 1;

          colorArr[i3] = red.r; //x
          colorArr[i3 + 1] = red.g; // y
          colorArr[i3 + 2] = red.b; // z
        } else if (planeGroupIndex >= elementsPerCircle / 2) {
          flipRotationArr[i] = 1;

          colorArr[i3] = hotpink.r; //x
          colorArr[i3 + 1] = hotpink.g; // y
          colorArr[i3 + 2] = hotpink.b; // z
        } else {
          flipRotationArr[i] = 1;

          colorArr[i3] = blue.r; //x
          colorArr[i3 + 1] = blue.g; // y
          colorArr[i3 + 2] = blue.b; // z
        }
      }

      return { positionsArr, rotationArr, flipRotationArr, colorArr };
    }, [instanceCount]);

  return (
    <>
      <OrbitControls />

      <mesh>
        <instancedBufferGeometry
          ref={instancedBufferGeoRef}
          instanceCount={instanceCount}
          index={PlaneGeometry.index}
          attributes-position={PlaneGeometry.attributes.position}
          attributes-uv={PlaneGeometry.attributes.uv}
        >
          <instancedBufferAttribute
            attach="attributes-aPos"
            args={[positionsArr, 3, false]}
          />
          <instancedBufferAttribute
            attach="attributes-aRotation"
            args={[rotationArr, 1, false]}
          />
          <instancedBufferAttribute
            attach="attributes-aFlipRotation"
            args={[flipRotationArr, 1, false]}
          />
          <instancedBufferAttribute
            attach="attributes-aColor"
            args={[colorArr, 3, false]}
          />
        </instancedBufferGeometry>
        {/* <planeGeometry attach={"geometry"} args={[1, 1, 32, 32]} /> */}
        <shaderMaterial
          attach={"material"}
          fragmentShader={planeFragment}
          vertexShader={planeVertex}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
