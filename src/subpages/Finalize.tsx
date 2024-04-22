import {
    Box,
    Button,
    HStack,
    Icon,
    Input,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Select,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useForceUpdate } from 'framer-motion';
import React, { ChangeEvent, useEffect } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaBug, FaCheck } from 'react-icons/fa';
import { ThreeVolume } from 'three-volume';
import { useCopyToClipboard } from 'usehooks-ts';
import { forAnimationFrame } from 'waitasecond';
import { JewelryType, Material } from '../components/collections/Collections';

type FinalizeProps = {
    parameters: any;
    meshRef: React.RefObject<THREE.Mesh>;
    currentJewelryType: JewelryType;
    currentMaterial: Material;
    exportMeshSTL: (mesh: THREE.Mesh) => void;
    exportMeshOBJ: (mesh: THREE.Mesh) => void;
    exportMeshGlTF: (mesh: THREE.Mesh) => void;
};

export const Finalize = ({
    parameters,
    meshRef,
    exportMeshSTL,
    exportMeshOBJ,
    exportMeshGlTF,
    currentMaterial,
    currentJewelryType,
}: FinalizeProps) => {
    const exportOptions = [
        { value: 'stl', function: exportMeshSTL, label: '.STL' },
        { value: 'obj', function: exportMeshOBJ, label: '.OBJ' },
        { value: 'gltf', function: exportMeshGlTF, label: '.glTF' },
    ];

    const [, copy] = useCopyToClipboard();
    const toast = useToast();

    const { isOpen, onToggle, onClose } = useDisclosure();

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

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        const option = exportOptions.find((option) => option.value === newValue);
        if (option && meshRef.current) {
            try {
                option.function(meshRef.current);
                toast({
                    position: 'bottom',
                    status: 'success',
                    duration: 10000,
                    render: () => (
                        <HStack color="white" p={3} bg="green.400" boxShadow={'md'} borderRadius="5" align="start">
                            <Icon as={FaCheck} w={5} h={5} paddingTop={1} color="brand.200" />
                            <Box>
                                <Text fontFamily={'heading'} fontWeight="500" size={'lg'}>
                                    Your file has been successfully exported as {option.label}
                                </Text>
                                <Text fontFamily={'body'} fontWeight="400">
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
                    duration: 10000,
                    render: () => (
                        <HStack color="white" p={3} bg="red.400" boxShadow={'md'} borderRadius="5" align="start">
                            <Icon as={FaBug} w={5} h={5} paddingTop={1} color="brand.200" />
                            <Box>
                                <Text fontFamily={'heading'} fontWeight="500" size={'lg'}>
                                    An error occurred when exporting the file as {option.label}
                                </Text>
                                <Text fontFamily={'body'} fontWeight="400">
                                    {(error as Error).message}
                                </Text>
                            </Box>
                        </HStack>
                    ),
                });
            }
        }
        // Reset the selected option after processing
        setSelectedOption('');
    };

    return (
        <HStack spacing={4} alignItems="flex-start">
            <Box paddingBottom={10}>
                <Text
                    fontFamily={'heading'}
                    fontWeight="500"
                    fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / Finalize
                </Text>

                <Select
                    w={44}
                    fontFamily={'heading'}
                    fontWeight="500"
                    fontSize={{ base: 'sm', md: 'md' }}
                    placeholder="Export model"
                    bg="brand.200"
                    border="none"
                    color="brand.50"
                    size="md"
                    cursor="pointer"
                    shadow={'lg'}
                    paddingTop={2}
                    paddingBottom={4}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.400' }}
                    onChange={handleChange}
                    value={selectedOption} // Controlled component
                >
                    {exportOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            to {option.label}
                        </option>
                    ))}
                </Select>

                <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    placement="bottom-end"
                    closeOnBlur={false}
                >
                    <PopoverTrigger>
                        <Button
                            rightIcon={<BiCopy />}
                            size="md"
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: 'sm', md: 'md' }}
                            bg="brand.200"
                            color="brand.50"
                            w={44}
                            shadow={'lg'}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.400' }}
                            onClick={async () => {
                                try {
                                    const share = window.location.href + `?config=${btoa(JSON.stringify(parameters))}`;
                                    await copy(share);
                                    toast({
                                        position: 'bottom',
                                        status: 'success',
                                        duration: 10000,
                                        render: () => (
                                            <HStack
                                                color="white"
                                                p={3}
                                                bg="green.400"
                                                boxShadow={'md'}
                                                borderRadius="5"
                                                align="start"
                                            >
                                                <Icon as={FaCheck} w={5} h={5} paddingTop={1} color="brand.200" />
                                                <Box>
                                                    <Text fontFamily={'heading'} fontWeight="500" size={'lg'}>
                                                        Design saved!
                                                    </Text>
                                                    <Text fontFamily={'body'} fontWeight="400">
                                                        Design link saved to your clipboard.
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        ),
                                    });
                                } catch (error) {
                                    onToggle();
                                }
                            }}
                        >
                            <Text textAlign="left" w="full">
                                {' '}
                                Save Design Link
                            </Text>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverCloseButton color={'brand.200'} />
                        <PopoverBody bg="brand.400" boxShadow={'md'} borderRadius="5">
                            <Text fontFamily={'heading'} fontWeight="500" size={'lg'} color="white">
                                Design saved!
                            </Text>
                            <Text fontFamily={'body'} fontWeight="400" color="white" align="start" paddingBottom={2}>
                                Here you can copy the link to your design.
                                <br />
                                Don't forget to set dimensions to 'mm' before printing.
                            </Text>
                            <Input
                                bg={'brand.200'}
                                focusBorderColor="brand.200"
                                value={window.location.href + `?config=${btoa(JSON.stringify(parameters))}`}
                                isDisabled
                                cursor="text !important"
                            />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box paddingTop={14}>
                <Text fontFamily={'heading'} fontWeight="500" fontSize={{ base: 'sm', md: 'md' }}>
                    Dimensions
                    <Text as="span" fontFamily={'heading'} fontWeight="400" fontSize={{ base: 'xs', md: 'sm' }}>
                        <br />
                        (width x depth x height)
                    </Text>
                </Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }}>
                    {boundingBox !== null
                        ? `${boundingBox.width.toFixed(1)} x ${boundingBox.depth.toFixed(
                              1,
                          )} x ${boundingBox.height.toFixed(1)} mm`
                        : 'Loading...'}
                </Text>

                {volume !== null && (
                    <>
                        <Text
                            paddingTop={2}
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: 'sm', md: 'md' }}
                        >
                            Estimated {currentMaterial.name} price
                            <Text as="span" fontFamily={'heading'} fontWeight="400" fontSize={{ base: 'xs', md: 'sm' }}>
                                <br />
                                (based on volume)
                            </Text>
                        </Text>
                        <Text
                            fontFamily={'heading'}
                            fontWeight="400"
                            fontSize={{ base: 'lg', md: '2xl' }}
                            paddingBottom={10}
                        >
                            ~€{(volume * currentMaterial.additionalCost).toFixed(2)}
                        </Text>
                    </>
                )}
            </Box>
        </HStack>
    );
};
