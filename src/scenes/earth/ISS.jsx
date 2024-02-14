import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef, useCallback } from 'react';

const ISS = React.memo(() => {
    const ISSRef = useRef();
    const memoizedISS = useMemo(() => {
        return useGLTF('/ISSModel/ISS_stationary.gltf');
    });

    const updateMoonPosition = useCallback(() => {
        const xAxis = 2
        // Orbit Rotation
        ISSRef.current.position.x = Math.sin(clock.getElapsedTime() * 1.2) * xAxis
        ISSRef.current.position.z = Math.cos(clock.getElapsedTime() * 1.2) * xAxis
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
