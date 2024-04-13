import { Button, HStack } from "@chakra-ui/react";
import { FaSquare } from "react-icons/fa";
import { changeMeshColor } from "../utils/mesh/ChangeMesh";

type ColorPickerProps = {
    colors: string[];
    setMeshColor: (color: string) => void
};

export const ColorPicker = ({ colors, setMeshColor }: ColorPickerProps) => (
    <HStack marginBottom={2}>
        {colors.map((buttonColor) =>
            <Button
                leftIcon={<FaSquare />}
                key={buttonColor}
                aria-label='Change color'
                color={buttonColor}
                onClick={() => changeMeshColor(setMeshColor, buttonColor)}
            />
        )}
    </HStack>
);