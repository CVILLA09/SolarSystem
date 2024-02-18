import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Moon from "./Moon";
import ISS from "./ISS";

import * as THREE from 'three';

const Earth = React.memo (({ displacementScale }) => {
  const earthRef = useRef()
  const earthPositionRef = useRef(new THREE.Vector3(12, 0, 0)); // Create a referenfe to Earth's position vector
  const clockRef = useRef(new THREE.Clock());

  const [hovered, hover] = useState(false);
  const [followingEarth, setFollowingEarth] = useState(false);

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
      const distance = 12;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += 0.01
    }, [])

    const toggleFollowingEarth = () => {
      setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
    }

    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    useFrame (({camera}) => {
      updateEarthPosition()
      const earthPositionRef = earthRef.current.position;
      const cameraTargetPosition = new THREE.Vector3(
        earthPositionRef.x + 10, 
        earthPositionRef.y + 2, 
        earthPositionRef.z + 5
        );

      if (followingEarth) {
       camera.lookAt(earthPositionRef)
        camera.position.copy(cameraTargetPosition)
      }
    })

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
