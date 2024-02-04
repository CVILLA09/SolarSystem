import { Canvas } from '@react-three/fiber';

const MainContainer = () => {
    return (
        <Canvas>
                <color attach="background" args={['black']} />
        </Canvas>
    );
}

export default MainContainer;