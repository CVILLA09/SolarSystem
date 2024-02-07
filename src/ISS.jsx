import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

const ISS = () => {
    const memoizedISS = useMemo(() => {
        return useGLTF('/ISSModel/ISS_stationary.gltf');
    });
    return(
        <mesh>
            <primitive object={memoizedISS.scene} position={[2,0,0]} scale={0.003} />
        </mesh>
    )
};

export default ISS;

