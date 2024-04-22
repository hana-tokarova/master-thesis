import { Box, Button, Center, Flex, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Contacts } from '../subpages/Contacts';
import { projects } from './CreatePage';

export const HomePage = () => {
    return (
        <Center>
            <VStack paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }} paddingBottom={28}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w={{ base: '80vw', md: '40vw' }} minW={'40vw'}>
                        <Text
                            paddingTop={15}
                            fontFamily={'heading'}
                            fontWeight="300"
                            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                            color={'brand.50'}
                        >
                            Welcome to
                        </Text>

                        <Flex direction={{ base: 'column', md: 'row' }} align="flex-end" wrap={'wrap'} gap={5}>
                            <Image
                                w="500px"
                                src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`}
                                alt="NEOTAKU JEWELRY"
                                objectFit="contain"
                            />

                            <Text color="brand.100" fontSize={{ base: 'xs', md: 'lg', lg: 'xl' }}>
                                /niː.oʊ.ta.ku/
                            </Text>
                        </Flex>

                        <Text
                            maxW="lg"
                            fontFamily={'heading'}
                            fontWeight={300}
                            fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
                            color={'brand.50'}
                        >
                            Tool for customizable jewelry creation.
                        </Text>

                        <Text
                            fontFamily={'heading'}
                            fontWeight="300"
                            fontSize={{ base: '2xl', md: '4xl' }}
                            paddingTop={16}
                            color={'brand.50'}
                        >
                            / Choose
                            <Text as="span" fontWeight="400">
                                {' '}
                                / Customize
                                <Text as="span" fontWeight="500">
                                    {' '}
                                    / Export
                                </Text>
                            </Text>
                        </Text>

                        <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} color={'brand.50'}>
                            The process is simple - just choose jewelry, customize it and export it to your device in
                            preferred format to 3D print it/cast it!
                        </Text>

                        <Button
                            marginTop={2}
                            size="sm"
                            as={Link}
                            to={'/create'}
                            fontFamily={'heading'}
                            fontWeight="450"
                            bg="brand.50"
                            color="brand.200"
                            w="36"
                            shadow={'lg'}
                            _hover={{ bg: 'brand.300' }}
                            _focus={{ bg: 'brand.50' }}
                        >
                            Create your jewelry
                        </Button>

                        <Text
                            paddingTop={12}
                            fontFamily={'heading'}
                            fontWeight="400"
                            fontSize={{ base: '2xl', md: '4xl' }}
                            color={'brand.50'}
                        >
                            {' '}
                            / Multiple collections
                            <Text as="span" fontWeight="500">
                                {' '}
                                / Multiple possibilities
                            </Text>
                        </Text>

                        <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} color="brand.50">
                            Each collection has an unique set of parameters that can be customized and changed. You can
                            start from scratch or by choosing one of the presets.
                        </Text>

                        <Button
                            marginTop={2}
                            size="sm"
                            as={Link}
                            to={'/showcase'}
                            fontFamily={'heading'}
                            fontWeight="450"
                            bg="brand.50"
                            color="brand.200"
                            w="36"
                            shadow={'lg'}
                            _hover={{ bg: 'brand.300' }}
                            _focus={{ bg: 'brand.50' }}
                        >
                            Browse collections
                        </Button>
                        <Text
                            paddingTop={16}
                            fontFamily={'heading'}
                            fontWeight="500"
                            fontSize={{ base: 'xl', md: '2xl' }}
                            color={'brand.50'}
                        >
                            / Not sure yet?
                        </Text>
                        <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} color="brand.50">
                            Here are some of the examples that can be done in the configurator!
                        </Text>
                        <Flex
                            paddingTop="2"
                            paddingBottom="4"
                            direction="row"
                            rowGap={{ base: 4, sm: 6, md: 8, lg: 10 }}
                            columnGap={4}
                            wrap="wrap"
                        >
                            {projects
                                .filter((project) => project.id === 2 || project.id === 5 || project.id === 9)
                                .map((selectedProject) => (
                                    <Image
                                        key={selectedProject.id}
                                        w={{ base: '32', md: '40' }}
                                        objectFit="cover"
                                        h={{ base: '32', md: '40' }}
                                        src={selectedProject.image}
                                        alt={'Project' + selectedProject.id}
                                        shadow={'xl'}
                                        borderRadius="sm"
                                    />
                                ))}
                        </Flex>
                        <Contacts />
                    </Box>
                    <Image
                        w={{ base: '90%', lg: '50%' }}
                        h={{ base: '30%', lg: '40%' }}
                        marginTop={{ base: 0, md: 16 }}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals1.png`}
                        alt="Visuals2"
                        objectFit="contain"
                    />
                </Stack>
            </VStack>
        </Center>
    );
};
