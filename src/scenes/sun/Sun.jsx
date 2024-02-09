import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Sun = () => {
  const sunRef = useRef()

    const [sunTexture] = useTexture(['/assets/sun.jpg']);

    const xAxis = 0
    useFrame (() => {
      // Axis Rotation 
      sunRef.current.rotation.y -= 0.001
    })

  return (
    <mesh castShadow ref={sunRef} position={[xAxis,0,0]}>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial map={sunTexture} />
          <pointLight castShadow intensity={2} />
    </mesh>
  );
}

export default Sun;
