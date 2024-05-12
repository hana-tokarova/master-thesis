import { Box, HStack, Tooltip } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { changeMeshColor } from '../components/utils/mesh/ChangeMesh';

/**
 * Represents a color pair consisting of two strings.
 */
export type ColorPair = [string, string];

/**
 * Props for the ColorPicker component.
 */
type ColorPickerProps = {
    activeColor: string;
    colors: ColorPair[];

    /**
     * A function to set the mesh color.
     * @param color - The color to set.
     */
    setMeshColor: (color: string) => void;
};

/**
 * Renders a color picker component.
 *
 * @param activeColor - The currently active color.
 * @param colors - An array of color pairs, each containing a button color and a gradient color.
 * @param setMeshColor - A function to set the mesh color.
 * @returns The color picker component.
 */
export const ColorPicker = ({ activeColor, colors, setMeshColor }: ColorPickerProps) => {
    return (
        <HStack marginBottom={2} paddingTop={3} paddingBottom={3} wrap="wrap">
            {colors.map(([buttonColor, gradientColor], _) => (
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
