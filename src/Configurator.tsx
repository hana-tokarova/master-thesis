import { Button, ChakraProvider, HStack, IconButton, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch, theme } from "@chakra-ui/react";
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

import { OrbitControls } from "@react-three/drei";
import { FaSquare } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { Mesh, Object3D } from "three";
import { collections, CollectionType, JewelryType } from "./Collections";


type ConfiguratorProps = {
  collection: CollectionType;
  jewelry: JewelryType;
}

export const Configurator = (props: ConfiguratorProps) => {
  const myMesh = React.useRef<Mesh>(null);

  const jewelryMesh = collections[props.collection]?.meshes[props.jewelry];

  const [numericParameters, setNumericParameters] = React.useState<{ [key: string]: number }>();
  const [booleanParameters, setBooleanParameters] = React.useState<{ [key: string]: boolean }>();

  const [currentCollection, setCurrentCollection] = React.useState<CollectionType>(props.collection);
  const [currentJewelry, setCurrentJewelry] = React.useState<JewelryType>(props.jewelry);

  React.useEffect(() => {
    if (!jewelryMesh) {
      return;
    }

    setNumericParameters(() => Object.entries(jewelryMesh!.numericParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));
    setBooleanParameters(() => Object.entries(jewelryMesh!.booleanParameters).reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1].value }), {}));

    setCurrentCollection(props.collection);
    setCurrentJewelry(props.jewelry);
  }, [props.collection, props.jewelry, jewelryMesh]);

  const [meshColor, setMeshColor] = React.useState("ghostwhite");
  const colors = ["gold", "yellowgreen", "royalblue", "maroon", "ghostwhite"];

  if (!jewelryMesh) {
    return <></>;
  }

  const changeColor = (changeColor: string) => {
    setMeshColor(changeColor);
  };

  const changeNumericParameter = (
    parameterName: string,
    newValue: number,
  ): void => {
    setNumericParameters((prevParams) => ({
      ...prevParams,
      [parameterName]: newValue,
    }));
  };

  const changeBooleanParameter = (
    parameterName: string,
    newValue: boolean,
  ): void => {
    setBooleanParameters((prevParams) => ({
      ...prevParams,
      [parameterName]: newValue,
    }));
  }

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

  if (!booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelry !== props.jewelry) {
    return <></>;
  }

  return (
    <ChakraProvider theme={theme}>
      <div style={{ width: "100vw", height: "90vh" }}>
        <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [75, 75, 0] }}>

          <directionalLight intensity={2} position={[3, 3, 3]} />
          <directionalLight intensity={2} position={[-3, 3, -3]} />
          <directionalLight intensity={2} position={[3, 3, -3]} />
          <directionalLight intensity={2} position={[-3, 3, 3]} />

          <ambientLight
            intensity={0.5}
            color="dimgray"
          />

          {jewelryMesh!.render(numericParameters, booleanParameters, meshColor, myMesh)}

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

          {jewelryMesh && Object.entries(jewelryMesh.numericParameters).map(([parameterName, parameterDetails]) => (
            <div key={parameterName}>
              {parameterName}
              <Slider
                margin={2}
                colorScheme='cyan'
                value={numericParameters[parameterName]}
                min={parameterDetails.min}
                max={parameterDetails.max}
                step={parameterDetails.step}
                onChange={(newValue) => changeNumericParameter(parameterName, newValue)}>

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

          {jewelryMesh && Object.entries(jewelryMesh.booleanParameters).map(([parameterName, parameterDetails]) => (
            <div key={parameterName} >
              {parameterName}
              <Switch
                margin={2}
                colorScheme='cyan'
                isChecked={booleanParameters[parameterName]}
                onChange={(newValue) => changeBooleanParameter(parameterName, newValue.target.checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
};