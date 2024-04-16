import { ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { Contacts } from '../subpages/Contacts';

export const AboutPage = () => {
    return (
        <VStack
            spacing={2}
            paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
            paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }}
            paddingBottom={16}
            alignItems={'left'}
            w="100vw"
        >
            <Text fontFamily={'heading'} fontWeight="500" fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}>
                / About
            </Text>

            <Text maxW="3xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                Nowadays, customization is becoming more popular in e-commerce. It is widely used among the car and
                furniture industries, so why not try it in other ways?
                <br />
                Neotaku Jewelry is a tool for everyone that likes and enjoys jewelry, and wants something more than
                ordinary jewelry.
                <br />
                <br />
                Customers are able to:
            </Text>
            <UnorderedList spacing={1}>
                <ListItem ml={4} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    choose preferred material type (printing filaments, metals) for the jewelry
                </ListItem>
                <ListItem ml={4} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    customize given jewelry collection to their liking
                </ListItem>
                <ListItem ml={4} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    export the final jewelry model
                </ListItem>
                <ListItem ml={4} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    see the estimated price of the given jewelry
                </ListItem>
            </UnorderedList>
            <Text maxW="3xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                All models from the Neotaku Jewelry were created by generative and algorithmic ideas that can help
                create non-ordinary pieces of jewelry and that can be later manipulated by customers.
            </Text>

            <Contacts />
        </VStack>
    );
};
