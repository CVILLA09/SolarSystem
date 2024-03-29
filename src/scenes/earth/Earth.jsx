import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Moon from "./Moon";
import ISS from "./ISS";

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

const Earth = React.memo (({ displacementScale }) => {
  const earthRef = useRef()
  const clockRef = useRef(new THREE.Clock());
  const { camera } = useThree();

  const [hovered, hover] = useState(false);
  const [followingEarth, setFollowingEarth] = useState(false);
  
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16.14, 8.32, 19.81))

  const [cameraTarget, setCameraTarget] = useState(
    new THREE.Vector3(0, 0, 0))

    const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap, earthEmissiveMap] = 
    useTexture([
      '/assets/earth_day.jpg', 
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg',
      '/assets/earth_displacement.jpg',
      '/assets/earth_night.jpg'
    ]);

    const updateEarthPosition = useCallback(() => {
      // Calculate the Earth's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * 0.4;
      const distance = 14;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += 0.01
    }, [])

    const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81);
    const originalCameraTarget = new THREE.Vector3(0, 0, 0);

    const toggleFollowingEarth = () => {
      setFollowingEarth((prevFollowingEarth) => {
        if (!prevFollowingEarth) {
         // When starting to follow the Earth, set the camera position and target
         // to their current values (so the tween starts from the correct place)
         setCameraPosition(camera.position.clone());
         setCameraTarget(cameraTarget);
        } else {
         // When stopping following the Earth, reset the camera position and target
         // to their original values
         setCameraPosition(originalCameraPosition);
         setCameraTarget(originalCameraTarget);
        }
      return !prevFollowingEarth;
     });
    };

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const tweenLogic = useCallback(() => {
      TWEEN.update();
    
      if (followingEarth) {
        const earthPositionRef = earthRef.current.position;
        const cameraTargetPosition = new THREE.Vector3(
          earthPositionRef.x + 10,
          earthPositionRef.y + 2,
          earthPositionRef.z + 5
        );
    
        // Tween for camera position
        new TWEEN.Tween(camera.position)
          .to(cameraTargetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
    
        // Tween for camera target
        new TWEEN.Tween(cameraTarget)
          .to(earthPositionRef, 1000)
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
      updateEarthPosition();
      tweenLogic();
    });    

  return (
    <group ref={earthRef}>
    <mesh castShadow receiveShadow 
          onClick={toggleFollowingEarth}
          onPointerOver={() => hover(true)} 
          onPointerOut={() => hover(false)} >
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial 
          map={earthTexture} 
          normalMap={earthNormalMap} 
          specularMap={earthSpecularMap}
          shininess={1000} 
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 20 : 1.5}
          />
    </mesh>
    <ISS />
    <Moon />
    </group>
  );
});

export default Earth;
