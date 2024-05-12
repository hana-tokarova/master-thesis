import { Box, Center, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { projects } from './CreatePage';

/**
 * Represents the LookbookPage component.
 * This component displays a showcase of renders and lookbooks from different collections.
 * Each render or lookbook can be clicked to navigate to the Neotaku configurator.
 *
 * @returns The LookbookPage component.
 */
export const LookbookPage = () => {
    return (
        <Center>
            <Box paddingTop={{ base: 6, sm: 10, md: 12, lg: 16 }} paddingBottom={28}>
                <Stack w="80vw">
                    <Text textStyle={'header1'}>/ Showcase</Text>

                    <Text textStyle={'body'}>
                        Here you can find showcase of renders and lookbooks from the different collections. If you fancy
                        some of the designs below, you can click on the specified jewelry and then you will be send to
                        the Neotaku configurator.
                    </Text>

                    <Box
                        marginTop="5"
                        marginBottom="20"
                        sx={{
                            columnCount: { base: 1, sm: 2, md: 3, lg: 4 },
                        }}
                        flexGrow={1}
                    >
                        {projects
                            .filter((project) => project.price !== 'TBA')
                            .map((selectedProject) => (
                                <Box as={Link} to={`/configurator?config=${selectedProject.url}`}>
                                    <Box
                                        _hover={{
                                            '.image-overlay': {
                                                opacity: 1,
                                            },
                                        }}
                                        position="relative"
                                        overflow="hidden"
                                        borderRadius="sm"
                                        shadow="lg"
                                        marginBottom="4"
                                        bg="brand.200"
                                    >
                                        <Image
                                            key={selectedProject.id}
                                            display="inline-block"
                                            src={selectedProject.image}
                                            alt={selectedProject.id.toString()}
                                            borderRadius="lg"
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
                    </Box>
                </Stack>
            </Box>
        </Center>
    );
};
