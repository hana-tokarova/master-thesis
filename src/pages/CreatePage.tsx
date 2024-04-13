import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { CollectionType, JewelryType } from "../components/Collections";

type Project = {
    id: number;
    image: string;
    material: "PLA Filament" | "Resin" | "Metal";
    price: number;
    collection?: CollectionType;
    jewelry?: JewelryType;
}

const projects: Project[] = [
    {
        id: 1,
        material: "PLA Filament",
        price: 10.00,
        image: "https://source.unsplash.com/random/100x100",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Earring,
    },
    {
        id: 2,
        material: "Resin",
        price: 15.00,
        image: "https://source.unsplash.com/random/100x50",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
    },
    {
        id: 3,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x150",
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Pendant,
    },
    {
        id: 4,
        material: "PLA Filament",
        price: 10.00,
        image: "https://source.unsplash.com/random/100x200",
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Earring,
    },
    {
        id: 5,
        material: "Resin",
        price: 15.00,
        image: "https://source.unsplash.com/random/100x250",
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Ring,
    },
    {
        id: 6,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x300",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Pendant,
    },
    {
        id: 7,
        material: "PLA Filament",
        price: 10.00,
        image: "https://source.unsplash.com/random/100x350",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
    },
    {
        id: 8,
        material: "Resin",
        price: 15.00,
        image: "https://source.unsplash.com/random/100x400",
        collection: CollectionType.Torsion,
        jewelry: JewelryType.Bracelet,
    },
    {
        id: 9,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x450",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
    },
    {
        id: 10,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x420",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
    },
    {
        id: 11,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x250",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Ring,
    },
    {
        id: 12,
        material: "Metal",
        price: 20.00,
        image: "https://source.unsplash.com/random/100x320",
        collection: CollectionType.Lissajous,
        jewelry: JewelryType.Bracelet,
    }
]

export const CreatePage = () => {
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
                / Create
            </Text>

            <Text
                maxW="70vw"
                fontSize={{ base: "xs", md: "sm", lg: "md" }}
            >
                Want to create something for yourself or your loved ones? This it the right place!
                <br />
                Based on your preferences, fill in the details of what kind of jewelry you want to create.
            </Text>

            <Tabs defaultIndex={0} variant='unstyled' isFitted>
                <TabList
                    maxW={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                >
                    {Object.values(JewelryType).map((jewelryValue) => (
                        <Tab
                            key={jewelryValue}
                            fontFamily={"heading"}
                            fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                            fontWeight="300"
                            sx={{
                                borderBottom: '1px solid #ccc',
                                _selected: {
                                    borderBottom: '3px solid black',
                                    fontWeight: '500'
                                }
                            }}
                        >
                            {jewelryValue.charAt(0).toUpperCase() + jewelryValue.slice(1) + "s"}
                        </Tab>
                    ))}
                </TabList>

                <Text
                    paddingTop={3}
                    maxW="xl"
                    fontSize={{ base: "xs", md: "sm", lg: "md" }}
                >
                    Each collection showcases different ways how given jewelry type could look like. If you like any of the types below, click on it and you will be able to customize it futher.
                </Text>

                <TabPanels>
                    {Object.values(JewelryType).map((jewelryType) => (
                        <TabPanel key={jewelryType} paddingLeft={0} paddingRight={0}>
                            {Object.values(CollectionType).map((collectionType) => (
                                <Box key={jewelryType + collectionType}>
                                    <Text
                                        paddingTop={1}
                                        fontFamily={"heading"}
                                        fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                                        fontWeight="500"
                                    >
                                        Collection {collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}
                                    </Text>
                                    <Text
                                        color="brand.100"
                                        fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "md" }}
                                        paddingBottom={1}
                                    >
                                        {(collectionType === CollectionType.Lissajous) ? "/ Based on the Lissajous curves" : "/ Based on the twists of the torus geometry"}
                                    </Text>

                                    <Flex
                                        paddingTop="2"
                                        paddingBottom="4"
                                        direction="row"
                                        rowGap={{ base: 4, sm: 6, md: 8, lg: 10 }}
                                        columnGap={4}
                                        wrap='wrap'
                                    >
                                        {projects
                                            .filter(project => project.jewelry === jewelryType)
                                            .filter(project => project.collection === collectionType)
                                            .map((selectedProject) => (
                                                <Box
                                                    key={selectedProject.id}
                                                    h={{ base: "44", sm: "48", md: "52", lg: "72" }}
                                                >
                                                    <Image
                                                        w={{ base: "32", sm: "36", md: "40", lg: "60" }}
                                                        objectFit='cover'
                                                        h={{ base: "32", sm: "36", md: "40", lg: "60" }}
                                                        src={selectedProject.image}
                                                        alt={"Project" + selectedProject.id}
                                                        shadow={'xl'}
                                                        borderRadius="sm"
                                                    />

                                                    <Text
                                                        paddingTop={2}
                                                        fontFamily={"heading"}
                                                        fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
                                                        fontWeight="500"
                                                    >
                                                        {selectedProject.material}
                                                    </Text>
                                                    <Text
                                                        fontFamily={"heading"}
                                                        fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}
                                                        fontWeight="300"
                                                    >
                                                        {selectedProject.price.toFixed(2)} €
                                                    </Text>
                                                </Box>
                                            ))}
                                    </Flex>
                                </Box>
                            ))}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </VStack>
    );
}