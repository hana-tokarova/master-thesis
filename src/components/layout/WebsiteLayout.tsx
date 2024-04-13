import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { MainMenu } from "./MainMenu";

export const WebsiteLayout = () => {
    return (
        <Flex
            direction="column"
            w="100vw"
            h="100vh"
        >
            <MainMenu />

            <Box pt="80px" >
                <div id="detail">
                    <Outlet />
                </div>
            </Box>

            <Footer />
        </Flex>
    );
}
