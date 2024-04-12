import { Box, Text, VStack } from '@chakra-ui/react';

export const ScrollableListPage = () => {
    const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

    return (
        <Box
            overflowY="scroll" // Enable vertical scrolling
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
        >
            <VStack align="stretch" spacing={4}>
                {items.map((item, index) => (
                    <Text key={index} p={2} bg="gray.100" borderRadius="md">
                        {item}
                    </Text>
                ))}
            </VStack>
        </Box>
    );
};

