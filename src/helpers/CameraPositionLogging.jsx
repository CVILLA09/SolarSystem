import { useThree } from 'react-three-fiber';
import { useEffect, useRef } from 'react';

function CameraPositionLogging({event}) {
  const { camera } = useThree();
  const cameraRef = useRef();

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position
        console.log(`Camera Position: x: ${x}, y: ${y}, z: ${z}`);
    }

    cameraRef.current = camera;
    window.addEventListener(event, logCameraPosition);

    return () => {
      window.removeEventListener(event, logCameraPosition);
    }

  }, [])

  return null;
}   

export default CameraPositionLogging;