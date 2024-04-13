import { Button, Flex, HStack, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch, Text, Tooltip } from "@chakra-ui/react";
import React from 'react';

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
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

    const { numericParameters, booleanParameters, setNumericParameters, setBooleanParameters, currentCollection, currentJewelryType } = useMeshParameters(props.collection, props.jewelry, mesh);
    const [meshColor, setMeshColor] = React.useState("ghostwhite");

    if (!mesh || !booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelryType !== props.jewelry) {
        return <></>;
    }

    return (
        <HStack
            spacing={2}
            paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingTop={{ base: 0, sm: 4, md: 4, lg: 6 }}
            paddingBottom={16}
            alignItems={"left"}
        >
            <div>
                {/* TODO pridat ze ak chce clovek odist tak dostane popup ze are you sure lebo to bude lost */}
                <Button
                    leftIcon={<MdKeyboardBackspace />}
                    size={{ base: "xs", md: "sm", lg: "md" }}
                    as={Link}
                    to={"/"}
                    fontFamily={"heading"}
                    fontWeight="400"
                    variant="link"
                    color={"brand.50"}
                    style={{ padding: 0 }}
                >
                    Back to jewelry types
                </Button>

                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
                >
                    / {props.collection.charAt(0).toUpperCase() + props.collection.slice(1)} {props.jewelry.charAt(0).toUpperCase() + props.jewelry.slice(1)}
                </Text>

                <Text
                    maxW="3xl"
                    fontSize={{ base: "xs", md: "sm", lg: "md" }}
                >
                    {mesh.description}
                </Text>

                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / General
                </Text>

                <Flex
                    paddingTop="2"
                    paddingBottom="4"
                    direction="row"
                    rowGap={{ base: 4, sm: 6, md: 8, lg: 10 }}
                    columnGap={4}
                    wrap='wrap'
                >
                    {mesh && Object.entries(mesh.numericParameters).map(([parameterName, parameterDetails]) => (
                        parameterDetails.tag === 'general' && (
                            <div key={parameterName + parameterDetails}>

                            </div>
                        )
                    ))}

                </Flex>

                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / {props.collection.charAt(0).toUpperCase() + props.collection.slice(1)} properties
                </Text>

                <Flex
                    paddingTop="2"
                    paddingBottom="4"
                    direction="row"
                    rowGap={{ base: 0, sm: 2, md: 4, lg: 6 }}
                    columnGap={4}
                    wrap='wrap'
                >
                    {mesh && Object.entries(mesh.numericParameters).map(([parameterName, parameterDetails]) => (
                        parameterDetails.tag === 'collection' && (
                            <div key={parameterName + parameterDetails}>
                                <Text
                                    fontFamily={"heading"}
                                    fontWeight="400"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                    w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                                >
                                    {parameterDetails.name}
                                </Text>
                                <Slider
                                    margin={2}
                                    w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                                    value={numericParameters[parameterName]}
                                    min={parameterDetails.min}
                                    max={parameterDetails.max}
                                    step={parameterDetails.step}
                                    onChange={(newValue) => changeNumericParameter(setNumericParameters, parameterName, newValue)}
                                >

                                    <SliderMark value={parameterDetails.min} mt='1' fontSize='sm'>
                                        {parameterDetails.min}
                                    </SliderMark>
                                    <SliderMark value={parameterDetails.max} mt='1' fontSize='sm'>
                                        {parameterDetails.max}
                                    </SliderMark>
                                    <SliderTrack bg='brand.200' shadow='md'>
                                        <SliderFilledTrack bg='brand.100' />
                                    </SliderTrack>
                                    <Tooltip
                                        bg='brand.50'
                                        color='white'
                                        placement='bottom'
                                        label={numericParameters[parameterName]}
                                    >
                                        <SliderThumb />
                                    </Tooltip>

                                </Slider>
                            </div>

                        )
                    ))}
                </Flex>

                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / Visualize
                </Text>

                <Text
                    paddingTop="2"
                    paddingBottom="1"
                    fontFamily={"heading"}
                    fontWeight="400"
                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                    w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                >
                    Materials
                </Text>

                <ColorPicker
                    colors={[["yellow", "gold"], ["yellowgreen", "green"], ["royalblue", "darkblue"], ["red", "maroon"], ["ghostwhite", "gray"]]}
                    setMeshColor={setMeshColor}
                />

                <Text
                    paddingTop="2"
                    fontFamily={"heading"}
                    fontWeight="400"
                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                    w={{ base: "28", sm: "30", md: "32", lg: "34" }}
                >
                    Mockup Viewer
                </Text>

                <Switch
                    paddingTop={2}
                    // isChecked={true}
                    size='lg'
                    style={{ margin: 0 }}
                    sx={{
                        '.chakra-switch__thumb': {
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)', // Custom shadow for the thumb
                        },
                        '.chakra-switch__track': {
                            bg: 'brand.200',
                            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                            _checked: {
                                bg: 'brand.100',
                            } // Outer shadow when checked
                        }
                    }}
                />

                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / Finalize
                </Text>





                <div>old stuff now!</div>



                <Select placeholder='Export to:' size='sm' variant='filled'>
                    <option value='stl' onClick={() => exportMeshSTL(meshRef.current!)}>.STL</option>
                    <option value='obj' onClick={() => exportMeshOBJ(meshRef.current!)}>.OBJ</option>
                    <option value='gltf' onClick={() => exportMeshGlTF(meshRef.current!)}>.glTF</option>
                </Select>

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

                {/* <ButtonGroup variant='outline' spacing='6'>
  <Button colorScheme='blue'>Save</Button>
  <Button>Cancel</Button>
</ButtonGroup> */}

            </div>

            <RenderCanvas
                mesh={mesh!}
                color={meshColor}
                ref={meshRef}
                numParams={numericParameters}
                boolParams={booleanParameters}
            />
        </HStack >
    );
};