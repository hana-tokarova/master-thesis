import { Box, HStack, Tooltip } from "@chakra-ui/react";
import { FaPaintBrush } from "react-icons/fa";
import { changeMeshColor } from "../utils/mesh/ChangeMesh";

type ColorPair = [string, string];

type ColorPickerProps = {
    activeColor: string;
    colors: ColorPair[];
    setMeshColor: (color: string) => void;
};

export const ColorPicker = ({ activeColor, colors, setMeshColor }: ColorPickerProps) => {
    return (
        <HStack marginBottom={2}>
            {colors.map(([buttonColor, gradientColor], index) =>
                <Tooltip
                    bg='brand.50'
                    color='white'
                    placement='bottom'
                    label={buttonColor.charAt(0).toUpperCase() + buttonColor.slice(1)}
                >
                    <Box
                        w="8"  // Width of the Box
                        h="8"  // Height of the Box
                        key={index}
                        bg={`linear-gradient(to bottom, ${buttonColor}, ${gradientColor})`}
                        onClick={() => {
                            changeMeshColor(setMeshColor, buttonColor);
                        }}
                        borderRadius="full"
                        shadow="md"
                        cursor="pointer"
                        display="flex"  // Set the display to flex to use flexbox properties
                        alignItems="center"  // Vertically center the contents of the box
                        justifyContent="center"  // Horizontally center the contents of the box
                        border={activeColor === buttonColor ? `2px solid ${gradientColor}` : "none"}
                    >
                        {activeColor === buttonColor && <FaPaintBrush color="white" />}
                    </Box>
                </Tooltip>
            )}
        </HStack>
    );
};
