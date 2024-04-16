import { Button, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Contacts } from '../subpages/Contacts';

export const HomePage = () => {
    return (
        <>
            <Image
                src={`${process.env.PUBLIC_URL}/images/bg/jewelry-homepage.png`}
                alt="jewelry-homepage-image"
                w="100vw"
                h={{ base: 36, sm: 36, md: 56, lg: 72 }}
                objectFit="cover"
                objectPosition={'center center'}
                shadow={'md'}
            />

            <VStack
                spacing={2}
                paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
                paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
                paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }}
                paddingBottom={16}
                alignItems={'left'}
                w="100vw"
            >
                <Text
                    fontFamily={'heading'}
                    fontWeight="500"
                    fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                >
                    / Welcome
                </Text>

                <Text maxW="lg" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    Hi and welcome to the world of interactive jewelry making! Want to create unique jewelry pieces just
                    by quick changes of parameters? Then you are in the right place!
                </Text>

                <Text
                    fontFamily={'heading'}
                    fontWeight="500"
                    fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                    paddingTop={2}
                >
                    / Choose - Customize - Export
                </Text>

                <Text maxW="lg" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    The process is simple - just choose jewelry type, customize it to your liking and finally, export it
                    to your preferred format to print it/cast it!
                </Text>

                <Button
                    size="sm"
                    as={Link}
                    to={'/create'}
                    fontFamily={'heading'}
                    fontWeight="450"
                    bg="brand.100"
                    color="brand.200"
                    w={36}
                    shadow={'lg'}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                >
                    Create your jewelry
                </Button>

                <Text
                    fontFamily={'heading'}
                    fontWeight="500"
                    fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                    paddingTop={3}
                >
                    / Multiple collections - Multiple possibilities
                </Text>

                <Text maxW="lg" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                    By selecting a specific collection, you learn its ways and how you can customize it. Each collection
                    has unique set of parameters that can be customized and changed.
                </Text>

                <Button
                    size="sm"
                    as={Link}
                    to={'/showcase'}
                    fontFamily={'heading'}
                    fontWeight="450"
                    bg="brand.100"
                    color="brand.200"
                    w={36}
                    shadow={'lg'}
                    _hover={{ bg: 'brand.400' }}
                    _focus={{ bg: 'brand.300' }}
                >
                    Browse collections
                </Button>

                <Contacts />
            </VStack>
        </>
    );
};
