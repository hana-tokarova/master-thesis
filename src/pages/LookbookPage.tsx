import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { projects } from './CreatePage';

export const LookbookPage = () => {
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
                / Showcase
            </Text>

            <Text maxW="70vw" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                Here you can find showcase of renders and lookbooks from the different collections. If you fancy some of
                the designs below, you can click on the specified jewelry and then you will be send to the Neotaku
                configurator.
            </Text>

            <Box
                marginTop="5"
                marginBottom="10"
                sx={{
                    columnCount: { base: 1, md: 2, lg: 3 },
                }}
                flexGrow={1}
            >
                {projects.map((selectedProject) => (
                    <Box as={Link} to={`/configurator?config=${selectedProject.url}`}>
                        <Image
                            key={selectedProject.id}
                            w="100%"
                            display="inline-block"
                            mb={2}
                            src={selectedProject.image}
                            alt={selectedProject.id.toString()}
                            borderRadius="lg"
                            shadow={'xl'}
                        />
                    </Box>
                ))}
            </Box>
        </VStack>
    );
};
