import { Box, HStack, Tooltip } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { changeMeshColor } from '../utils/mesh/ChangeMesh';

export type ColorPair = [string, string];

type ColorPickerProps = {
    activeColor: string;
    colors: ColorPair[];
    setMeshColor: (color: string) => void;
};

export const ColorPicker = ({ activeColor, colors, setMeshColor }: ColorPickerProps) => {
    return (
        <HStack marginBottom={2} w={60} paddingTop={3} paddingBottom={3}>
            {colors.map(([buttonColor, gradientColor], index) => (
                <Tooltip
                    bg="brand.100"
                    color="white"
                    placement="bottom"
                    label={buttonColor.charAt(0).toUpperCase() + buttonColor.slice(1)}
                    key={buttonColor + gradientColor}
                >
                    <Box
                        w="8"
                        h="8"
                        bg={`linear-gradient(to bottom, ${buttonColor}, ${gradientColor})`}
                        onClick={() => {
                            changeMeshColor(setMeshColor, buttonColor);
                        }}
                        borderRadius="full"
                        shadow="md"
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            transition: 'background 0.3s ease-in-out',
                            ':hover': {
                                background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5)), linear-gradient(to bottom, ${buttonColor}, ${gradientColor})`,
                            },
                        }}
                    >
                        {activeColor === buttonColor && <FaCheck color="white" />}
                    </Box>
                </Tooltip>
            ))}
        </HStack>
    );
};
