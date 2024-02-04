import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

const MainContainer = () => {
    return (
        <Canvas>
                <color attach="background" args={['black']} />
                <OrbitControls />
                <Stars />
        </Canvas>
    );
}

export default MainContainer;