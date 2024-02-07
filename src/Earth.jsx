import { useTexture } from "@react-three/drei";

const Earth = () => {
    const [earthTexture, earthNormalMap] = useTexture(['/assets/earth_day.jpeg']);
  return (
    <mesh>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={earthTexture} normalMap={earthNormalMap} />
    </mesh>
  );
}

export default Earth;
