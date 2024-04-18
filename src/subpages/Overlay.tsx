import { Box, Icon, keyframes, Text, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MdMouse } from 'react-icons/md';

const halfArcAnimation = keyframes`
0% { 
    transform: translateX(0) translateY(0) rotate(0deg); 
  }
  25% { 
    transform: translateX(-5px) translateY(10px) rotate(-10deg); 
  }
  50% { 
    transform: translateX(-10px) translateY(0) rotate(-20deg); 
  }
  75% { 
    transform: translateX(-5px) translateY(-10px) rotate(-10deg); 
  }
  100% { 
    transform: translateX(0) translateY(0) rotate(0deg); 
  }
`;

export const StartupOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useBoolean(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            fadeOutAndClose();
        }, 5000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose, setIsVisible]);

    const fadeOutAndClose = () => {
        setIsVisible.off();
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    return (
        <Box
            position="absolute"
            top="0"
            right="0"
            width="100%"
            height="100%"
            bg="whiteAlpha.800"
            zIndex="overlay"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            opacity={isVisible ? 1 : 0}
            transition="opacity 1s ease-in-out"
            onMouseDown={fadeOutAndClose}
            userSelect="none"
            pointerEvents="none"
        >
            <Text fontFamily={'heading'} fontSize="xl" fontWeight={400} mb={4} pointerEvents="auto">
                Use your mouse to rotate the model.
            </Text>
            <Box p={3} as="div" animation={`${halfArcAnimation} infinite 3s ease-in-out`}>
                <Icon as={MdMouse} boxSize={6} />
            </Box>
        </Box>
    );
};
