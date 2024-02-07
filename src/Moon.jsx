import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Moon = () => {
  const moonRef = useRef()

    const [moonTexture] = useTexture(['/assets/moon.jpg']);

    const xAxis = 4
    useFrame (({clock}) => {
      // Orbit Rotation
      moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * xAxis
      moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * xAxis
      // Axis Rotation 
      moonRef.current.rotation.y += 0.001
    })

  return (
    <mesh castShadow ref={moonRef} position={[xAxis,0,0]}>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[0.27, 32, 32]} />
          <meshPhongMaterial 
          map={moonTexture} 
          />
    </mesh>
  );
}

export default Moon;
