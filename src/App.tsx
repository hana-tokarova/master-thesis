import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { CollectionType } from "./Collections";
import { Configurator } from "./Configurator";

export const App = () => {
    const [collection, setCollection] = React.useState<CollectionType>(CollectionType.Lissajous);

    return (
        <ChakraProvider theme={theme}>
            <Configurator collection={collection} />
            <Button margin={2} onClick={() => setCollection(CollectionType.Lissajous)}>
                {CollectionType.Lissajous}
            </Button>
            <Button onClick={() => setCollection(CollectionType.Torsion)}>
                {CollectionType.Torsion}
            </Button>
        </ChakraProvider>
    );
};
