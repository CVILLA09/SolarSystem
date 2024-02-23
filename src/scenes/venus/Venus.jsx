import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Venus = React.memo (({ displacementScale }) => {
  const venusRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingVenus, setFollowingVenus] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16, 8.5, 19.5))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [venusTexture] = 
    useTexture([
      '/assets/venus.jpg', 
    ]);

    const updateVenusPosition = useCallback(() => {
      // Calculate Venus's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.57;
      const distance = 10;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      venusRef.current.position.set(x, 0, z);
      venusRef.current.rotation.y += 0.006;
    }, [])

    const originalCameraPosition = new THREE.Vector3(20, 10, 25);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingVenus = () => {
      setFollowingVenus((prevFollowingVenus) => {
        if (!prevFollowingVenus) {
         // When starting to follow Venus, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingVenus;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingVenus) {
        const venusPositionRef = venusRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          venusPositionRef.x + 9,
          venusPositionRef.y + 2,
          venusPositionRef.z + 5
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(venusPositionRef, 1000)
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
      updateVenusPosition();
      tweenLogic();
    });    

  return (
    <group ref={venusRef}>
    <mesh 
      onClick={toggleFollowingVenus}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[.95, 32, 32]} />
          <meshPhongMaterial 
          map={venusTexture}
          emissiveMap={venusTexture}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 0.75 : 0.01}
          />
    </mesh>
    </group>
  );
});

export default Venus;
