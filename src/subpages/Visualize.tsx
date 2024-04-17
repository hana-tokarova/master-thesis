import { Box, HStack, Select, Switch, Text } from '@chakra-ui/react';
import { materials } from '../components/collections/Collections';
import { ColorPair, ColorPicker } from '../components/layout/ColorPicker';
import { changeCurrentMaterial, changeNumericParameter } from '../components/utils/mesh/ChangeMesh';

type VisualizeProps = {
    setSliderMinParameters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    currentMaterial: {
        name: string;
        thicknessMinimum: number;
        additionalCost: number;
        roughness: number;
        metalness: number;
    };
    setCurrentMaterial: React.Dispatch<
        React.SetStateAction<{
            name: string;
            thicknessMinimum: number;
            additionalCost: number;
            roughness: number;
            metalness: number;
        }>
    >;
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
                fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                w={{ base: '28', sm: '30', md: '32', lg: '34' }}
            >
                Materials
            </Text>

            <HStack spacing={5}>
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
                    shadow={'lg'}
                    paddingTop={2}
                    paddingBottom={4}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                    onChange={(event) => {
                        const newValue = event.target.value;
                        changeCurrentMaterial(setCurrentMaterial, materials[newValue as keyof typeof materials]);
                        changeNumericParameter(
                            setSliderMinParameters,
                            'r',
                            materials[newValue as keyof typeof materials].thicknessMinimum,
                        );
                    }}
                >
                    {Object.entries(materials).map(([key, val]) => (
                        <option key={key} value={val.name}>
                            {val.name}
                        </option>
                    ))}
                </Select>

                <ColorPicker activeColor={meshColor} colors={colors} setMeshColor={setMeshColor} />
            </HStack>

            <Text
                fontFamily={'heading'}
                fontWeight="400"
                fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                w={{ base: '28', sm: '30', md: '32', lg: '34' }}
            >
                Mockup Viewer
            </Text>

            <Switch
                paddingTop={2}
                size="lg"
                style={{ margin: 0 }}
                sx={{
                    '.chakra-switch__thumb': {
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                    },
                    '.chakra-switch__track': {
                        bg: 'brand.400',
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        _checked: {
                            bg: 'brand.100',
                        },
                    },
                }}
            />
        </Box>
    );
};
