import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

const ISS = () => {
    const ISSRef = useRef();
    const memoizedISS = useMemo(() => {
        return useGLTF('/ISSModel/ISS_stationary.gltf');
    });

    const xAxis = 2
    useFrame (({clock}) => {
        // Orbit Rotation
        ISSRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.4) * xAxis
        ISSRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.4) * xAxis
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
};

export default ISS;

