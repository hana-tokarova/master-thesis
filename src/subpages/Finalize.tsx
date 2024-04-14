import { Box, Button, HStack, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { JewelryMesh } from '../components/collections/Collections';


type FinalizeProps = {
    mesh: JewelryMesh;
    meshRef: React.RefObject<THREE.Mesh>;
    exportMeshSTL: (mesh: THREE.Mesh) => void;
    exportMeshOBJ: (mesh: THREE.Mesh) => void;
    exportMeshGlTF: (mesh: THREE.Mesh) => void;
};

export const Finalize = ({ mesh, meshRef, exportMeshSTL, exportMeshOBJ, exportMeshGlTF }: FinalizeProps) => {
    return (
        <HStack spacing={5} >
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

                >
                    <Box textAlign="left" w="full"> Share Design</Box>
                </Button>
            </Box>


            <Box
                paddingTop={14}
            >
                <Text
                    fontFamily={"heading"}
                    fontWeight="500"
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                    paddingTop={2}
                >
                    Dimensions
                </Text>
                <Text
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                >
                    {mesh.dimensions().x} x {mesh.dimensions().y} x {mesh.dimensions().z} mm
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