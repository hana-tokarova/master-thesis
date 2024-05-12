import { Box } from '@chakra-ui/react';

/**
 * Renders the footer component.
 * @returns The JSX element representing the footer.
 */
export const Footer = () => {
    return <Box position="absolute" left="0" right="0" bottom={0} height="5px" bgColor="brand.50" zIndex={100} />;
};
