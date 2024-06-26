import { Box, Button, Center, Flex, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Contacts } from '../subpages/Contacts';
import { projects } from './CreatePage';

/**
 * Renders the home page component.
 *
 * @returns The HomePage component.
 */
export const HomePage = () => {
    return (
        <Center>
            <VStack paddingTop={9} paddingBottom={28}>
                <Stack w="80vw" direction={{ base: 'column', md: 'row' }} align="flex-start">
                    <Box w={{ base: '80vw', md: '35vw' }} minW={'35vw'}>
                        <Text paddingTop={15} paddingBottom={5} textStyle="header3">
                            Welcome to
                        </Text>

                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align={{ base: 'flex-start', md: 'flex-end' }}
                            wrap={'wrap'}
                            gap={5}
                        >
                            <Image
                                w="500px"
                                src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`}
                                alt="NEOTAKU JEWELRY"
                                objectFit="contain"
                            />

                            <Text color="brand.100" textStyle="subheader">
                                /niː.oʊ.ta.ku/
                            </Text>
                        </Flex>

                        <Text paddingTop={5} textStyle="header4">
                            Tool for customizable jewelry creation.
                        </Text>

                        <Text textStyle="header1" paddingTop={16} whiteSpace={{ base: 'normal', md: 'nowrap' }}>
                            / Choose / Customize / Export
                        </Text>

                        <Text maxW="xl" textStyle="body">
                            {
                                'The process is simple — just choose jewelry, customize it and\u00A0export it to your device in\u00A0preferred format to\u00A03D print it!'
                            }
                        </Text>

                        <Button marginTop={2} size="sm" as={Link} to={'/create'} w="40" variant="solidButton">
                            Create your jewelry
                        </Button>

                        <Text textStyle="header1" paddingTop={12} whiteSpace={{ base: 'normal', md: 'nowrap' }}>
                            / Multiple collections / Multiple possibilities
                        </Text>

                        <Text maxW="xl" textStyle="body">
                            {
                                'Each collection has an unique set of parameters that can be\u00A0customized and changed. You can start from scratch or\u00A0by\u00A0choosing one of the presets.'
                            }
                        </Text>

                        <Button marginTop={2} size="sm" as={Link} to={'/showcase'} w="40" variant="solidButton">
                            Browse collections
                        </Button>
                        <Text paddingTop={12} textStyle={'header2'}>
                            / Not sure yet?
                        </Text>
                        <Text maxW="xl" textStyle="body">
                            {'Here are some of the examples that can be done in\u00A0the\u00A0configurator!'}
                        </Text>

                        <Flex
                            paddingTop="2"
                            paddingBottom="4"
                            direction="row"
                            rowGap={{ base: 4, sm: 6, md: 8, lg: 10 }}
                            columnGap={4}
                        >
                            {projects
                                .filter((project) => project.id === 2 || project.id === 8 || project.id === 9)
                                .map((selectedProject) => (
                                    <Box
                                        as={Link}
                                        to={`/configurator?config=${selectedProject.url}`}
                                        key={selectedProject.id}
                                        position="relative"
                                        borderRadius="sm"
                                        shadow="lg"
                                        bg={'brand.200'}
                                    >
                                        <Box
                                            _hover={{
                                                '.image-overlay': {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            <Image
                                                key={selectedProject.id}
                                                objectFit="cover"
                                                h={{ base: '32', md: '40' }}
                                                src={selectedProject.image}
                                                alt={'Project' + selectedProject.id}
                                            />
                                            <Box
                                                className="image-overlay"
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                w="full"
                                                h="full"
                                                bgGradient="linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))"
                                                opacity="0"
                                                transition="opacity 0.3s ease-in-out"
                                                zIndex="1"
                                            />
                                        </Box>
                                    </Box>
                                ))}
                        </Flex>

                        <Contacts />
                    </Box>

                    <Image
                        w={{ base: '90%', lg: '80%' }}
                        marginTop={{ base: 0, md: 16 }}
                        marginRight={{ base: '0%', md: '5%' }}
                        src={`${process.env.PUBLIC_URL}/images/visuals/visuals1.png`}
                        alt="Visuals2"
                    />
                </Stack>
            </VStack>
        </Center>
    );
};
