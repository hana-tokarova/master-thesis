import { Button, ChakraProvider, HStack, theme } from "@chakra-ui/react";
import React from "react";
import { CollectionType, JewelryType } from "./Collections";
import { Configurator } from "./Configurator";

export const App = () => {
    const [collection, setCollection] = React.useState<CollectionType>(CollectionType.Lissajous);
    const [jewelry, setJewelry] = React.useState<JewelryType>(JewelryType.Ring);

    const handleCollectionChange = (newCollection: CollectionType, newJewelry: JewelryType) => {
        setCollection(newCollection);
        setJewelry(newJewelry);
    };

    return (
        <ChakraProvider theme={theme}>
            <Configurator collection={collection} jewelry={jewelry} />

            <HStack margin={2}>
                {Object.values(CollectionType).map((collectionValue) => (
                    Object.values(JewelryType).map((jewelryValue) => (
                        <Button key={collectionValue + jewelryValue} onClick={() => handleCollectionChange(collectionValue, jewelryValue)}>
                            {collectionValue} {jewelryValue}
                        </Button>
                    )
                    )))}
            </HStack>
        </ChakraProvider>
    );
};
