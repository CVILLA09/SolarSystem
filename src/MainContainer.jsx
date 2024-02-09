import { useHelper } from '@react-three/drei';
import AnimatedStars from './AnimatedStars';
import { useRef } from 'react';
import Earth from './scenes/earth/Earth';
import Sun from './scenes/sun/Sun';
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
                {/* <directionalLight 
                castShadow
                ref={directionalLightRef} 
                position={[0,0,10]} 
                intensity={3}/>
                <directionalLight 
                castShadow
                ref={directionalLightRefTwo} 
                position={[0,0,-10]} 
                intensity={3}/> */}
                {/* <ambientLight intensity={5} /> */}
                <Sun />
                <Earth displacementScale={0.03}/>
            </>
    );
}

export default MainContainer;