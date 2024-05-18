import { Box, Center, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { Contacts } from '../subpages/Contacts';

/**
 * Renders the About page component.
 * @returns The rendered About page component.
 */
export const AboutPage = () => {
    return (
        <Center>
            <Box paddingTop={9} paddingBottom={28}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }}>
                    <Box w={{ base: '80vw', md: '40vw' }} minW={'40vw'}>
                        <Text textStyle={'header1'}>/ About</Text>

                        <Text textStyle={'body'} maxW="xl" paddingTop={2}>
                            {
                                'Nowadays, customization is\u00A0becoming more popular in\u00A0the\u00A0e-commerce. Neotaku\u00A0configurator is\u00A0a\u00A0tool for everyone that likes and enjoys jewelry, and wants something more than ordinary jewelry.'
                            }
                        </Text>
                        <Text paddingTop={5} textStyle={'body'}>
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
                        <Text paddingTop={5} textStyle={'body'} maxW="xl">
                            {
                                'All models from the Neotaku\u00A0configurator were created by\u00A0generative and\u00A0algorithmic ideas that can help create non-ordinary pieces of\u00A0jewelry and\u00A0that\u00A0can\u00A0be\u00A0later manipulated by\u00A0users.'
                            }
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
