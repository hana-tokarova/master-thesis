import { ChakraProvider, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

const makeLissajous3DPoints = (nbSteps: number, s: number, a: number, b: number, c: number, delta: number, gamma: number) => {
  const points = [];
  const range = 2 * Math.PI;
  const stepSize = range / nbSteps;

  for (let t = -range / 2; t <= range / 2; t += stepSize) {
    const x = (s / 2) * Math.sin(a * t);
    const y = s * Math.sin(b * t + delta);
    const z = s * Math.sin(c * t + gamma);

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
};

const LissajouCurve = () => {
  const myMesh = React.useRef<THREE.Mesh>(null);

  const points = makeLissajous3DPoints(300, 2, 4, 5, 5, Math.PI, Math.PI / 2);
  const path = new THREE.CatmullRomCurve3(points); // CatmullRomCurve3 zmenit nejak na inu krivku

  return (
    <mesh ref={myMesh} position={[0, 0, 0]} rotation={new THREE.Euler(-180, 180, 0)}>
      <tubeGeometry attach="geometry" args={[path, 256, 0.05, 20, true]} />
      <meshStandardMaterial attach="material" flatShading={true} color={"white"} />
    </mesh>
  );
};

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

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas >
          <color attach="background" args={["white"]} />
          <directionalLight position={[0, 0, 5]} intensity={2} />
          {/* <mesh ref={myMesh} position={[0, 0, 0]} rotation={rotation}>
            <torusGeometry attach="geometry" args={[0.8, 0.3, 16, 16]} />
            <meshStandardMaterial attach="material" flatShading={true} color={meshColor} />
          </mesh> */}
          <LissajouCurve />
        </Canvas>
        {/* <div style={{ position: "absolute", top: "10px", left: "10px" }}>
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

        </div> */}
      </div>
    </ChakraProvider>
  );
};
