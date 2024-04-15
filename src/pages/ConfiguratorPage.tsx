import { Box, Button, Flex, HStack, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip } from "@chakra-ui/react";
import React from 'react';

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { collections, CollectionType, JewelryType, ringSizes } from "../components/collections/Collections";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { changeDropdownParameter, changeNumericParameter, useMeshParameters } from "../components/utils/mesh/ChangeMesh";
import { Collection } from "../subpages/Collection";
import { Finalize } from "../subpages/Finalize";
import { Info } from "../subpages/Info";
import { RenderCanvas } from "../subpages/RenderCanvas";
import { Visualize } from "../subpages/Visualize";


type ConfiguratorProps = {
    collection: CollectionType;
    jewelry: JewelryType;
}

export const ConfiguratorPage = ({ collection, jewelry }: ConfiguratorProps) => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const mesh = collections[collection]?.meshes[jewelry];

    const {
        sliderParameters, switchParameters, dropdownParameters,
        setSliderParameters, setSwitchParameters, setDropdownParameters,
        currentCollection, currentJewelryType
    } = useMeshParameters(collection, jewelry, mesh);

    const [meshColor, setMeshColor] = React.useState("ghostwhite");

    if (!mesh || !switchParameters || !sliderParameters || !dropdownParameters || currentCollection !== collection || currentJewelryType !== jewelry) {
        return <></>;
    }

    return (
        <HStack
            paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingTop={{ base: 0, sm: 4, md: 4, lg: 6 }}
            alignItems={"left"}
            spacing={5}
            w="100vw"
            h="100vh"
            minH="100vh"
            wrap="nowrap"
            position="relative"
        >
            <Box
                flex="0.35"
                paddingRight="20px"
                w="35vw"
                h="auto"
                zIndex={1}
            >
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
                    Back to collection types
                </Button>

                <Info
                    collection={collection}
                    jewelry={jewelry}
                    mesh={mesh}
                />

                {/* // General */}
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
                    rowGap={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    columnGap={4}
                    wrap='wrap'
                >
                    <Text
                        fontFamily={"heading"}
                        fontWeight="400"
                        fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                    >
                        Jewelry type
                    </Text>

                    {mesh && Object.entries(mesh.dropdownParameters).map(([parameterName, parameterDetails]) => (
                        <Box key={parameterName + parameterDetails}>
                            <Text
                                fontFamily={"heading"}
                                fontWeight="400"
                                fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                            >
                                {parameterDetails.name}
                                <Box
                                    as="span"
                                    fontWeight="600"
                                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                >
                                    {" (Diameter:"}
                                    <Box
                                        fontWeight="400"
                                        as="span"
                                        fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                    >
                                        {" " + dropdownParameters[parameterName]?.diameter + " mm)"}
                                    </Box>
                                </Box>

                            </Text>
                            <Select
                                w={44}
                                fontFamily={"body"}
                                fontWeight="400"
                                fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                bg='brand.200'
                                border="none"
                                color='brand.50'
                                size='md'
                                shadow={'lg'}
                                paddingTop={2}
                                paddingBottom={4}
                                _hover={{ bg: 'brand.400' }}
                                _focus={{ bg: 'brand.300' }}
                                onChange={(event) => {
                                    const parsedValue = parseInt(event.target.value);
                                    const selectedSize = ringSizes.find(size => size.value === parsedValue);
                                    changeDropdownParameter(setDropdownParameters, parameterName, selectedSize!);
                                }}
                            >
                                {jewelry === "ring" && ringSizes.map((ringSize) => (
                                    <option
                                        key={ringSize.value.toString()}
                                        value={ringSize.value}
                                    >
                                        {"Sz " + ringSize.value.toString()}
                                    </option>
                                ))
                                }
                            </Select>
                        </Box>
                    ))}

                    {mesh && Object.entries(mesh.sliderParameters).map(([parameterName, parameterDetails]) => (
                        parameterDetails.tag === 'general' && (
                            <Box key={parameterName + parameterDetails}>
                                <Text
                                    fontFamily={"heading"}
                                    fontWeight="400"
                                    fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                                >
                                    {parameterDetails.name}
                                    <Box
                                        as="span"
                                        fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                                    >
                                        {parameterName === "r" || "scaleB" ? " (in mm)" : ""}
                                    </Box>
                                </Text>
                                <Slider
                                    margin={2}
                                    w={{ base: "28", sm: "30", md: "32", lg: "40" }}
                                    value={sliderParameters[parameterName]}
                                    min={parameterDetails.min}
                                    max={parameterDetails.max}
                                    step={parameterDetails.step}
                                    onChange={(newValue) => changeNumericParameter(setSliderParameters, parameterName, newValue)}
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
                                        bg='brand.100'
                                        color='white'
                                        placement='bottom'
                                        label={sliderParameters[parameterName] + " mm"}
                                    >
                                        <SliderThumb
                                            _focus={{
                                                ring: "1px",
                                                ringColor: "brand.100",
                                                ringOffset: "1px",
                                                ringOffsetColor: "brand.100"
                                            }}
                                        />
                                    </Tooltip>
                                </Slider>
                            </Box>
                        )
                    ))}
                </Flex>
                {/* // General */}

                <Collection
                    collection={collection}
                    mesh={mesh}
                    sliderParameters={sliderParameters}
                    setSliderParameters={setSliderParameters}
                />

                <Visualize
                    colors={[["ghostwhite", "gray"], ["gold", "goldenrod"], ["greenyellow", "forestgreen"], ["cyan", "deepskyblue"], ["pink", "maroon"]]}
                    meshColor={meshColor}
                    setMeshColor={setMeshColor}
                />

                <Finalize
                    mesh={mesh}
                    meshRef={meshRef}
                    exportMeshSTL={exportMeshSTL}
                    exportMeshOBJ={exportMeshOBJ}
                    exportMeshGlTF={exportMeshGlTF}
                />
            </Box >

            <Box
                position="fixed"
                right="0"
                top="0"
                h="80vh"
                w="65vw"
                overflow="hidden"
            >
                <RenderCanvas
                    mesh={mesh!}
                    color={meshColor}
                    ref={meshRef}
                    sliderParams={sliderParameters}
                    switchParams={switchParameters}
                    dropdownParams={dropdownParameters}
                />
            </Box>
        </HStack >
    );
};