/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    BraceletSize,
    collections,
    CollectionType,
    JewelryType,
    Material,
    materials,
    RingSize,
} from '../components/collections/Collections';
import { exportMeshGlTF } from '../components/utils/exporters/ExportGlTF';
import { exportMeshOBJ } from '../components/utils/exporters/ExportOBJ';
import { exportMeshSTL } from '../components/utils/exporters/ExportSTL';
import { useMeshParameters } from '../components/utils/mesh/ChangeMesh';
import { Collection } from '../subpages/Collection';
import { Finalize } from '../subpages/Finalize';
import { General } from '../subpages/General';
import { GoBack } from '../subpages/GoBack';
import { Info } from '../subpages/Info';
import { StartupOverlay } from '../subpages/Overlay';
import { RenderCanvas } from '../subpages/RenderCanvas';
import { Visualize } from '../subpages/Visualize';

type ParameterState = {
    sliderParameters: { [key: string]: number };
    sliderMinParameters: { [key: string]: number };
    switchParameters: { [key: string]: boolean };
    dropdownParameters: { [key: string]: RingSize | BraceletSize };
    currentCollection: CollectionType;
    currentJewelryType: JewelryType;
    currentMaterial: Material;
    meshColor: string;
};

export const ConfiguratorPage = () => {
    const meshRef = React.useRef<THREE.Mesh>(null);

    const {
        mesh,
        sliderParameters,
        sliderMinParameters,
        switchParameters,
        dropdownParameters,
        setSliderParameters,
        setSliderMinParameters,
        setSwitchParameters,
        setDropdownParameters,
        currentCollection,
        setCurrentCollection,
        currentJewelryType,
        setCurrentJewelryType,
        currentMaterial,
        setCurrentMaterial,
        setMesh,
    } = useMeshParameters(CollectionType.Lissajous, JewelryType.Ring, materials.PLA);
    const [meshColor, setMeshColor] = React.useState('ghostwhite');

    const [initialParameters, setInitialParameters] = React.useState<ParameterState | null>(null);
    const [isDirty, setIsDirty] = React.useState(false);

    const [showOverlay, setShowOverlay] = React.useState(true);
    const handleOverlayClose = () => setShowOverlay(false);

    const { search } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const config = params.get('config');
        if (config) {
            const parsedConfig = JSON.parse(atob(config));
            setCurrentCollection(parsedConfig.currentCollection);
            setCurrentJewelryType(parsedConfig.currentJewelryType);
            setSliderParameters(parsedConfig.sliderParameters);
            setSliderMinParameters(parsedConfig.sliderMinParameters);
            setSwitchParameters(parsedConfig.switchParameters);
            setDropdownParameters(parsedConfig.dropdownParameters);
            setCurrentMaterial(parsedConfig.currentMaterial);
            setMeshColor(parsedConfig.meshColor);
            setMesh(
                collections[parsedConfig.currentCollection as CollectionType]?.meshes[
                    parsedConfig.currentJewelryType as JewelryType
                ],
            );

            setInitialParameters({
                sliderParameters: parsedConfig.sliderParameters,
                sliderMinParameters: parsedConfig.sliderMinParameters,
                switchParameters: parsedConfig.switchParameters,
                dropdownParameters: parsedConfig.dropdownParameters,
                currentCollection: parsedConfig.currentCollection,
                currentJewelryType: parsedConfig.currentJewelryType,
                currentMaterial: parsedConfig.currentMaterial,
                meshColor: parsedConfig.meshColor,
            });

            navigate('/configurator', { replace: true });
        }
    }, [
        navigate,
        search,
        setCurrentCollection,
        setCurrentJewelryType,
        setCurrentMaterial,
        setDropdownParameters,
        setSliderMinParameters,
        setSliderParameters,
        setSwitchParameters,
        setMesh,
    ]);

    useEffect(() => {
        const checkForChanges = () => {
            const currentParams = {
                sliderParameters,
                sliderMinParameters,
                switchParameters,
                dropdownParameters,
                currentCollection,
                currentJewelryType,
                currentMaterial,
                meshColor,
            };

            if (!isEqual(currentParams, initialParameters)) {
                setIsDirty(true);
            } else {
                setIsDirty(false);
            }
        };

        checkForChanges();
    }, [
        initialParameters,
        sliderParameters,
        sliderMinParameters,
        switchParameters,
        dropdownParameters,
        currentCollection,
        currentJewelryType,
        currentMaterial,
        meshColor,
    ]);

    const storeParameters = {
        sliderParameters,
        sliderMinParameters,
        switchParameters,
        dropdownParameters,
        currentCollection,
        currentJewelryType,
        currentMaterial,
        meshColor,
    };

    if (!mesh || !switchParameters || !sliderParameters || !dropdownParameters) {
        return <></>;
    }

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            px={{ base: 5, sm: 20, md: 24, lg: 28 }}
            py={{ base: 0, sm: 2, md: 2, lg: 3 }}
            alignItems="start"
            w="100vw"
            minH="calc(100vh - 80px)"
            wrap="nowrap"
            position="relative"
        >
            <Box
                order={{ base: 2, md: 1 }}
                flex={{ base: '1 1 auto', md: '0.4', lg: '0.4' }}
                p="40px"
                w={{ base: '100%', md: '40vw', lg: '40vw' }}
                h="auto"
                zIndex={{ base: 1, md: 3 }}
                overflowY="auto"
                paddingTop={{ base: '37vh', md: '0' }}
            >
                <GoBack isDirty={isDirty} setIsDirty={setIsDirty} navigate={navigate} />

                <Info collection={currentCollection} jewelry={currentJewelryType} mesh={mesh} />

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
                    switchParameters={switchParameters}
                    setSwitchParameters={setSwitchParameters}
                />

                <Visualize
                    setSliderMinParameters={setSliderMinParameters}
                    currentMaterial={currentMaterial}
                    setCurrentMaterial={setCurrentMaterial}
                    colors={[
                        ['ghostwhite', 'gray'],
                        ['gold', 'goldenrod'],
                        ['greenyellow', 'forestgreen'],
                        ['cyan', 'deepskyblue'],
                        ['pink', 'maroon'],
                    ]}
                    meshColor={meshColor}
                    setMeshColor={setMeshColor}
                />

                <Finalize
                    parameters={storeParameters}
                    meshRef={meshRef}
                    currentMaterial={currentMaterial}
                    currentJewelryType={currentJewelryType}
                    exportMeshSTL={exportMeshSTL}
                    exportMeshOBJ={exportMeshOBJ}
                    exportMeshGlTF={exportMeshGlTF}
                />
            </Box>

            <Box
                order={{ base: 1, md: 2 }}
                position="fixed"
                right="0"
                top="0"
                w={{ base: '100%', md: '60vw', lg: '60vw' }}
                overflowY="hidden"
                zIndex={2}
                boxShadow={{ base: '0 0 10px 0 rgba(0, 0, 0, 0.1)', md: 'none' }}
                h={{ base: '45vh', md: '90vh', lg: '90vh' }}
                cursor="pointer"
                paddingTop={{ base: '50px', md: '0' }}
            >
                {showOverlay && <StartupOverlay onClose={handleOverlayClose} />}
                <RenderCanvas
                    currentJewelry={currentJewelryType}
                    mesh={mesh!}
                    color={meshColor}
                    ref={meshRef}
                    currentMaterial={currentMaterial}
                    sliderParams={sliderParameters}
                    switchParams={switchParameters}
                    dropdownParams={dropdownParameters}
                />
            </Box>
        </Flex>
    );
};
