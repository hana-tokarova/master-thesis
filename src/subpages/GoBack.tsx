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

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Leave Page?
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to leave? You will lose all unsaved changes.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleLeave} ml={3}>
                                Leave
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};
