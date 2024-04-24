import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

export const Contacts = () => {
    return (
        <>
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                color={'brand.50'}
                fontSize={{ base: 'xl', md: '2xl' }}
                paddingTop={12}
            >
                / Contacts
            </Text>

            <Text fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }}>
                <Box as="strong" fontFamily="heading" fontWeight="600">
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
                    fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
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
                    fontSize={{ base: '3xs', sm: '2xs', md: 'xs', lg: 'sm' }}
                >
                    behance.net/hana-tokarova
                </Button>
            </Text>

            <Text paddingTop={5} fontSize={{ base: '2xs', sm: 'xs', md: 'sm', lg: 'md' }} color="brand.50">
                Neotaku Jewelry is a master thesis project created by
                <Text as="span" fontFamily={'heading'} fontWeight={600}>
                    {' '}
                    Hana Tokárová
                </Text>
                .
            </Text>

            <HStack paddingTop={3} paddingBottom={28} spacing={3} w="250px" align={'flex-end'}>
                <Image
                    src={`${process.env.PUBLIC_URL}/images/logo/logo-full.svg`}
                    alt="ht-logo"
                    h={{ base: 18, md: 30 }}
                />
                <Image src={`${process.env.PUBLIC_URL}/images/logo/ht-logo.svg`} alt="ht-logo" h={{ base: 5, md: 8 }} />
            </HStack>
        </>
    );
};
