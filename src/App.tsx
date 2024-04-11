/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HStack, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { CollectionType, JewelryType } from "./components/Collections";
import { MenuButton } from "./components/MenuButton";

export const App = () => {
    const [collection, setCollection] = React.useState<CollectionType>(
        CollectionType.Lissajous
    );
    const [jewelry, setJewelry] = React.useState<JewelryType>(JewelryType.Ring);

    const handleCollectionChange = (
        newCollection: CollectionType,
        newJewelry: JewelryType
    ) => {
        setCollection(newCollection);
        setJewelry(newJewelry);
    };

    {
        /* <Configurator collection={collection} jewelry={jewelry} />
    
                <Grid width={"600px"} templateRows='repeat(3, 1fr)' templateColumns='repeat(4, 1fr)' gap={4} margin={3}>
                    {Object.values(CollectionType).map((collectionValue) => (
                        Object.values(JewelryType).map((jewelryValue) => (
                            <Button key={collectionValue + jewelryValue} onClick={() => handleCollectionChange(collectionValue, jewelryValue)} >
                                {collectionValue} {jewelryValue}
                            </Button>
                        )
                        )))}
                </Grid> */
    }

    return (
        <>
            <HStack p={7} h="20" spacing="16" fontFamily={"heading"} boxShadow="md">
                <Image h="14" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />

                <Spacer />

                <MenuButton pageName="/master-thesis" text={"Home"} />

                <MenuButton pageName="/master-thesis/create" text={"Create"} />

                <MenuButton pageName="/master-thesis/about" text={"About"} />

                <MenuButton pageName="/master-thesis/showcase" text={"Showcase"} />
            </HStack>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};
