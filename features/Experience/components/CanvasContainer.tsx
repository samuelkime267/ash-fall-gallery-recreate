"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function CanvasContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5], near: 0.1, far: 1000 }}
      >
        <Experience />
      </Canvas>
    </div>
  );
}
