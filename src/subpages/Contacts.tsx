import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

/**
 * Renders the Contacts component.
 *
 * @returns The Contacts component.
 */
export const Contacts = () => {
    return (
        <>
            <Text paddingTop={12} textStyle={'header2'}>
                / Contacts
            </Text>

            <Text style={{ whiteSpace: 'nowrap' }}>
                <Box as="strong" textStyle={'bodyHighlight'}>
                    Project repository:
                </Box>{' '}
                <Button
                    as="a"
                    href="https://github.com/hana-tokarova/master-thesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="hyperlinkButton"
                >
                    github.com/hana-tokarova/master-thesis
                </Button>
                <br />
                <Box as="strong" textStyle={'bodyHighlight'}>
                    Portfolio:
                </Box>{' '}
                <Button
                    as="a"
                    href="https://behance.net/hana-tokarova"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="hyperlinkButton"
                >
                    behance.net/hana-tokarova
                </Button>
            </Text>

            <HStack paddingTop={5} paddingBottom={28} spacing={3} w="500px" align={'center'}>
                <Image src={`${process.env.PUBLIC_URL}/images/logo/ht-logo.svg`} alt="ht-logo" h="16" />
                <Text textStyle={'body'}>
                    {'Neotaku Jewelry is a master thesis project created\u00A0by'}
                    <Text as="span" textStyle={'bodyHighlight'}>
                        {'\u00A0Hana\u00A0Tokárová'}.
                    </Text>
                </Text>
            </HStack>
        </>
    );
};
