import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { Material, materials } from '../components/collections/Collections';
import { ColorPair, ColorPicker } from '../components/layout/ColorPicker';
import { changeCurrentMaterial, changeNumericParameter } from '../components/utils/mesh/ChangeMesh';

type VisualizeProps = {
    setSliderMinParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    currentMaterial: Material;
    setCurrentMaterial: React.Dispatch<React.SetStateAction<Material>>;
    colors: ColorPair[];
    meshColor: string;
    setMeshColor: (color: string) => void;
};

export const Visualize = ({
    setSliderMinParameters,
    currentMaterial,
    setCurrentMaterial,
    colors,
    meshColor,
    setMeshColor,
}: VisualizeProps) => {
    return (
        <Box>
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
                paddingTop="1"
                color={'brand.50'}
            >
                / Visualize
            </Text>

            <Flex paddingTop="2" direction="row" rowGap={4} columnGap={4} wrap="wrap">
                <Text
                    as="span"
                    paddingBottom="1"
                    fontFamily={'heading'}
                    fontWeight="400"
                    fontSize={{ base: 'sm', md: 'md' }}
                    w={{ base: 36, md: 44 }}
                    color={'brand.50'}
                >
                    Materials
                    <br />
                    <Box as="span" fontWeight="400" color={'brand.50'} fontSize={{ base: 'xs', md: 'sm' }}>
                        {' (Changes minimal wall thickness)'}
                    </Box>
                    <Box>
                        <Select
                            w={{ base: 36, md: 44 }}
                            fontFamily={'body'}
                            fontWeight="400"
                            fontSize={{ base: 'xs', md: 'sm' }}
                            bg="brand.200"
                            border="none"
                            value={currentMaterial.name}
                            color="brand.50"
                            size="md"
                            cursor="pointer"
                            shadow={'lg'}
                            paddingTop={2}
                            _hover={{ bg: 'brand.400' }}
                            _focus={{ bg: 'brand.400' }}
                            onChange={(event) => {
                                const newValue = event.target.value;
                                changeCurrentMaterial(setCurrentMaterial, materials[newValue]);
                                changeNumericParameter(
                                    setSliderMinParameters,
                                    'r',
                                    materials[newValue].thicknessMinimum,
                                );
                                changeNumericParameter(
                                    setSliderMinParameters,
                                    'minorR',
                                    materials[newValue].thicknessMinimum,
                                );
                            }}
                        >
                            {Object.entries(materials).map(([key, val]) => (
                                <option key={key} value={val.name}>
                                    {val.name} (min. diameter {val.thicknessMinimum.toFixed(2)} mm)
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Text>

                <Text
                    as="span"
                    paddingBottom="1"
                    fontFamily={'heading'}
                    fontWeight="400"
                    fontSize={{ base: 'sm', md: 'md' }}
                    w={{ base: 36, md: 48 }}
                    color={'brand.50'}
                >
                    Colors
                    <br />
                    <Box as="span" fontWeight="400" color={'brand.50'} fontSize={{ base: 'xs', md: 'sm' }}>
                        {' (Visualizes appearance of the mesh)'}
                    </Box>
                    <Box>
                        <ColorPicker activeColor={meshColor} colors={colors} setMeshColor={setMeshColor} />
                    </Box>
                </Text>
            </Flex>
        </Box>
    );
};
