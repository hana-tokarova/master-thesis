import { HStack, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch } from "@chakra-ui/react";
import React from 'react';

import { Mesh } from "three";
import { collections, CollectionType, JewelryType } from "../components/collections/Collections";
import { ColorPicker } from "../components/layout/ColorPicker";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { changeBooleanParameter, changeNumericParameter, useMeshParameters } from "../components/utils/mesh/ChangeMesh";
import { RenderCanvas } from "../subpages/RenderCanvas";


type ConfiguratorProps = {
  collection: CollectionType;
  jewelry: JewelryType;
}

export const ConfiguratorPage = (props: ConfiguratorProps) => {
  const meshRef = React.useRef<Mesh>(null);
  const mesh = collections[props.collection]?.meshes[props.jewelry];

  const
    { numericParameters,
      booleanParameters,
      setNumericParameters,
      setBooleanParameters,
      currentCollection,
      currentJewelryType
    } = useMeshParameters(props.collection, props.jewelry, mesh);

  const [meshColor, setMeshColor] = React.useState("ghostwhite");

  if (!mesh || !booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelryType !== props.jewelry) {
    return <></>;
  }

  return (
    <HStack
      spacing={2}
      paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
      paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
      paddingTop={{ base: 2, sm: 10, md: 12, lg: 16 }}
      paddingBottom={16}
      alignItems={"left"}
    >
      <div>
        <ColorPicker
          colors={["gold", "yellowgreen", "royalblue", "maroon", "ghostwhite"]}
          setMeshColor={setMeshColor}
        />

        <Select placeholder='Export to:' size='sm' variant='filled'>
          <option value='stl' onClick={() => exportMeshSTL(meshRef.current!)}>.STL</option>
          <option value='obj' onClick={() => exportMeshOBJ(meshRef.current!)}>.OBJ</option>
          <option value='gltf' onClick={() => exportMeshGlTF(meshRef.current!)}>.glTF</option>
        </Select>

        {mesh && Object.entries(mesh.numericParameters).map(([parameterName, parameterDetails]) => (
          <div key={parameterName}>
            {parameterDetails.name}
            <Slider
              margin={2}
              colorScheme='cyan'
              value={numericParameters[parameterName]}
              min={parameterDetails.min}
              max={parameterDetails.max}
              step={parameterDetails.step}
              onChange={(newValue) => changeNumericParameter(setNumericParameters, parameterName, newValue)}>

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

        {mesh && Object.entries(mesh.booleanParameters).map(([parameterName, parameterDetails]) => (
          <div key={parameterName} >
            {parameterDetails.name}
            <Switch
              margin={2}
              colorScheme='cyan'
              isChecked={booleanParameters[parameterName]}
              onChange={(newValue) => changeBooleanParameter(setBooleanParameters, parameterName, newValue.target.checked)}
            />
          </div>
        ))}
      </div>

      <RenderCanvas
        mesh={mesh!}
        color={meshColor}
        ref={meshRef}
        numParams={numericParameters}
        boolParams={booleanParameters}
      />
    </HStack>
  );
};