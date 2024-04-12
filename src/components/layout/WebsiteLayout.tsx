import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MainMenu } from "./MainMenu";

export const WebsiteLayout = () => {
    return (
        <Flex
            direction="column"
            w="100vw"
            h="100vh"
        >
            <MainMenu />

            <Box pt="90px">
                <div id="detail">
                    <Outlet />
                </div>
            </Box>
        </Flex>
    );
}
