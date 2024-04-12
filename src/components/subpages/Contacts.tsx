import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";

export const Contacts = () => {
    return (
        <>
            <Text
                fontFamily={"heading"}
                fontWeight="500"
                fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
                paddingTop={20}
            >
                / Contacts
            </Text>

            <Text
                maxW="md"
                fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
            >
                <Box as="strong" fontFamily="heading" fontWeight="600">
                    E-mail:
                </Box>

                {" "}

                <Button
                    as="a"
                    href="mailto:info@neotaku.com?subject=Interested in Your Work"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="link"
                    color="brand.50"
                    fontWeight={400}
                    fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
                >
                    info@neotaku.com
                </Button>

                <br />

                <Box as="strong" fontFamily="heading" fontWeight="600">
                    Portfolio:
                </Box>

                {" "}

                <Button
                    as="a"
                    href="https://behance.net/hana-tokarova"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="link"
                    color="brand.50"
                    fontWeight={400}
                    fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
                >
                    behance.net/hana-tokarova
                </Button>

            </Text>

            <HStack
                paddingTop={3}
                alignItems={"end"}
                spacing={1}
            >
                <Image
                    src="/images/logo/ht-logo.svg"
                    alt="ht-logo"
                    w={10}
                    h={10}
                />
                <Text
                    fontSize={{ base: "3xs", md: "2xs", lg: "xs" }}
                    color="brand.50"
                >
                    Neotaku Jewelry is a master thesis project created by Hana Tokárová.
                    <br />
                    ©2024 NEOTAKU JEWELRY
                </Text>
            </HStack>
        </>
    );
}