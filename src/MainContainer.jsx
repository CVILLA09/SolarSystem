import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const MainContainer = () => {
    return (
        <Canvas>
                <color attach="background" args={['black']} />
                <Stars />
        </Canvas>
    );
}

export default MainContainer;