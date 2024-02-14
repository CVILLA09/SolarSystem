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
    const updateMoonPosition = useCallback(() => {
        // Orbit Rotation
        ISSRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * 1.2) * xAxis
        ISSRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * 1.2) * xAxis
    }, [])
    useFrame (() => {updateMoonPosition()})

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
