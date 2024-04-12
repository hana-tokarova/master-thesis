import { Box, HStack, Image, Spacer } from "@chakra-ui/react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Outlet } from "react-router-dom";
import { MenuButton } from "../components/MenuButton";

export const App = () => {
    const { scrollY } = useViewportScroll();
    const menuHeight = useTransform(scrollY, [0, 100], ['90px', '60px']);
    const shadow = useTransform(scrollY, [0, 100], ['md', 'none']); //preco nefunguje shadow?

    return (
        <>
            <HStack
                as={motion.div}
                style={{ height: menuHeight as unknown as string, boxShadow: shadow as unknown as string }}
                position="fixed"
                paddingTop={0}
                w="100vw"
                paddingLeft={7}
                paddingRight={7}
                bg="white"
                spacing="16"
                fontFamily="heading"
            >
                <Image h="10" src="/images/logo/logo-full-lines.png" alt="NEOTAKU JEWELRY" />
                <Spacer />
                <MenuButton pageName="/" text="Home" />
                <MenuButton pageName="/create" text="Create" />
                <MenuButton pageName="/about" text="About" />
                <MenuButton pageName="/showcase" text="Showcase" />
            </HStack>

            <Box pt="90px" transition="padding-top 0.3s ease-in-out">
                <div id="detail">
                    <Outlet />
                </div>
            </Box>
        </>
    );
};
