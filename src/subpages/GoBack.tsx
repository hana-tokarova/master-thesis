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

/**
 * Props for the GoBack component.
 */
type GoBackProps = {
    isDirty: boolean;

    /**
     * Callback function to set the dirty state of the component.
     * @param isDirty - The new dirty state.
     */
    setIsDirty: (isDirty: boolean) => void;

    navigate: NavigateFunction;
};

/**
 * Renders a "Go Back" component.
 *
 * @param props - The component props.
 * @returns The rendered "Go Back" component.
 */
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
            <Button leftIcon={<MdKeyboardBackspace />} onClick={handleBackClick} variant="hyperlinkButton">
                Back to collection types
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} motionPreset="slideInBottom">
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader textStyle="header3">Leave Configurator?</AlertDialogHeader>
                        <AlertDialogBody textStyle="body">
                            Are you sure you want to leave? You will lose all progress if you didn't save the design
                            link.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} variant="cancelButton">
                                Cancel
                            </Button>
                            <Button variant="warningButton" onClick={handleLeave} ml={3}>
                                Leave Anyway
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};
