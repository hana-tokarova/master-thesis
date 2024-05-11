import { Box, Center, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <Center>
            <Box paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }} paddingBottom={28}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w={{ base: '80vw', md: '40vw' }} minW={'40vw'}>
                        <Text textStyle={'header1'} color={'brand.50'}>
                            / 404 - Page Not Found
                        </Text>

                        <Text textStyle={'body'} color={'brand.50'}>
                            Oooops! This page that you are trying to reach does not exist. Are you sure that you wanted
                            to go here? Go to the
                            <Link to="/">
                                <Text as="span" textStyle={'bodyHighlight'} variant="link" color={'brand.50'}>
                                    {' '}
                                    homepage.
                                </Text>
                            </Link>
                        </Text>
                    </Box>
                    <Image
                        w={{ base: '100%', lg: '50%' }}
                        h={{ base: '30%', lg: '40%' }}
                        marginTop={{ base: 0, md: 16 }}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals3.png`}
                        alt="Visuals1"
                        objectFit="contain"
                    />
                </Stack>
            </Box>
        </Center>
    );
};
