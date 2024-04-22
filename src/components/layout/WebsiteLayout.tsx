import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { MainMenu } from './MainMenu';

export const WebsiteLayout = () => {
    return (
        <Flex direction="column" w="100vw" h="100vh">
            <MainMenu />

            <Box pt="80px">
                <div id="detail">
                    <Outlet />
                </div>
            </Box>

            <Center>
                <Image
                    src={`${process.env.PUBLIC_URL}/images/bg/lowpoly.svg`}
                    alt="lowpoly-image"
                    w="80vw"
                    objectFit={'cover'}
                    bottom={0}
                    zIndex={-1}
                    position="fixed"
                />
            </Center>

            <Footer />
        </Flex>
    );
};
