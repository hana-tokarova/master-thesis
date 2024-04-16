import { HStack, Image, Spacer } from "@chakra-ui/react";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainMenuButton } from "./MainMenuButton";

export const MainMenu = () => {
    const { scrollY } = useScroll();
    const [menuHeight, setMenuHeight] = useState('80px');
    const [menuShadow, setMenuShadow] = useState('0px 0px 20px rgba(0, 0, 0, 0)');

    useEffect(() => {
        const updateStyles = () => {
            const yValue = scrollY.get();
            const newOpacity = Math.min(0.3, (yValue / 100) * 0.3);
            const newHeight = `${80 - Math.min(30, (yValue / 100) * 30)}px`;

            setMenuShadow(`0px 0px 20px rgba(0, 0, 0, ${newOpacity})`);
            setMenuHeight(newHeight);
        };

        const unsubscribe = scrollY.onChange(updateStyles);
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <HStack
            as={motion.div}
            style={{
                height: menuHeight,
                boxShadow: menuShadow
            }}
            position="fixed"
            w="100vw"
            paddingLeft={{ base: 5, md: 6, lg: 7 }}
            paddingRight={{ base: 5, md: 6, lg: 7 }}
            bg="white"
            spacing={{ base: 4, md: 9, lg: 14 }}
            fontFamily="heading"
            zIndex={10}
        >
            <Link to="/">
                <Image
                    h={{ base: "7", md: "8", lg: "9" }}
                    src={`${process.env.PUBLIC_URL}/images/logo/logo-full.png`}
                    alt="NEOTAKU JEWELRY"
                />
            </Link>

            <Spacer />

            <MainMenuButton pageName="/" text="Home" />
            <MainMenuButton pageName="/create" text="Create" />
            <MainMenuButton pageName="/about" text="About" />
            <MainMenuButton pageName="/showcase" text="Showcase" />
        </HStack>
    );
};

