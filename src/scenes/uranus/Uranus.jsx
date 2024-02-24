import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Uranus = React.memo (({ displacementScale }) => {
  const uranusRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingUranus, setFollowingUranus] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16, 8.5, 19.5))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [uranusTexture] = 
    useTexture([
      '/assets/uranus.jpg', 
    ]);

    const updateUranusPosition = useCallback(() => {
      // Calculate Uranus's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.005;
      const distance = 37;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.rotation.y += 0.04;
    }, [])

    const originalCameraPosition = new THREE.Vector3(30, 10, 25);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingUranus = () => {
      setFollowingUranus((prevFollowingUranus) => {
        if (!prevFollowingUranus) {
         // When starting to follow Uranus, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingUranus;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingUranus) {
        const uranusPositionRef = uranusRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          uranusPositionRef.x + 30,
          uranusPositionRef.y + 3,
          uranusPositionRef.z + 9
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(uranusPositionRef, 1000)
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
      updateUranusPosition();
      tweenLogic();
    });    

  return (
    <group ref={uranusRef}>
    <mesh 
      onClick={toggleFollowingUranus}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1.4, 32, 32]} />
          <meshPhongMaterial 
          map={uranusTexture}
          emissiveMap={uranusTexture}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 0.75 : 0.01}
          />
    </mesh>
    </group>
  );
});

export default Uranus;
