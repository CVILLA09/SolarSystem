import { OrbitControls, useHelper } from '@react-three/drei';
import AnimatedStars from './AnimatedStars';
import { useRef } from 'react';
import Earth from './Earth';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

const MainContainer = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink');
    return (
            <>
                <color attach="background" args={['black']} />
                <OrbitControls />
                <AnimatedStars />
                <directionalLight ref={directionalLightRef} />
                <Earth />
            </>
    );
}

export default MainContainer;