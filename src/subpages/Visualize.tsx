import { Box, HStack, Select, Switch, Text } from '@chakra-ui/react';
import { ColorPair, ColorPicker } from '../components/layout/ColorPicker';

type VisualizeProps = {
    colors: ColorPair[];
    meshColor: string;
    setMeshColor: (color: string) => void;
}

export const Visualize = ({ colors, meshColor, setMeshColor }: VisualizeProps) => {
    return (
        <Box>
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                paddingTop="1"
            >
                / Visualize
            </Text>

            <Text
                paddingTop="2"
                paddingBottom="1"
                fontFamily={"heading"}
                fontWeight="400"
                fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                w={{ base: "28", sm: "30", md: "32", lg: "34" }}
            >
                Materials
            </Text>

            <HStack
                spacing={5}
            >
                <Select
                    w={44}
                    fontFamily={"body"}
                    fontWeight="500"
                    fontSize={{ base: "3xs", sm: "2xs", md: "xs", lg: "sm" }}
                    bg='brand.200'
                    border="none"
                    color='brand.50'
                    size='md'
                    shadow={'lg'}
                    paddingTop={2}
                    paddingBottom={4}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                >
                    <option value='pla' >PLA Filament</option>
                    <option value='metal' >Metal</option>
                    <option value='resin'>Resin</option>
                </Select>

                <ColorPicker
                    activeColor={meshColor}
                    colors={colors}
                    setMeshColor={setMeshColor}
                />

            </HStack>

            <Text
                fontFamily={"heading"}
                fontWeight="400"
                fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                w={{ base: "28", sm: "30", md: "32", lg: "34" }}
            >
                Mockup Viewer
            </Text>

            <Switch
                paddingTop={2}
                size='lg'
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
                        }
                    }
                }}
            />
        </Box>

    );
}