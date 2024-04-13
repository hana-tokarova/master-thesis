import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { CollectionType, JewelryType } from "../components/Collections";

type Project = {
    id: number;
    image: string;
    collection?: CollectionType
    jewelry?: JewelryType
}

const projects: Project[] = [
    {
        id: 1,
        image: "https://source.unsplash.com/random/100x100",
    },
    {
        id: 2,
        image: "https://source.unsplash.com/random/100x50",
    },
    {
        id: 3,
        image: "https://source.unsplash.com/random/100x35",
    },
    {
        id: 4,
        image: "https://source.unsplash.com/random/100x70",
    },
    {
        id: 5,
        image: "https://source.unsplash.com/random/100x90",
    },
    {
        id: 6,
        image: "https://source.unsplash.com/random/100x120",
    },
    {
        id: 7,
        image: "https://source.unsplash.com/random/100x150",
    },
    {
        id: 8,
        image: "https://source.unsplash.com/random/100x80",
    },
    {
        id: 9,
        image: "https://source.unsplash.com/random/100x125",
    },
    {
        id: 10,
        image: "https://source.unsplash.com/random/100x95",
    },
    {
        id: 11,
        image: "https://source.unsplash.com/random/100x135",
    },
    {
        id: 12,
        image: "https://source.unsplash.com/random/100x155",
    },
    {
        id: 13,
        image: "https://source.unsplash.com/random/100x85",
    },
    {
        id: 14,
        image: "https://source.unsplash.com/random/100x45",
    },
]

export const LookbookPage = () => {
    return (
        <VStack
            spacing={2}
            paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingTop={{ base: 8, sm: 10, md: 12, lg: 16 }}
            paddingBottom={16}
            alignItems={"left"}
            w="100vw"
        >
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            >
                / Showcase
            </Text>

            <Text
                maxW="70vw"
                fontSize={{ base: "xs", md: "sm", lg: "md" }}
            >
                Here you can find showcase of renders and lookbooks from the different collections.
                If you fancy some of the designs below, you can click on the specified jewelry and then you will be send to the Neotaku configurator.
            </Text>

            <Box
                marginTop="5"
                marginBottom="10"
                sx={{
                    columnCount: { base: 1, md: 3, lg: 3 },
                }}
                flexGrow={1}
            >
                {projects.map((image) => (
                    <Image
                        key={image.id}
                        w="100%"
                        display="inline-block"
                        mb={2}
                        src={image.image}
                        alt={image.id.toString()}
                    />
                ))}
            </Box>
        </VStack>

    );
}