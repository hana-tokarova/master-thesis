import { Button, ChakraProvider, Grid, theme } from "@chakra-ui/react";
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

            <Grid width={"600px"} templateRows='repeat(3, 1fr)' templateColumns='repeat(4, 1fr)' gap={4} margin={3}>
                {Object.values(CollectionType).map((collectionValue) => (
                    Object.values(JewelryType).map((jewelryValue) => (
                        <Button key={collectionValue + jewelryValue} onClick={() => handleCollectionChange(collectionValue, jewelryValue)} >
                            {collectionValue} {jewelryValue}
                        </Button>
                    )
                    )))}
            </Grid>
        </ChakraProvider>
    );
};
