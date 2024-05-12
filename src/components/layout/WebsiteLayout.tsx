import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { MainMenu } from './MainMenu';

export const WebsiteLayout = () => {
    return (
        <Flex direction="column" w="100vw" minH="100vh" position="relative">
            <MainMenu />

            <Box pt="80px">
                <div id="detail">
                    <Outlet />
                </div>
            </Box>

            <Center position="absolute" bottom="0" w="full">
                <Image
                    src={`${process.env.PUBLIC_URL}/images/bg/lowpoly.svg`}
                    alt="lowpoly-image"
                    w="80vw"
                    h="auto"
                    objectFit="cover"
                    zIndex={-1}
                />
            </Center>

            <Footer />
        </Flex>
    );
};
