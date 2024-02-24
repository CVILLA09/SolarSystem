import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Jupiter = React.memo (({ displacementScale }) => {
  const jupiterRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingJupiter, setFollowingJupiter] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16, 8.5, 19.5))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [jupiterTexture] = 
    useTexture([
      '/assets/jupiter.jpg', 
    ]);

    const updateJupiterPosition = useCallback(() => {
      // Calculate Jupiter's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.03;
      const distance = 26;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      jupiterRef.current.position.set(x, 0, z);
      jupiterRef.current.rotation.y += 0.02;
    }, [])

    const originalCameraPosition = new THREE.Vector3(30, 10, 25);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingJupiter = () => {
      setFollowingJupiter((prevFollowingJupiter) => {
        if (!prevFollowingJupiter) {
         // When starting to follow Jupiter, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingJupiter;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingJupiter) {
        const jupiterPositionRef = jupiterRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          jupiterPositionRef.x + 30,
          jupiterPositionRef.y + 3,
          jupiterPositionRef.z + 9
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(jupiterPositionRef, 1000)
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
      updateJupiterPosition();
      tweenLogic();
    });    

  return (
    <group ref={jupiterRef}>
    <mesh 
      onClick={toggleFollowingJupiter}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial 
          map={jupiterTexture}
          emissiveMap={jupiterTexture}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 0.75 : 0.01}
          />
    </mesh>
    </group>
  );
});

export default Jupiter;
