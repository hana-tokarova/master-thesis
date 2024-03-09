import { Button, ChakraProvider, HStack, IconButton, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, theme } from "@chakra-ui/react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

import { OrbitControls } from "@react-three/drei";
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { DirectionalLight, Mesh, Object3D } from "three";
import { ParametricSurface } from "./ParametricGeometry";


type Parameter = {
  value: number;
  min: number;
  max: number;
  step: number;
}

type Parameters = {
  [key: string]: Parameter;
}

// eslint-disable-next-line
const Floor = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.5, 0]} >
      <circleGeometry attach="geometry" args={[5]} />
      <meshStandardMaterial transparent={true} />
    </mesh>
  )
}

const FollowCameraLight = () => {
  const lightRef = useRef<DirectionalLight | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    lightRef.current!.position.copy(camera.position);
  });

  return (
    <directionalLight ref={lightRef} intensity={2} />
  );
}

export const App = () => {
  const myMesh = React.useRef<Mesh>(null);

  const [parameters, setParameters] = React.useState<Parameters>({
    a: { value: 5, min: 1, max: 10, step: 1 },
    b: { value: 4, min: 1, max: 10, step: 1 },
    c: { value: 5, min: 1, max: 10, step: 1 },
    r: { value: 0.5, min: 0.1, max: 1, step: 0.1 },
  });

  const [twistedTorusParameters, setTwistedTorusParameters] = React.useState<Parameters>({
    majorR: { value: 4, min: 1, max: 10, step: 1 },
    minorR: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
  });

  const [twistAll, setTwistAll] = React.useState(false);

  const [meshColor, setMeshColor] = React.useState("white");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];

  const changeColor = (changeColor: string) => {
    setMeshColor(changeColor);
  };

  const changeParameter = (
    parameterName: string,
    newValue: number,
    setAction: React.Dispatch<React.SetStateAction<Parameters>>
  ): void => {
    setAction((prevParams) => ({
      ...prevParams,
      [parameterName]: { ...prevParams[parameterName], value: newValue },
    }));
  };


  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  const save = (blob: Blob, filename: string) => {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  const saveArrayBuffer = (buffer: DataView, filename: string) => {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  const exportMesh = (mesh: Object3D) => {
    const clonedMesh = mesh.clone();

    const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
    clonedMesh.applyMatrix4(rotationMatrix);
    clonedMesh.updateMatrixWorld();

    const exporter = new STLExporter();
    const stlString = exporter.parse(clonedMesh, { binary: true });

    saveArrayBuffer(stlString, clonedMesh.uuid + '.stl');
  };

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [50, 50, 0] }} >
          <color attach="background" args={["white"]} />
          <FollowCameraLight />
          <ambientLight intensity={0.1} />
          {/* <LissajouCurve
            mesh={myMesh}
            meshColor={meshColor}
            meshRadius={parameters.r.value}
            parameterA={parameters.a.value}
            parameterB={parameters.b.value}
            parameterC={parameters.c.value}
          /> */}
          <ParametricSurface
            mesh={myMesh}
            meshColor={meshColor}
            slices={200}
            stacks={200}
            majorR={twistedTorusParameters.majorR.value}
            minorR={twistedTorusParameters.minorR.value}
          />
          <OrbitControls
            enablePan={false}
            enableRotate={true}
            enableZoom={false}
            minPolarAngle={Math.PI / 2 - Math.PI / 6}
            maxPolarAngle={Math.PI / 2 + Math.PI / 6} />
        </Canvas>
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <HStack marginBottom={2}>
            {colors.map((buttonColor) =>
              <IconButton
                key={buttonColor}
                aria-label='Change color'
                icon={<FaSquare />}
                color={buttonColor}
                onClick={() => changeColor(buttonColor)}
              />
            )}
          </HStack>

          <Button
            key={"export"}
            rightIcon={<HiOutlineDownload />}
            onClick={() => exportMesh(myMesh.current!.parent!)}
          >
            Export to .STL
          </Button>

          {/* LissajouCurve parameters */}
          {/* <>
            {Object.entries(parameters).map(([parameterName, parameterDetails]) => (
              <div key={parameterName}>
                {parameterName}
                <Slider
                  margin={2}
                  colorScheme='cyan'
                  defaultValue={parameterDetails.value}
                  min={parameterDetails.min}
                  max={parameterDetails.max}
                  step={parameterDetails.step}
                  onChange={(newValue) => changeParameter(parameterName, newValue, setParameters)}>

                  <SliderMark value={parameterDetails.min} mt='1' fontSize='sm'>
                    {parameterDetails.min}
                  </SliderMark>
                  <SliderMark value={parameterDetails.max} mt='1' fontSize='sm'>
                    {parameterDetails.max}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </div>
            ))}
          </> */}

          <>
            {Object.entries(twistedTorusParameters).map(([parameterName, parameterDetails]) => (
              <div key={parameterName}>
                {parameterName}
                <Slider
                  margin={2}
                  colorScheme='cyan'
                  defaultValue={parameterDetails.value}
                  min={parameterDetails.min}
                  max={parameterDetails.max}
                  step={parameterDetails.step}
                  onChange={(newValue) => changeParameter(parameterName, newValue, setTwistedTorusParameters)}>

                  <SliderMark value={parameterDetails.min} mt='1' fontSize='sm'>
                    {parameterDetails.min}
                  </SliderMark>
                  <SliderMark value={parameterDetails.max} mt='1' fontSize='sm'>
                    {parameterDetails.max}
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </div>
            ))}
          </>

        </div>
      </div>
    </ChakraProvider>
  );
};
