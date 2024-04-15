import { Box, Button, HStack } from "@chakra-ui/react";
import React from 'react';

import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { CollectionType, JewelryType } from "../components/collections/Collections";
import { exportMeshGlTF } from "../components/utils/exporters/ExportGlTF";
import { exportMeshOBJ } from "../components/utils/exporters/ExportOBJ";
import { exportMeshSTL } from "../components/utils/exporters/ExportSTL";
import { useMeshParameters } from "../components/utils/mesh/ChangeMesh";
import { Collection } from "../subpages/Collection";
import { Finalize } from "../subpages/Finalize";
import { General } from "../subpages/General";
import { Info } from "../subpages/Info";
import { RenderCanvas } from "../subpages/RenderCanvas";
import { Visualize } from "../subpages/Visualize";


export const ConfiguratorPage = () => {
    const meshRef = React.useRef<THREE.Mesh>(null);

    const {
        mesh, sliderParameters, sliderMinParameters, switchParameters, dropdownParameters,
        setSliderParameters, setSliderMinParameters, setSwitchParameters, setDropdownParameters,
        currentCollection, setCurrentCollection,
        currentJewelryType, setCurrentJewelryType,
        currentMaterial, setCurrentMaterial
    } = useMeshParameters(CollectionType.Lissajous, JewelryType.Ring);

    const [meshColor, setMeshColor] = React.useState("ghostwhite");

    if (!mesh || !switchParameters || !sliderParameters || !dropdownParameters) {
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
                    to={"/create"}
                    fontFamily={"heading"}
                    fontWeight="400"
                    variant="link"
                    color={"brand.50"}
                    style={{ padding: 0 }}
                >
                    Back to collection types
                </Button>

                <Info
                    collection={currentCollection}
                    jewelry={currentJewelryType}
                    mesh={mesh}
                />

                <General
                    mesh={mesh}
                    currentJewelryType={currentJewelryType}
                    setCurrentJewelryType={setCurrentJewelryType}
                    dropdownParameters={dropdownParameters}
                    setDropdownParameters={setDropdownParameters}
                    sliderParameters={sliderParameters}
                    setSliderParameters={setSliderParameters}
                    sliderMinParameters={sliderMinParameters}
                />

                <Collection
                    collection={currentCollection}
                    mesh={mesh}
                    sliderParameters={sliderParameters}
                    setSliderParameters={setSliderParameters}
                />

                <Visualize
                    setSliderMinParameters={setSliderMinParameters}
                    currentMaterial={currentMaterial}
                    setCurrentMaterial={setCurrentMaterial}
                    colors={[["ghostwhite", "gray"], ["gold", "goldenrod"], ["greenyellow", "forestgreen"], ["cyan", "deepskyblue"], ["pink", "maroon"]]}
                    meshColor={meshColor}
                    setMeshColor={setMeshColor}
                />

                <Finalize
                    mesh={mesh}
                    meshRef={meshRef}
                    sliderParameters={sliderParameters}
                    dropdownParameters={dropdownParameters}
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