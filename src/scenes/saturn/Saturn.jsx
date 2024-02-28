import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Saturn = React.memo (({ displacementScale }) => {
  const saturnRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingSaturn, setFollowingSaturn] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16, 8.5, 19.5))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [saturnTexture] = 
    useTexture([
      '/assets/saturn.jpg', 
    ]);

    const [saturnRingTexture] = 
    useTexture([
      '/assets/saturn_ring.jpg'
    ]);

    const updateSaturnPosition = useCallback(() => {
      // Calculate Saturn's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.025;
      const distance = 32;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      saturnRef.current.position.set(x, 0, z);
      saturnRef.current.rotation.y += 0.02;
    }, [])

    const originalCameraPosition = new THREE.Vector3(30, 10, 25);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingSaturn = () => {
      setFollowingSaturn((prevFollowingSaturn) => {
        if (!prevFollowingSaturn) {
         // When starting to follow Saturn, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingSaturn;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingSaturn) {
        const saturnPositionRef = saturnRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          saturnPositionRef.x + 40,
          saturnPositionRef.y + 3,
          saturnPositionRef.z + 9
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(saturnPositionRef, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate((newTarget) => {
            camera.lookAt(newTarget);
          })
          .start();
      } else {
        // Tween for original camera position
        new TWEEN.Tween(camera.position)
          .to(originalCameraPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for original camera target
        new TWEEN.Tween(cameraTarget)
          .to(originalCameraTarget, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate((newTarget) => {
            camera.lookAt(newTarget);
          })
          .start();
      }
    });

    useFrame(() => {
      updateSaturnPosition();
      tweenLogic();
    });    

  return (
    <group ref={saturnRef}>
    <mesh 
      onClick={toggleFollowingSaturn}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1.8, 32, 32]} />
          <meshPhongMaterial 
          map={saturnTexture}
          emissiveMap={saturnTexture}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 0.75 : 0.01}
          />
    </mesh>
    <mesh 
      onClick={toggleFollowingSaturn}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)}
      rotation-x={Math.PI / 2}>
      <torusGeometry args={[3, 0.7, 2, 100]} />
      <meshPhongMaterial 
      map={saturnRingTexture} 
      emissiveMap={saturnRingTexture}
      emissive={0xffffff}
      emissiveIntensity={hovered ? 0.75 : 0.01}
      transparent={true}
      side={THREE.DoubleSide}
      />
    </mesh>
    </group>
  );
});

export default Saturn;
