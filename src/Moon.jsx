import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Moon = () => {
  const moonRef = useRef()

    const [moonTexture] = useTexture(['/assets/moon.jpg']);

    useFrame (() => {
      moonRef.current.rotation.y += 0.002
    })

  return (
    <mesh ref={moonRef}>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[0.27, 32, 32]} />
          <meshPhongMaterial 
          map={moonTexture} 
          />
    </mesh>
  );
}

export default Moon;
