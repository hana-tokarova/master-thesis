import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { CollectionType, JewelryType } from "../components/Collections";

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
                            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
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

                <TabPanels >
                    {Object.values(JewelryType).map((jewelryType) => (
                        <TabPanel key={jewelryType} paddingLeft={0} paddingRight={0}>
                            {Object.values(CollectionType).map((collectionType) => (
                                <Box key={jewelryType + collectionType}>
                                    <Text
                                        paddingTop={2}
                                        fontFamily={"heading"}
                                        fontWeight="500"
                                        fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                                    >
                                        Collection {collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}
                                    </Text>
                                    <Text color="brand.100">
                                        {(collectionType === CollectionType.Lissajous) ? "/ Based on the Lissajous curves" : "/ Based on the twists of the torus geometry"}
                                    </Text>
                                </Box>
                            ))}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </VStack>
    );
}