import { Box, Center, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <Center>
            <Box paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w={{ base: '80vw', md: '40vw' }} minW={'40vw'}>
                        <Text
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                            color={'brand.50'}
                        >
                            / 404 - Page Not Found
                        </Text>

                        <Text fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }} color={'brand.50'}>
                            Oooops! This page that you are trying to reach does not exist. Are you sure that you wanted
                            to go here? Go to the
                            <Link to="/">
                                <Text
                                    as="span"
                                    size={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                                    fontFamily={'heading'}
                                    fontWeight={600}
                                    variant="link"
                                    color={'brand.50'}
                                >
                                    {' '}
                                    homepage.
                                </Text>
                            </Link>
                        </Text>
                    </Box>
                    <Image
                        w={{ base: '80vw', lg: '50vw' }}
                        h={{ base: '30vh', lg: '40vh' }}
                        marginTop={{ base: 20, md: 32 }}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals3.png`}
                        alt="Visuals1"
                        objectFit="contain"
                    />
                </Stack>
            </Box>
        </Center>
    );
};
