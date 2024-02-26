import { Button, ChakraProvider, HStack, IconButton, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";

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

  const myMesh = React.useRef();

  const [meshColor, setMeshColor] = React.useState("white");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];

  const changeColor = (changeColor: string) => {
    setMeshColor(changeColor);
  };

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas onMouseDown={onMouseDown}>
          <color attach="background" args={["white"]} />
          <pointLight intensity={0.01} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <mesh ref={myMesh} position={[0, 0, 0]} rotation={rotation}>
            <torusGeometry attach="geometry" args={[0.8, 0.3, 16, 16]} />
            <meshStandardMaterial attach="material" flatShading={true} color={meshColor} />
          </mesh>
        </Canvas>
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <HStack marginBottom={2}>
            {colors.map((buttonColor) =>
              <IconButton
                aria-label='Change color'
                icon={<FaSquare />}
                color={buttonColor}
                onClick={() => changeColor(buttonColor)}
              />
            )}
          </HStack>

          <Button rightIcon={<HiOutlineDownload />}>
            Export to .STL
          </Button>

        </div>
      </div>
    </ChakraProvider>
  );
};
