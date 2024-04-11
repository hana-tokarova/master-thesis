import { Stack, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export const NotFound = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Stack
            direction="column"
            marginTop={{ base: "20px", md: "100px", lg: "100px" }}
            spacing={{ base: "2px", md: "3px", lg: "3px" }}
            padding={{ base: "12px", md: "20px", lg: "20px" }}
            align="center"
        >
            <Text
                as="b"
                fontSize={{ base: "lg", md: "3xl", lg: "3xl" }}
                fontWeight="black"
            >
                404 - Page Not Found
            </Text>

            <Text fontSize={{ base: "sm", md: "md", lg: "md" }}>
                This page does not exist.
            </Text>
        </Stack>
    );
};

export default NotFound;
