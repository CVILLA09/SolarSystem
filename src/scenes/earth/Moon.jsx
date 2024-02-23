import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";
import * as THREE from 'three';

const Moon = React.memo(() => {
  const moonRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);

    const [moonTexture] = useTexture(['/assets/moon.jpg']);

    const xAxis = 3
    const updateMoonPosition = useCallback(() => {
      // Orbit Rotation
      moonRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.3) * xAxis
      moonRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.3) * xAxis
      // Axis Rotation 
      moonRef.current.rotation.y += 0.001
    }, [])

    useFrame (() => {
      updateMoonPosition()
    })

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);
    

  return (
    <mesh 
      castShadow 
      receiveShadow 
      ref={moonRef} 
      position={[xAxis,0,0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >
      {/* Radius, X-axis, Y-axis  */}
      <sphereGeometry 
        args={[0.27, 32, 32]} />
      <meshPhongMaterial 
        map={moonTexture} 
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={hovered ? 0.75 : 0.05}          
      />
    </mesh>
  );
});

export default Moon;
