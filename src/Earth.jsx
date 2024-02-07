import { useTexture } from "@react-three/drei";

const Earth = () => {
    const [earthTexture, earthNormalMap, earthSpecularMap] = useTexture([
      '/assets/earth_day.jpg', 
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg'
    ]);
  return (
    <mesh>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={earthTexture} normalMap={earthNormalMap} specularMap={earthSpecularMap} />
    </mesh>
  );
}

export default Earth;
