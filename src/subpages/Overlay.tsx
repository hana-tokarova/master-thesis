import { Box, keyframes, Text, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';

const swayAnimation = keyframes`
  0% { transform: translate(-10px, -5px); }
  50% { transform: translate(10px, 5px); }
  100% { transform: translate(-10px, -5px); }
`;

export const StartupOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useBoolean(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            fadeOutAndClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose, setIsVisible]);

    const fadeOutAndClose = () => {
        setIsVisible.off(); // Begin fade-out
        setTimeout(() => {
            onClose(); // Finally close the overlay
        }, 1000); // Sync with the fade-out transition time
    };

    return (
        <Box
            position="absolute"
            top="0"
            right="0"
            width="100%" // Cover the parent Box dimensions
            height="100%" // Cover the parent Box dimensions
            bg="whiteAlpha.800"
            zIndex="overlay"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            opacity={isVisible ? 1 : 0}
            transition="opacity 1s ease-in-out" // Fade out transition
            onMouseDown={fadeOutAndClose} // Close the overlay on mouse release
        >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Welcome! Use your mouse to rotate the model.
            </Text>
            <Box
                as="div"
                animation={`${swayAnimation} infinite 2s ease-in-out`} // Modified sway animation for an arc-like path
                borderWidth="2px"
                borderColor="blue.500"
                p={2}
                borderRadius="full"
            >
                <Text>👆</Text>
            </Box>
        </Box>
    );
};
