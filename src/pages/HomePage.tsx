import { Box, Button, Center, Flex, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Contacts } from '../subpages/Contacts';
import { projects } from './CreatePage';

export const HomePage = () => {
    return (
        <>
            <Center>
                <VStack
                    spacing={2}
                    paddingLeft={{ base: 12, sm: 20, md: 24, lg: 28 }}
                    paddingRight={{ base: 12, sm: 20, md: 24, lg: 28 }}
                    paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }}
                    paddingBottom={16}
                >
                    <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start" gap={1}>
                        <Box w="40vw">
                            <Text
                                paddingTop={20}
                                fontFamily={'heading'}
                                fontWeight="300"
                                fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
                            >
                                Welcome to
                            </Text>

                            <Flex direction={{ base: 'column', md: 'row' }} align="flex-end" gap={5}>
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
                            >
                                Tool for customizable jewelry creation.
                            </Text>

                            <Text
                                fontFamily={'heading'}
                                fontWeight="300"
                                fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '5xl' }}
                                paddingTop={20}
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

                            <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                                The process is simple - just choose jewelry, customize it and export it to your device
                                in preferred format to 3D print it/cast it!
                            </Text>

                            <Button
                                marginTop={2}
                                size={{ sm: 'sm', lg: 'md' }}
                                as={Link}
                                to={'/create'}
                                fontFamily={'heading'}
                                fontWeight="450"
                                bg="brand.50"
                                color="brand.200"
                                w={{ base: 36, sm: 44, md: 52, lg: 60 }}
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
                                fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '5xl' }}
                            >
                                {' '}
                                / Multiple collections
                                <Text as="span" fontWeight="500">
                                    {' '}
                                    / Multiple possibilities
                                </Text>
                            </Text>

                            <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                                Each collection has an unique set of parameters that can be customized and changed. You
                                can start from scratch or by choosing one of the presets.
                            </Text>

                            <Button
                                marginTop={2}
                                size={{ sm: 'sm', lg: 'md' }}
                                as={Link}
                                to={'/showcase'}
                                fontFamily={'heading'}
                                fontWeight="450"
                                bg="brand.50"
                                color="brand.200"
                                w={{ base: 36, sm: 44, md: 52, lg: 60 }}
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
                                fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '4xl' }}
                            >
                                / Not sure yet?
                            </Text>
                            <Text maxW="xl" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                                Look at some of the examples that can be done in the configurator!
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
                                            w={{ base: '32', sm: '36', md: '40', lg: '60' }}
                                            objectFit="cover"
                                            h={{ base: '32', sm: '36', md: '40', lg: '60' }}
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
                            w="40vw"
                            paddingTop={32}
                            right={400}
                            src={`${process.env.PUBLIC_URL}/images/visuals/visuals1.png`}
                            alt="Visuals1"
                            position="fixed"
                        />
                    </Stack>
                </VStack>
            </Center>
        </>
    );
};
