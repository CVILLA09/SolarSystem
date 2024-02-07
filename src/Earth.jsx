import { useTexture } from "@react-three/drei";

const Earth = ({ displacementScale }) => {
    const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture([
      '/assets/earth_day.jpg', 
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg',
      '/assets/earth_displacement.jpg'
    ]);
  return (
    <mesh>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial 
          map={earthTexture} 
          normalMap={earthNormalMap} 
          specularMap={earthSpecularMap} 
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          />
    </mesh>
  );
}

export default Earth;
