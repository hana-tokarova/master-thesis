import { Button, Text, VStack } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";

export const NotFoundPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <VStack
            spacing={2}
            paddingLeft={28}
            paddingRight={28}
            paddingTop={16}
            paddingBottom={16}
            alignItems={"left"}
        >
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            >
                / 404 - Page Not Found
            </Text>

            <Text
                maxW="lg"
                fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                Oooops! This page that you are trying to reach does not exist.
                Are you sure that you wanted to go here?
            </Text>

            <Text
                fontFamily={"body"}
                fontSize="md"
                color={"brand.50"}
            >
                Go to the {" "}
                <Button
                    size='md'
                    as={Link}
                    to={"/"}
                    fontFamily={"heading"}
                    variant="link"
                    color={"brand.50"}
                >
                    homepage.</Button>
            </Text>
        </VStack>
    );
};

export default NotFoundPage;
