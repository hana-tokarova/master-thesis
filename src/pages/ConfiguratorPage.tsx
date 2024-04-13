import { HStack, IconButton, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch } from "@chakra-ui/react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

import { OrbitControls } from "@react-three/drei";
import { FaSquare } from "react-icons/fa";
import { Mesh, Object3D } from "three";
import { collections, CollectionType, JewelryType } from "../components/collections/Collections";


type ConfiguratorProps = {
  collection: CollectionType;
  jewelry: JewelryType;
}

export const ConfiguratorPage = (props: ConfiguratorProps) => {
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

  const saveString = (text: string, filename: string) => {
    save(new Blob([text], { type: 'text/plain' }), filename);
  }


  const saveArrayBuffer = (buffer: ArrayBuffer | DataView, filename: string) => {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }

  const exportMeshSTL = (mesh: Object3D) => {
    const clonedMesh = mesh.clone();

    const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
    clonedMesh.applyMatrix4(rotationMatrix);
    clonedMesh.updateMatrixWorld();

    const exporter = new STLExporter();
    const data = exporter.parse(clonedMesh, { binary: true });

    saveArrayBuffer(data, clonedMesh.uuid + '.stl');
  };

  const exportMeshOBJ = (mesh: Object3D) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const exporter = new OBJExporter();
    const data = exporter.parse(scene);

    saveString(data, clonedMesh.uuid + '.obj');
  };

  const exportMeshGlTF = (mesh: Object3D) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const options = {
      trs: false,
      onlyVisible: true,
      binary: false,
      maxTextureSize: 4096
    };

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      function (data) {
        if (data instanceof ArrayBuffer) {

          saveArrayBuffer(data, clonedMesh.uuid + '.glb');

        } else {

          const output = JSON.stringify(data, null, 2);
          console.log(output);
          saveString(output, clonedMesh.uuid + '.gltf');

        }

      },
      function (error) {

        console.log('An error happened during parsing', error);

      },
      options
    );
  };

  const FollowCameraLight = () => {
    const lightRef = useRef<THREE.DirectionalLight | null>(null);
    const { camera } = useThree();

    useFrame(() => {
      lightRef.current!.position.copy(camera.position);
    });

    return (
      <>
        <directionalLight ref={lightRef} intensity={2} />
        <directionalLight intensity={1} position={[3, 3, 3]} />
        <directionalLight intensity={1} position={[-3, 3, -3]} />
        <directionalLight intensity={1} position={[3, 3, -3]} />
        <directionalLight intensity={1} position={[-3, 3, 3]} />
      </>
    );
  }

  if (!booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelry !== props.jewelry) {
    return <></>;
  }

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <Canvas camera={{ fov: 50, near: 0.1, far: 1000, position: [75, 75, 0] }} >

        <FollowCameraLight />

        <ambientLight
          intensity={1}
          color="dimgray"
        />

        {jewelryMesh!.render(numericParameters, booleanParameters, meshColor, myMesh)}

        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={false}
          enableDamping={true}
          minPolarAngle={Math.PI / 2 - Math.PI / 5}
          maxPolarAngle={Math.PI / 2 + Math.PI / 5}
        />
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

        <Select placeholder='Export to:' size='sm' variant='filled'>
          <option value='stl' onClick={() => exportMeshSTL(myMesh.current!)}>.STL</option>
          <option value='obj' onClick={() => exportMeshOBJ(myMesh.current!)}>.OBJ</option>
          <option value='gltf' onClick={() => exportMeshGlTF(myMesh.current!)}>.glTF</option>
        </Select>

        {jewelryMesh && Object.entries(jewelryMesh.numericParameters).map(([parameterName, parameterDetails]) => (
          <div key={parameterName}>
            {parameterDetails.name}
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
            {parameterDetails.name}
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
  );
};