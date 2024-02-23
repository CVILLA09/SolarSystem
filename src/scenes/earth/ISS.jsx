import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef, useCallback } from 'react';
import * as THREE from 'three';

const ISS = React.memo(() => {
    const ISSRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const memoizedISS = useMemo(() => {
        return useGLTF('/ISSModel/ISS_stationary.gltf');
    });

    const xAxis = 2
    const updateISSPosition = useCallback(() => {
        // Orbit Rotation
        ISSRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * .9) * xAxis
        ISSRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * .9) * xAxis
    }, [])

    useFrame (() => {
        updateISSPosition()
    })

    return(
        <mesh>
          <primitive 
            ref={ISSRef}
            object={memoizedISS.scene} 
            position={[xAxis,0,0]} 
            scale={0.003} />
        </mesh>
    )
});

export default ISS;
