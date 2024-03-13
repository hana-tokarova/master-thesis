import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { Configurator } from "./Configurator";

export const App = () => {
    const [collection, setCollection] = React.useState<string>("lissajous");

    return (
        <ChakraProvider theme={theme}>
            <Configurator collection={collection} />
            <Button margin={2} onClick={() => setCollection("lissajous")}>Lissajous</Button>
            <Button onClick={() => setCollection("twistedTorus")}>Torsion</Button>
        </ChakraProvider>
    );
};
