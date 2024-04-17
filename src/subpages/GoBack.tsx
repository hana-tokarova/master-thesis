import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { NavigateFunction } from 'react-router-dom';

type GoBackProps = {
    isDirty: boolean;
    setIsDirty: (isDirty: boolean) => void;
    navigate: NavigateFunction;
};

export const GoBack = ({ isDirty, setIsDirty, navigate }: GoBackProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef = React.useRef<HTMLButtonElement>(null);

    const handleBackClick = () => {
        if (isDirty) {
            onOpen();
        } else {
            navigate('/create');
        }
    };

    const handleLeave = () => {
        setIsDirty(false);
        navigate('/create');
    };

    return (
        <Box>
            <Button
                leftIcon={<MdKeyboardBackspace />}
                onClick={handleBackClick}
                size={{ base: 'xs', md: 'sm', lg: 'md' }}
                fontFamily={'heading'}
                fontWeight="400"
                variant="link"
                color={'brand.50'}
                style={{ padding: 0 }}
            >
                Back to collection types
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} motionPreset="slideInBottom">
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontFamily={'heading'} fontSize="xl" fontWeight="500">
                            Leave Configurator?
                        </AlertDialogHeader>
                        <AlertDialogBody fontFamily={'body'} fontSize="sm" fontWeight="400">
                            Are you sure you want to leave? You will lose all progress if you didn't save the design
                            link.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onClose}
                                fontFamily={'heading'}
                                fontSize="md"
                                fontWeight="500"
                                bg="brand.400"
                                color="brand.50"
                                _hover={{ bg: 'brand.400' }}
                                _focus={{ bg: 'brand.300' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                fontFamily={'heading'}
                                fontSize="md"
                                fontWeight="500"
                                bg="red.500"
                                color="brand.200"
                                onClick={handleLeave}
                                ml={3}
                                _hover={{ bg: 'red.400' }}
                                _focus={{ bg: 'red.600' }}
                            >
                                Leave Anyway
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};
