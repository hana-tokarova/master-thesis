import { Box, HStack } from "@chakra-ui/react";
import { changeMeshColor } from "../utils/mesh/ChangeMesh";

type ColorPair = [string, string];

type ColorPickerProps = {
    colors: ColorPair[];
    setMeshColor: (color: string) => void
};

export const ColorPicker = ({ colors, setMeshColor }: ColorPickerProps) => (
    <HStack marginBottom={2}>
        {colors.map(([buttonColor, gradientColor], index) =>
            <Box
                w="8"
                h="8"
                key={index}
                bg={`linear-gradient(to bottom, ${buttonColor}, ${gradientColor})`}
                onClick={() => changeMeshColor(setMeshColor, buttonColor)}
                borderRadius="full"
                shadow="md"
                cursor="pointer"
            />
        )}
    </HStack>
);