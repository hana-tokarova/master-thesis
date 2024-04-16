import { Box, Button, ButtonGroup, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Select, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { JewelryMesh, RingSize } from '../components/collections/Collections';


type FinalizeProps = {
    parameters: any;
    mesh: JewelryMesh;
    meshRef: React.RefObject<THREE.Mesh>;
    sliderParameters: { [key: string]: number };
    dropdownParameters: { [key: string]: RingSize };
    exportMeshSTL: (mesh: THREE.Mesh) => void;
    exportMeshOBJ: (mesh: THREE.Mesh) => void;
    exportMeshGlTF: (mesh: THREE.Mesh) => void;
};

export const Finalize = ({ parameters, mesh, meshRef, sliderParameters, dropdownParameters, exportMeshSTL, exportMeshOBJ, exportMeshGlTF }: FinalizeProps) => {
    const [, copy] = useCopyToClipboard();
    const toast = useToast();

    const { isOpen, onToggle, onClose } = useDisclosure();

    return (
        <HStack spacing={5} alignItems="flex-start" >
            <Box paddingBottom={10}>
                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingTop={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                    / Finalize
                </Text>

                <Select
                    w={44}
                    fontFamily={"heading"}
                    fontWeight="500"
                    placeholder='Export model'
                    bg='brand.400'
                    border="none"
                    color='brand.50'
                    size='md'
                    shadow={'lg'}
                    paddingTop={2}
                    paddingBottom={4}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                >
                    <option value='stl' onClick={() => exportMeshSTL(meshRef.current!)}>to .STL</option>
                    <option value='obj' onClick={() => exportMeshOBJ(meshRef.current!)}>to .OBJ</option>
                    <option value='gltf' onClick={() => exportMeshGlTF(meshRef.current!)}>to .glTF</option>
                </Select>


                <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    placement='right'
                    closeOnBlur={false}
                >
                    <PopoverTrigger>
                        <Button
                            size='md'
                            fontFamily={"heading"}
                            fontWeight="500"
                            bg='brand.400'
                            color='brand.50'
                            w={44}
                            shadow={'lg'}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.300' }}
                            onClick={async () => {
                                try {
                                    const share = window.location.href + `?config=${btoa(JSON.stringify(parameters))}`
                                    await copy(share)
                                    toast({
                                        title: "Design saved!",
                                        description: "Design link saved to your clipboard.",
                                        status: "success",
                                        duration: 9000,
                                    })
                                } catch (error) {
                                    onToggle();
                                }
                            }}
                        >
                            <Box textAlign="left" w="full"> Share Design</Box>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Are you sure you want to continue with your action?
                        </PopoverBody>
                        <PopoverFooter display='flex' justifyContent='flex-end'>
                            <ButtonGroup size='sm'>
                                <Button variant='outline'>Cancel</Button>
                                <Button colorScheme='red'>Apply</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box
                paddingTop={14}
            >
                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                >
                    Dimensions
                    <Text
                        fontFamily={"heading"}
                        fontWeight="400"
                        fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                    >
                        (base mesh only)
                    </Text>
                </Text>
                <Text
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                >
                    {dropdownParameters && Object.keys(dropdownParameters).length === 0
                        ? (
                            sliderParameters["scaleC"] !== undefined
                                ? `${sliderParameters["scaleA"]} x ${sliderParameters["scaleB"]} x ${sliderParameters["scaleC"]} mm`
                                : `${sliderParameters["scaleA"]} x ${sliderParameters["scaleB"]} x ${sliderParameters["r"]} mm`
                        )
                        : `${dropdownParameters["scaleA"].diameter} x ${dropdownParameters["scaleA"].diameter} x ${sliderParameters["scaleB"]} mm`
                    }
                </Text>


                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                    paddingTop={2}
                >
                    Estimated price total
                </Text>
                <Text
                    fontFamily={"heading"}
                    fontWeight="400"
                    fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                    paddingBottom={10}
                >
                    €5,00
                </Text>
            </Box>
        </HStack>
    );
}