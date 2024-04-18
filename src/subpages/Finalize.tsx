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
import React, { useEffect } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaBug, FaCheck } from 'react-icons/fa';
import { ThreeVolume } from 'three-volume';
import { useCopyToClipboard } from 'usehooks-ts';
import { forAnimationFrame } from 'waitasecond';
import { CollectionType, RingSize } from '../components/collections/Collections';

type FinalizeProps = {
    parameters: any;
    meshRef: React.RefObject<THREE.Mesh>;
    sliderParameters: { [key: string]: number };
    dropdownParameters: { [key: string]: RingSize };
    currentCollection: CollectionType;
    exportMeshSTL: (mesh: THREE.Mesh) => void;
    exportMeshOBJ: (mesh: THREE.Mesh) => void;
    exportMeshGlTF: (mesh: THREE.Mesh) => void;
};

export const Finalize = ({
    parameters,
    meshRef,
    sliderParameters,
    dropdownParameters,
    exportMeshSTL,
    exportMeshOBJ,
    exportMeshGlTF,
    currentCollection,
}: FinalizeProps) => {
    const exportOptions = [
        { value: 'stl', function: exportMeshSTL, label: '.STL' },
        { value: 'obj', function: exportMeshOBJ, label: '.OBJ' },
        { value: 'gltf', function: exportMeshGlTF, label: '.glTF' },
    ];

    const [, copy] = useCopyToClipboard();
    const toast = useToast();

    const { isOpen, onToggle, onClose } = useDisclosure();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return (
        <HStack spacing={5} alignItems="flex-start">
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
                    placeholder="Export model"
                    bg="brand.400"
                    border="none"
                    color="brand.50"
                    size="md"
                    cursor="pointer"
                    shadow={'lg'}
                    paddingTop={2}
                    paddingBottom={4}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                    onChange={(e) => {
                        const option = exportOptions.find((option) => option.value === e.target.value);
                        if (option && meshRef.current) {
                            try {
                                option.function(meshRef.current);
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
                                        <HStack
                                            color="white"
                                            p={3}
                                            bg="red.400"
                                            boxShadow={'md'}
                                            borderRadius="5"
                                            align="start"
                                        >
                                            <Icon as={FaBug} w={5} h={5} paddingTop={1} color="brand.200" />
                                            <Box>
                                                <Text fontFamily={'heading'} fontWeight="500" size={'lg'}>
                                                    An error when exporting the file as {option.label}
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
                    }}
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
                            bg="brand.400"
                            color="brand.50"
                            w={44}
                            shadow={'lg'}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.300' }}
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
                                                        <br />
                                                        Don't forget to set dimensions to 'mm' before printing.
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
                <Text fontFamily={'heading'} fontWeight="500" fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}>
                    Dimensions
                    <Text
                        as="span"
                        fontFamily={'heading'}
                        fontWeight="400"
                        fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                    >
                        <br />
                        (base mesh only)
                    </Text>
                </Text>
                <Text fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}>
                    {currentCollection === CollectionType.Lissajous
                        ? Object.keys(dropdownParameters).length === 0
                            ? sliderParameters['scaleC'] !== undefined
                                ? `${sliderParameters['scaleA']} x ${sliderParameters['scaleB']} x ${sliderParameters['scaleC']} mm`
                                : `${sliderParameters['scaleA']} x ${sliderParameters['scaleB']} x ${sliderParameters['r']} mm`
                            : `${dropdownParameters['scaleA'].diameter} x ${dropdownParameters['scaleA'].diameter} x ${sliderParameters['scaleB']} mm`
                        : Object.keys(dropdownParameters).length === 0
                        ? `${sliderParameters['majorR']} x ${sliderParameters['minorR']} x ${sliderParameters['scaleC']} mm`
                        : `${dropdownParameters['majorR'].diameter} x ${dropdownParameters['majorR'].diameter} x ${sliderParameters['scaleC']} mm`}
                </Text>

                {volume !== null && (
                    <>
                        <Text
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                            paddingTop={2}
                        >
                            Estimated material price
                            <Text
                                as="span"
                                fontFamily={'heading'}
                                fontWeight="400"
                                fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                            >
                                <br />
                                (based on volume)
                            </Text>
                        </Text>
                        <Text
                            fontFamily={'heading'}
                            fontWeight="400"
                            fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
                            paddingBottom={10}
                        >
                            €{(volume * parameters.currentMaterial.additionalCost).toFixed(2)}
                        </Text>
                    </>
                )}
            </Box>
        </HStack>
    );
};
