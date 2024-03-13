import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { CollectionType, JewelryType } from "./Collections";
import { Configurator } from "./Configurator";

export const App = () => {
    const [collection, setCollection] = React.useState<CollectionType>(CollectionType.Lissajous);
    const [jewelry, setJewelry] = React.useState<JewelryType>(JewelryType.Ring);

    const handleCollectionChange = (newCollection: CollectionType) => {
        setCollection(newCollection);
        setJewelry(JewelryType.Ring);
    };

    return (
        <ChakraProvider theme={theme}>
            <Configurator collection={collection} jewelry={jewelry} />
            <Button margin={2} onClick={() => handleCollectionChange(CollectionType.Lissajous)}>
                {CollectionType.Lissajous}
            </Button>
            <Button onClick={() => handleCollectionChange(CollectionType.Torsion)}>
                {CollectionType.Torsion}
            </Button>
        </ChakraProvider>
    );
};
