import { Box, Text, VStack } from '@chakra-ui/react';

const ScrollableList = () => {
    // Example data for the list
    const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

    return (
        <Box
            // maxH="400px" // Maximum height of the scrollable area
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

export default ScrollableList;
