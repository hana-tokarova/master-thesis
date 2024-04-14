import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from 'react';

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { collections, CollectionType, JewelryType } from "../components/collections/Collections";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { useMeshParameters } from "../components/utils/mesh/ChangeMesh";
import { Finalize } from "../subpages/Finalize";
import { Lissajous } from "../subpages/Lissajous";
import { RenderCanvas } from "../subpages/RenderCanvas";
import { Visualize } from "../subpages/Visualize";


type ConfiguratorProps = {
    collection: CollectionType;
    jewelry: JewelryType;
}

export const ConfiguratorPage = (props: ConfiguratorProps) => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const mesh = collections[props.collection]?.meshes[props.jewelry];

    const { numericParameters, booleanParameters, setNumericParameters, setBooleanParameters, currentCollection, currentJewelryType } = useMeshParameters(props.collection, props.jewelry, mesh);
    const [meshColor, setMeshColor] = React.useState("ghostwhite");

    if (!mesh || !booleanParameters || !numericParameters || currentCollection !== props.collection || currentJewelryType !== props.jewelry) {
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

                {props.collection === CollectionType.Lissajous && (
                    <Lissajous
                        mesh={mesh}
                        numericParameters={numericParameters}
                        setNumericParameters={setNumericParameters}
                    />)}

                {props.collection === CollectionType.Torsion && (<div></div>)}

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
                    numParams={numericParameters}
                    boolParams={booleanParameters}
                />
            </Box>
        </HStack>
    );
};