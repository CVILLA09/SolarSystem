import { Canvas } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import AnimatedStars from './AnimatedStars';
import Earth from './Earth';

const MainContainer = () => {
    return (
        <Canvas>
                <color attach="background" args={['black']} />
                <OrbitControls />
                <AnimatedStars />
                <directionalLight />
                <Earth />
        </Canvas>
    );
}

export default MainContainer;