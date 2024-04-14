import { Box, Text } from "@chakra-ui/react";
import { CollectionType, JewelryMesh, JewelryType } from "../components/collections/Collections";

type InfoProps = {
    collection: CollectionType,
    jewelry: JewelryType,
    mesh: JewelryMesh,
}

export const Info = ({ collection, jewelry, mesh }: InfoProps) => {
    return (
        <Box>
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            >
                / {collection.charAt(0).toUpperCase() + collection.slice(1)} {jewelry.charAt(0).toUpperCase() + jewelry.slice(1)}
            </Text>

            <Text
                maxW="3xl"
                fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
            >
                {mesh.description}
            </Text>
        </Box>

    );

}