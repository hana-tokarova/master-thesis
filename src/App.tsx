import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { CollectionName } from "./Collections";
import { Configurator } from "./Configurator";

export const App = () => {
    const [collection, setCollection] = React.useState<CollectionName>(CollectionName.Lissajous);

    return (
        <ChakraProvider theme={theme}>
            <Configurator collection={collection} />
            <Button margin={2} onClick={() => setCollection(CollectionName.Lissajous)}>Lissajous</Button>
            <Button onClick={() => setCollection(CollectionName.TwistedTorus)}>Torsion</Button>
        </ChakraProvider>
    );
};
