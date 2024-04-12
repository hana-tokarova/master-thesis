import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { JewelryType } from "../components/Collections";

export const CreatePage = () => {
    return (
        <VStack
            spacing={2}
            paddingLeft={28}
            paddingRight={28}
            paddingTop={16}
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
                <TabList>
                    {Object.values(JewelryType).map((jewelryValue) => (
                        <Tab
                            key={jewelryValue}
                            fontFamily={"heading"}
                            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
                            sx={{
                                borderBottom: '2px solid #ccc',
                                _selected: {
                                    borderBottom: '3px solid black',
                                }
                            }}
                            _selected={{ fontWeight: '600' }}
                        >
                            {jewelryValue.charAt(0).toUpperCase() + jewelryValue.slice(1) + "s"}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>four!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
}