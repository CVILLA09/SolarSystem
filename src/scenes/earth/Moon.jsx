import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from 'three';

const Moon = React.memo(() => {
  const moonRef = useRef()
  const clockRef = useRef(new THREE.Clock());

    const [moonTexture] = useTexture(['/assets/moon.jpg']);

    const xAxis = 4
    const updateMoonPosition = useCallback(() => {
      // Orbit Rotation
      moonRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.4) * xAxis
      moonRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.4) * xAxis
      // Axis Rotation 
      moonRef.current.rotation.y += 0.001
    }, [])

    useFrame (() => {updateMoonPosition()})

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[xAxis,0,0]}>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[0.27, 32, 32]} />
          <meshPhongMaterial 
          map={moonTexture} 
          emissiveMap={moonTexture}
          emissive={0xffffff}
          emissiveIntensity={0.05}
          />
    </mesh>
  );
});

export default Moon;
