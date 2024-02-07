import { useHelper } from '@react-three/drei';
import AnimatedStars from './AnimatedStars';
import { useRef } from 'react';
import Earth from './Earth';
import * as THREE from 'three';

const MainContainer = () => {
    const directionalLightRef = useRef();
    const directionalLightRefTwo = useRef();
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink');
    useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink');
    return (
            <>
                <color attach="background" args={['black']} />
                <AnimatedStars />
                <directionalLight 
                ref={directionalLightRef} 
                position={[0,0,10]} 
                intensity={3}/>
                <directionalLight 
                ref={directionalLightRefTwo} 
                position={[0,0,-10]} 
                intensity={3}/>
                {/* <ambientLight intensity={5} /> */}
                <Earth displacementScale={0.1}/>
            </>
    );
}

export default MainContainer;