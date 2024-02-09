import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Sun = () => {
  const sunRef = useRef()

    const [sunTexture] = useTexture(['/assets/sun.jpg']);

    useFrame (() => {
      // Axis Rotation 
      sunRef.current.rotation.y -= 0.001
    })

  return (
    <mesh ref={sunRef} position={[0,0,0]}>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial 
          map={sunTexture} 
          emissiveMap={sunTexture} 
          emissiveIntensity={0.5} 
          emissive={0xffffff} 
          />
          <pointLight
            color={0xffffff}        // Specify the color of the light (optional)
            intensity={25}           // Set the intensity of the light (optional)
            distance={100}           // Set the maximum range of the light (optional)
            decay={1}               // Set the amount the light dims along the distance (optional)
            position={[0, 0, 0]}    // Set the position of the light (optional)
            castShadow             // Set the light as a shadow-casting light (optional)
          />
    </mesh>
  );
}

export default Sun;
