import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Neptune = React.memo (({ displacementScale }) => {
  const neptuneRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingNeptune, setFollowingNeptune] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16, 8.5, 19.5))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [neptuneTexture] = 
    useTexture([
      '/assets/neptune.jpg', 
    ]);

    const updateNeptunePosition = useCallback(() => {
      // Calculate Neptune's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.003;
      const distance = 42;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      neptuneRef.current.position.set(x, 0, z);
      neptuneRef.current.rotation.y += 0.014;
    }, [])

    const originalCameraPosition = new THREE.Vector3(30, 10, 25);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingNeptune = () => {
      setFollowingNeptune((prevFollowingNeptune) => {
        if (!prevFollowingNeptune) {
         // When starting to follow Neptune, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingNeptune;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingNeptune) {
        const neptunePositionRef = neptuneRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          neptunePositionRef.x + 30,
          neptunePositionRef.y + 3,
          neptunePositionRef.z + 9
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(neptunePositionRef, 1000)
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
      updateNeptunePosition();
      tweenLogic();
    });    

  return (
    <group ref={neptuneRef}>
    <mesh 
      onClick={toggleFollowingNeptune}
      onPointerOver={() => hover(true)} 
      onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhongMaterial 
          map={neptuneTexture}
          emissiveMap={neptuneTexture}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 0.75 : 0.01}
          />
    </mesh>
    </group>
  );
});

export default Neptune;
