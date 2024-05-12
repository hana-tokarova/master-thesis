import { Box, Button, Flex, HStack, Icon, Select, Text, useToast } from '@chakra-ui/react';
import { useForceUpdate } from 'framer-motion';
import React, { ChangeEvent, useEffect } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaBug, FaCheck } from 'react-icons/fa';
import { ThreeVolume } from 'three-volume';
import { useCopyToClipboard } from 'usehooks-ts';
import { forAnimationFrame } from 'waitasecond';
import { CollectionType, JewelryType, Material } from '../components/collections/Collections';

type FinalizeProps = {
    parameters: any;
    meshRef: React.RefObject<THREE.Mesh>;
    currentJewelryType: JewelryType;
    currentMaterial: Material;
    currentCollection: CollectionType;
    exportMeshSTL: (mesh: THREE.Mesh, name: string) => void;
    exportMeshOBJ: (mesh: THREE.Mesh, name: string) => void;
    exportMeshGlTF: (mesh: THREE.Mesh, name: string) => void;
};

export const Finalize = ({
    parameters,
    meshRef,
    exportMeshSTL,
    exportMeshOBJ,
    exportMeshGlTF,
    currentMaterial,
    currentJewelryType,
    currentCollection,
}: FinalizeProps) => {
    const exportOptions = [
        { value: 'stl', function: exportMeshSTL, label: '.STL' },
        { value: 'obj', function: exportMeshOBJ, label: '.OBJ' },
        { value: 'gltf', function: exportMeshGlTF, label: '.glTF' },
    ];

    const [, copy] = useCopyToClipboard();
    const toast = useToast();

    const [volume, setVolume] = React.useState<number | null>(null);
    const [reload, i] = useForceUpdate();

    useEffect(() => {
        (async () => {
            await forAnimationFrame();

            if (!meshRef.current || !meshRef.current.geometry) {
                reload();
                return;
            }

            const geometry = meshRef.current.geometry;

            setVolume(ThreeVolume({ geometry, precision: true } as any));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meshRef, meshRef.current, meshRef.current?.geometry, i]);

    const [boundingBox, setBoundingBox] = React.useState<{ width: number; height: number; depth: number } | null>(null);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.geometry.computeBoundingBox();
            const boundingBox = meshRef.current.geometry.boundingBox;

            if (boundingBox) {
                const width = boundingBox.max.x - boundingBox.min.x;
                const height = boundingBox.max.y - boundingBox.min.y;
                const depth = boundingBox.max.z - boundingBox.min.z;

                setBoundingBox({ width, height, depth });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meshRef, meshRef.current, meshRef.current?.geometry, currentJewelryType]);

    const [selectedOption, setSelectedOption] = React.useState('');

    const handleSaving = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        const option = exportOptions.find((option) => option.value === newValue);
        if (option && meshRef.current) {
            try {
                option.function(meshRef.current, currentCollection.toString() + '-' + currentJewelryType.toString());
                toast({
                    position: 'bottom',
                    status: 'success',
                    duration: 7000,
                    render: () => (
                        <HStack color="white" p={3} bg="green.400" boxShadow={'md'} borderRadius="5" align="start">
                            <Icon as={FaCheck} w={5} h={5} paddingTop={1} color="brand.200" />
                            <Box>
                                <Text textStyle="subheaderHighlight" size={'lg'} color="brand.200">
                                    Your file has been successfully exported as {option.label}
                                </Text>
                                <Text textStyle="body" color="brand.200">
                                    Happy 3D printing!
                                </Text>
                            </Box>
                        </HStack>
                    ),
                });
            } catch (error) {
                toast({
                    position: 'bottom',
                    status: 'error',
                    duration: 7000,
                    render: () => (
                        <HStack color="white" p={3} bg="red.400" boxShadow={'md'} borderRadius="5" align="start">
                            <Icon as={FaBug} w={5} h={5} paddingTop={1} color="brand.200" />
                            <Box>
                                <Text textStyle="subheaderHighlight" size={'lg'} color="brand.200">
                                    An error occurred when exporting the file as {option.label}
                                </Text>
                                <Text textStyle="body" color="brand.200">
                                    {(error as Error).message}
                                </Text>
                            </Box>
                        </HStack>
                    ),
                });
            }
        }
        setSelectedOption('');
    };

    const handleCopying = async () => {
        try {
            const share = window.location.href + `?config=${btoa(JSON.stringify(parameters))}`;
            await copy(share);
            toast({
                position: 'bottom',
                status: 'success',
                duration: 7000,
                render: () => (
                    <HStack color="white" p={3} bg="green.400" boxShadow={'md'} borderRadius="5" align="start">
                        <Icon as={FaCheck} w={5} h={5} paddingTop={1} color="brand.200" />
                        <Box>
                            <Text textStyle="subheaderHighlight" size={'lg'} color="brand.200">
                                Design saved!
                            </Text>
                            <Text textStyle="body" color="brand.200">
                                Design link saved to your clipboard.
                            </Text>
                        </Box>
                    </HStack>
                ),
            });
        } catch (error) {
            toast({
                position: 'bottom',
                status: 'error',
                duration: 7000,
                render: () => (
                    <HStack color="white" p={3} bg="red.400" boxShadow={'md'} borderRadius="5" align="start">
                        <Icon as={FaBug} w={5} h={5} paddingTop={1} color="brand.200" />
                        <Box>
                            <Text textStyle="subheaderHighlight" size={'lg'} color="brand.200">
                                An error occurred when copying the design link!
                            </Text>
                            <Text textStyle="body" color="brand.200">
                                {(error as Error).message}
                            </Text>
                        </Box>
                    </HStack>
                ),
            });
        }
    };

    return (
        <Box>
            <Text textStyle={'header2'} paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                / Finalize
            </Text>
            <Flex paddingTop="2" direction="row" rowGap={{ base: 2, sm: 3, md: 4, lg: 5 }} columnGap={4} wrap="wrap">
                <Box>
                    <Select
                        w={44}
                        textStyle={'bodyHighlight'}
                        fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                        placeholder="Save 3D model"
                        bg="brand.200"
                        color="brand.50"
                        border="none"
                        cursor="pointer"
                        shadow={'lg'}
                        paddingTop={2}
                        paddingBottom={4}
                        _hover={{ bg: 'brand.400' }}
                        onChange={handleSaving}
                        value={selectedOption}
                    >
                        {exportOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                as {option.label}
                            </option>
                        ))}
                    </Select>

                    <Button
                        rightIcon={<BiCopy />}
                        size="md"
                        textStyle="bodyHighlight"
                        bg="brand.200"
                        w={44}
                        shadow={'lg'}
                        _hover={{ bg: 'brand.400' }}
                        onClick={handleCopying}
                    >
                        <Text
                            textStyle={'bodyHighlight'}
                            fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                            textAlign="left"
                            w="full"
                        >
                            Copy Configuration
                        </Text>
                    </Button>
                </Box>

                <Box>
                    <Text paddingTop={2} textStyle={'bodyHighlight'}>
                        Dimensions
                        <Text as="span" textStyle={'body'}>
                            <br />
                            (width x depth x height)
                        </Text>
                    </Text>
                    <Text textStyle={'body'}>
                        {boundingBox !== null
                            ? `${boundingBox.width.toFixed(1)} x ${boundingBox.depth.toFixed(
                                  1,
                              )} x ${boundingBox.height.toFixed(1)} mm`
                            : 'Loading...'}
                    </Text>

                    {volume !== null && (
                        <>
                            <Text paddingTop={2} textStyle={'bodyHighlight'}>
                                Estimated {currentMaterial.name} price
                                <Text as="span" textStyle={'body'}>
                                    <br />
                                    (based on volume)
                                </Text>
                            </Text>
                            <Text textStyle={'header2'} paddingBottom={10}>
                                Approx. €{(volume * currentMaterial.additionalCost + 0.01).toFixed(2)}
                            </Text>
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};
