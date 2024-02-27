import { Button, ChakraProvider, HStack, IconButton, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

export const App = () => {
  const rotation = new THREE.Euler(-180, 0, 0);

  const [meshColor, setMeshColor] = React.useState("white");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];

  const changeColor = (changeColor: string) => {
    setMeshColor(changeColor);
  };

  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  function save(blob: Blob, filename: string) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  function saveArrayBuffer(buffer: DataView, filename: string) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  const exportMesh = (mesh: THREE.Scene) => {
    const exporter = new STLExporter();
    const stlString = exporter.parse(mesh, { binary: true });
    saveArrayBuffer(stlString, 'kek.stl');
  };

  const myMesh = React.useRef<THREE.Mesh>(null);

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas >
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

          <Button
            rightIcon={<HiOutlineDownload />}
            onClick={() => exportMesh(myMesh.current?.parent as THREE.Scene)}
          >
            Export to .STL
          </Button>

        </div>
      </div>
    </ChakraProvider>
  );
};
