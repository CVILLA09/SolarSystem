const Earth = () => {
  return (
    <mesh>
        {/* Radius, X-axis, Y-axis  */}
        <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Earth;