import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { Material, materials } from '../components/collections/Collections';
import { changeCurrentMaterial, changeNumericParameter } from '../components/utils/mesh/ChangeMesh';
import { ColorPair, ColorPicker } from './ColorPicker';

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
            <Text textStyle={'header2'} paddingTop="1">
                / Visualize
            </Text>

            <Flex paddingTop="2" direction="row" rowGap={4} columnGap={4} wrap="wrap">
                <Text as="span" paddingBottom="1" textStyle="bodyHighlight" w={{ base: 36, md: 44 }}>
                    Materials
                    <br />
                    <Box as="span" textStyle="body">
                        {' (Changes minimal wall thickness)'}
                    </Box>
                    <Box>
                        <Select
                            w={{ base: 36, md: 44 }}
                            textStyle="body"
                            fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                            bg="brand.200"
                            border="none"
                            value={currentMaterial.name}
                            color="brand.50"
                            cursor="pointer"
                            shadow={'lg'}
                            paddingTop={2}
                            _hover={{ bg: 'brand.400' }}
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

                <Text as="span" paddingBottom="1" textStyle="bodyHighlight" w={{ base: 36, md: 48 }}>
                    Colors
                    <br />
                    <Box as="span" textStyle="body">
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
