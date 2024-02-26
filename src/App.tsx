import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';

export const App = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const ref = useRef({
    mouseX: 0,
    mouseY: 0,
    rotationX: 0,
    rotationY: 0
  });

  const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true);
    ref.current.mouseX = event.clientX;
    ref.current.mouseY = event.clientY;
    ref.current.rotationX = rotation[0];
    ref.current.rotationY = rotation[1];
  };

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (isDragging) {
      const deltaX = event.clientX - ref.current.mouseX;
      const deltaY = event.clientY - ref.current.mouseY;
      setRotation([ref.current.rotationX + deltaY * 0.01, ref.current.rotationY + deltaX * 0.01, 0]);
    }
  };

  const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove as any);
    window.addEventListener('mouseup', onMouseUp as any);

    return () => {
      window.removeEventListener('mousemove', onMouseMove as any);
      window.removeEventListener('mouseup', onMouseUp as any);
    };
  }, [isDragging]); // Re-run the effect if isDragging changes

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas onMouseDown={onMouseDown}>
          <color attach="background" args={["white"]} />
          <pointLight intensity={0.01} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <mesh position={[0, 0, 0]} rotation={rotation}>
            <torusGeometry radius={4} radialSegments={8} tubularSegments={10} />
            <meshStandardMaterial flatShading={true} color="pink" />
          </mesh>
        </Canvas>
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <Button colorScheme="blue">Click Me</Button>
        </div>
      </div>
    </ChakraProvider>
  );
};
