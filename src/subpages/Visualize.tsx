import { Box, Select, Text } from '@chakra-ui/react';
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
            >
                / Visualize
            </Text>

            <Text
                paddingTop="2"
                paddingBottom="1"
                fontFamily={'heading'}
                fontWeight="400"
                fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                w={{ base: '28', sm: '30', md: '32', lg: '34' }}
            >
                Materials
            </Text>

            <Select
                w={44}
                fontFamily={'body'}
                fontWeight="400"
                fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                bg="brand.200"
                border="none"
                value={currentMaterial.name}
                color="brand.50"
                size="md"
                cursor="pointer"
                shadow={'lg'}
                paddingTop={2}
                paddingBottom={4}
                _hover={{ bg: 'brand.400' }}
                _focus={{ bg: 'brand.300' }}
                onChange={(event) => {
                    const newValue = event.target.value;
                    changeCurrentMaterial(setCurrentMaterial, materials[newValue]);
                    changeNumericParameter(setSliderMinParameters, 'r', materials[newValue].thicknessMinimum);
                }}
            >
                {Object.entries(materials).map(([key, val]) => (
                    <option key={key} value={val.name}>
                        {val.name}
                    </option>
                ))}
            </Select>

            <Text
                paddingTop="2"
                paddingBottom="1"
                fontFamily={'heading'}
                fontWeight="400"
                fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                w={{ base: '28', sm: '30', md: '32', lg: '34' }}
            >
                Colors
            </Text>

            <ColorPicker activeColor={meshColor} colors={colors} setMeshColor={setMeshColor} />
        </Box>
    );
};
