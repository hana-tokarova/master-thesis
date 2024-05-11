import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

export const Contacts = () => {
    return (
        <>
            <Text color={'brand.50'} paddingTop={12} textStyle={'header2'}>
                / Contacts
            </Text>

            <Text color={'brand.50'} style={{ whiteSpace: 'nowrap' }}>
                <Box as="strong" textStyle={'bodyHighlight'}>
                    Project repository:
                </Box>{' '}
                <Button
                    as="a"
                    href="https://github.com/hana-tokarova/master-thesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="link"
                    color="brand.50"
                    fontWeight={400}
                    fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                >
                    github.com/hana-tokarova/master-thesis
                </Button>
                <br />
                <Box as="strong" fontFamily="heading" fontWeight="600">
                    Portfolio:
                </Box>{' '}
                <Button
                    as="a"
                    href="https://behance.net/hana-tokarova"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="link"
                    color="brand.50"
                    fontWeight={400}
                    fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}
                >
                    behance.net/hana-tokarova
                </Button>
            </Text>

            <HStack paddingTop={5} paddingBottom={28} spacing={3} w="500px" align={'center'}>
                <Image src={`${process.env.PUBLIC_URL}/images/logo/ht-logo.svg`} alt="ht-logo" h="16" />
                <Text fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }} color="brand.50">
                    Neotaku Jewelry is a master thesis project created by
                    <Text as="span" fontFamily={'heading'} fontWeight={600}>
                        {' '}
                        Hana Tokárová
                    </Text>
                    .
                </Text>
            </HStack>
        </>
    );
};
