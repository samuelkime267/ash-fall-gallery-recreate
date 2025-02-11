"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { imagesData } from "@/data/images.data";
import { useTexture, OrbitControls } from "@react-three/drei";
import RingImgGroup from "./RingImgGroup";

export default function Experience() {
  const textures = useTexture(imagesData.map((image) => image.image));
  const radius = useMemo(() => 1.5, []);
  const elementsPerCircle = useMemo(() => 6, []);
  const { height, width, gap } = useMemo(() => {
    const height = 0.6;
    const width = (16 * height) / 9;

    return { width, height: 0.6, gap: 0.5 };
  }, []);
  const groupsCount = useMemo(
    () => Math.ceil(textures.length / elementsPerCircle),
    [elementsPerCircle, textures.length]
  );
  const arrGroups = useMemo(() => {
    const arr: THREE.Texture[][] = [];

    [...Array(groupsCount)].forEach((_, i) => {
      const end = elementsPerCircle * (i + 1);
      const endIndex = end > textures.length ? textures.length : end;
      arr.push(textures.slice(elementsPerCircle * i, endIndex));
    });

    return arr;
  }, [groupsCount, elementsPerCircle, textures]);
  const totalHeight = useMemo(
    () => groupsCount * (height + gap),
    [groupsCount, height, gap]
  );

  return (
    <>
      <OrbitControls />

      {arrGroups.map((textures, i) => {
        return (
          <RingImgGroup
            key={i}
            gap={gap}
            height={height}
            index={i}
            radius={radius}
            textures={textures}
            totalHeight={totalHeight}
            width={width}
          />
        );
      })}

      {/* <Instancing /> */}
    </>
  );
}
