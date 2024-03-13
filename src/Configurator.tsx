import { Button, ChakraProvider, HStack, IconButton, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

import { OrbitControls } from "@react-three/drei";
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { Mesh, Object3D } from "three";
import { collections, CollectionType } from "./Collections";

const Floor = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -6.5, 0]} receiveShadow >
      <circleGeometry attach="geometry" args={[50]} />
      <shadowMaterial color="white" />
    </mesh>
  )
}

type ConfiguratorProps = {
  collection: CollectionType;
}

export const Configurator = (props: ConfiguratorProps) => {
  const myMesh = React.useRef<Mesh>(null);

  const collection = collections[props.collection];

  const [parameters, setParameters] = React.useState<{ [key: string]: number }>();
  const [currentCollection, setCurrentCollection] = React.useState<string>(props.collection);

  React.useEffect(() => {
    setParameters(() => Object.entries(collection.parameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
    setCurrentCollection(props.collection);
  }, [props.collection, collection.parameters]);

  const [meshColor, setMeshColor] = React.useState("white");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];

  const changeColor = (changeColor: string) => {
    setMeshColor(changeColor);
  };

  const changeParameter = (
    parameterName: string,
    newValue: number,
  ): void => {
    setParameters((prevParams) => ({
      ...prevParams,
      [parameterName]: newValue,
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

  if (!parameters || currentCollection !== props.collection) {
    return <></>;
  }

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "90vh" }}>
        <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [50, 50, 0] }} shadows >
          <color attach="background" args={["white"]} />

          <directionalLight ref={(light) => {
            if (!light) return;

            light.shadow.camera.left = -15;
            light.shadow.camera.right = 15;
            light.shadow.camera.top = 15;
            light.shadow.camera.bottom = -15;
            light.shadow.radius = 100;
          }} intensity={3} castShadow position={[3, 10, 3]}
          />
          <ambientLight intensity={0.1} />

          {collection.render(parameters, meshColor, myMesh)}

          <Floor />
          <OrbitControls
            enablePan={false}
            enableRotate={true}
            enableZoom={true}
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
            onClick={() => exportMesh(myMesh.current!)}
          >
            Export to .STL
          </Button>

          <>
            {Object.entries(collection.parameters).map(([parameterName, parameterDetails]) => (
              <div key={parameterName}>
                {parameterName}
                <Slider
                  margin={2}
                  colorScheme='cyan'
                  value={parameters[parameterName]}
                  min={parameterDetails.min}
                  max={parameterDetails.max}
                  step={parameterDetails.step}
                  onChange={(newValue) => changeParameter(parameterName, newValue)}>

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
