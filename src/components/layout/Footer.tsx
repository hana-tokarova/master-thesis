import { Box } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Box
            position="fixed"
            bottom={0}
            width="100%"
            height="5px"
            bgColor="brand.50"
            alignItems={'end'}
        />
    );
}