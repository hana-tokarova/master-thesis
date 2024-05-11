import { Box, Center, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { Contacts } from '../subpages/Contacts';

export const AboutPage = () => {
    return (
        <Center>
            <Box paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }} paddingBottom={28}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w={{ base: '80vw', md: '40vw' }} minW={'40vw'}>
                        <Text textStyle={'header1'} color={'brand.50'}>
                            / About
                        </Text>

                        <Text textStyle={'body'} color={'brand.50'}>
                            Nowadays, customization is becoming more popular in the e-commerce. It is widely used among
                            the car and furniture industries, so why not try it in other ways? Neotaku Jewelry is a tool
                            for everyone that likes and enjoys jewelry, and wants something more than ordinary jewelry.
                        </Text>
                        <Text paddingTop={5} color={'brand.50'} textStyle={'body'}>
                            Users are able to:
                        </Text>
                        <UnorderedList textStyle={'body'} spacing={1}>
                            <ListItem ml={4} color={'brand.50'}>
                                customize given jewelry collection based on the given collection
                            </ListItem>
                            <ListItem ml={4} color={'brand.50'}>
                                export the final jewelry model
                            </ListItem>
                            <ListItem ml={4} color={'brand.50'}>
                                see the estimated price of the given jewelry
                            </ListItem>
                            <ListItem ml={4} color={'brand.50'}>
                                visualize different material types on the jewelry model
                            </ListItem>
                        </UnorderedList>
                        <Text paddingTop={5} color={'brand.50'} textStyle={'body'}>
                            All models from the Neotaku Jewelry were created by generative and algorithmic ideas that
                            can help create non-ordinary pieces of jewelry and that can be later manipulated by users.
                        </Text>
                        <Contacts />
                    </Box>
                    <Image
                        w={{ base: '100%', lg: '50%' }}
                        h={{ base: '30%', lg: '40%' }}
                        marginTop={{ base: 0, md: 16 }}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals2.png`}
                        alt="Visuals2"
                        objectFit="contain"
                    />
                </Stack>
            </Box>
        </Center>
    );
};
