import { Button, ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { Root } from "./Root";

export const App = () => {
    const [collection, setCollection] = React.useState<string>("lissajous");

    return (
        <ChakraProvider theme={theme}>
            <Root template={collection} />
            {/* Premenovat root inak a premenovat template na collection, potom este tam dat aky je to typ sperku */}
            <Button onClick={() => setCollection("lissajous")}>Change to Lissajous</Button>
            <Button onClick={() => setCollection("twistedTorus")}>Change to Twisty twist bith</Button>
        </ChakraProvider>
    );
};
