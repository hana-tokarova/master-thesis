import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from 'react';

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { collections, CollectionType, JewelryType } from "../components/collections/Collections";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { useMeshParameters } from "../components/utils/mesh/ChangeMesh";
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
        sliderParameters, switchParameters, numberInputParameters,
        setSliderParameters, setSwitchParameters, setNumberInputParameters,
        currentCollection, currentJewelryType
    } = useMeshParameters(collection, jewelry, mesh);

    const [meshColor, setMeshColor] = React.useState("ghostwhite");

    if (!mesh || !switchParameters || !sliderParameters || currentCollection !== collection || currentJewelryType !== jewelry) {
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
                    Back to jewelry types
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
                    rowGap={{ base: 4, sm: 6, md: 8, lg: 10 }}
                    columnGap={4}
                    wrap='wrap'
                >
                    {mesh && Object.entries(mesh.numberInputParameters).map(([parameterName, parameterDetails]) => (
                        parameterDetails.tag === 'general' && (
                            <Box key={parameterName + parameterDetails}>
                                <Text
                                    fontFamily={"heading"}
                                    fontWeight="400"
                                    fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                                >
                                    {parameterDetails.name}
                                </Text>
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
            </Box>

            <Box
                position="fixed"
                right="0"
                top="0"
                h="100vh"
                w="65vw"
                overflow="hidden"
            >
                <RenderCanvas
                    mesh={mesh!}
                    color={meshColor}
                    ref={meshRef}
                    sliderParams={sliderParameters}
                    switchParams={switchParameters}
                    numberInputParams={numberInputParameters}
                />
            </Box>
        </HStack>
    );
};