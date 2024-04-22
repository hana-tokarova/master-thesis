import { Box, Center, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <Center>
            <VStack
                spacing={2}
                paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
                paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
                paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }}
                paddingBottom={16}
                alignItems={'left'}
            >
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w="40vw">
                        <Text
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                        >
                            / 404 - Page Not Found
                        </Text>

                        <Text maxW="lg" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                            Oooops! This page that you are trying to reach does not exist. Are you sure that you wanted
                            to go here?
                        </Text>

                        <Text fontFamily={'body'} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} color={'brand.50'}>
                            Go to the
                            <Link to="/">
                                <Text
                                    as="span"
                                    size={{ base: 'xs', md: 'sm', lg: 'md' }}
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
                        w="40vw"
                        paddingTop={32}
                        right={400}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals3.png`}
                        alt="Visuals1"
                        position="fixed"
                    />
                </Stack>
            </VStack>
        </Center>
    );
};
