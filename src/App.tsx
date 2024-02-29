import { Button, ChakraProvider, HStack, IconButton, theme } from "@chakra-ui/react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

import { OrbitControls } from "@react-three/drei";
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { DirectionalLight, Mesh, Object3D } from "three";

const makeLissajousCurve3D = (nbSteps: number, s: number, a: number, b: number, c: number, delta: number, gamma: number) => {
  const points = [];
  const range = 2 * Math.PI;
  const stepSize = range / nbSteps;

  for (let t = -range / 2; t <= range / 2; t += stepSize) {
    const x = s * Math.sin(a * t);
    const y = (s / 2) * Math.sin(b * t + delta);
    const z = s * Math.sin(c * t + gamma);

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
};

type LissajouCurveProps = {
  mesh: MeshRef;
  meshColor: string;
};

const LissajouCurve = (props: LissajouCurveProps) => {
  const points = makeLissajousCurve3D(100, 2, 5, 4, 5, Math.PI, Math.PI / 2);
  const path = new THREE.CatmullRomCurve3(points, true, "centripetal");

  return (
    <mesh ref={props.mesh} position={[0, 0, 0]} >
      <tubeGeometry attach="geometry" args={[path, 512, 0.05, 20, true]} />
      <meshStandardMaterial attach="material" flatShading={false} color={props.meshColor} />
    </mesh>
  );
};

function FollowCameraLight() {
  const lightRef = useRef<DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    lightRef.current!.position.copy(camera.position);
  });

  return (
    <directionalLight ref={lightRef} intensity={2} />
  );
}

type MeshRef = React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;

export const App = () => {
  const myMesh = React.useRef<Mesh>(null);

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

  const exportMesh = (mesh: Object3D) => {
    const exporter = new STLExporter();
    const stlString = exporter.parse(mesh, { binary: true });
    saveArrayBuffer(stlString, 'kek.stl');
  };

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 0] }} >
          <color attach="background" args={["white"]} />
          <FollowCameraLight />
          <ambientLight intensity={0.1} />
          <LissajouCurve mesh={myMesh} meshColor={meshColor} />
          <OrbitControls enableRotate={true} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 3} />
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
            onClick={() => exportMesh(myMesh.current!.parent!)}
          >
            Export to .STL
          </Button>

        </div>
      </div>
    </ChakraProvider>
  );
};
