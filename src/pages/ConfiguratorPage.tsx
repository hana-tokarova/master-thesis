import { HStack, IconButton, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch } from "@chakra-ui/react";
import React from 'react';

import { FaSquare } from "react-icons/fa";
import { Mesh } from "three";
import { collections, CollectionType, JewelryType } from "../components/collections/Collections";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { RenderCanvas } from "../subpages/RenderCanvas";


type ConfiguratorProps = {
  collection: CollectionType;
  jewelry: JewelryType;
}

export const ConfiguratorPage = (props: ConfiguratorProps) => {
  const meshRef = React.useRef<Mesh>(null);

  const jewelryMesh = collections[props.collection]?.meshes[props.jewelry];

  const [numericParameters, setNumericParameters] = React.useState<{ [key: string]: number }>();
  const [booleanParameters, setBooleanParameters] = React.useState<{ [key: string]: boolean }>();

  const [currentCollection, setCurrentCollection] = React.useState<CollectionType>(props.collection);
  const [currentJewelry, setCurrentJewelry] = React.useState<JewelryType>(props.jewelry);

  React.useEffect(() => {
    // TODO opravit pomocou react three pitfalls mutate, use deltas, alebo sa pozriet ci je to ok a pozriet sa aj na kolekciach
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

  if (!booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelry !== props.jewelry) {
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
          <option value='stl' onClick={() => exportMeshSTL(meshRef.current!)}>.STL</option>
          <option value='obj' onClick={() => exportMeshOBJ(meshRef.current!)}>.OBJ</option>
          <option value='gltf' onClick={() => exportMeshGlTF(meshRef.current!)}>.glTF</option>
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

      <RenderCanvas
        mesh={jewelryMesh!}
        color={meshColor}
        ref={meshRef}
        numParams={numericParameters}
        boolParams={booleanParameters}
      />

    </HStack>
  );
};