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
            <Box paddingTop={9} paddingBottom={28}>
                <Stack w="80vw">
                    <Text textStyle={'header1'}>/ Showcase</Text>

                    <Text textStyle={'body'} maxW="xl">
                        {
                            'Here you can find showcase of\u00A0renders and\u00A0lookbooks from the\u00A0different collections. If\u00A0you fancy some of\u00A0the\u00A0designs below, you can click on\u00A0the\u00A0specified jewelry and\u00A0then\u00A0you will be\u00A0send\u00A0to\u00A0the\u00A0Neotaku\u00A0configurator.'
                        }
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
                                <Box
                                    key={selectedProject.id}
                                    as={Link}
                                    to={`/configurator?config=${selectedProject.url}`}
                                >
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
                                            key={selectedProject.id + '-image'}
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
