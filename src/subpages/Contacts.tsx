import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

export const Contacts = () => {
    return (
        <>
            <Text
                fontFamily={'heading'}
                fontWeight="500"
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }}
                paddingTop={{ base: 10, sm: 14, md: 16, lg: 20 }}
            >
                / Contacts
            </Text>

            <Text maxW="md" fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }}>
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
                    fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }}
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
                    fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }}
                >
                    behance.net/hana-tokarova
                </Button>
            </Text>

            <Text paddingTop={5} fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} color="brand.50">
                Neotaku Jewelry is a master thesis project created by
                <Text as="span" fontFamily={'heading'} fontWeight={600}>
                    {' '}
                    Hana Tokárová
                </Text>
                .
            </Text>

            <HStack paddingTop={3} paddingBottom={28} spacing={3} w="250px" align={'flex-end'}>
                <Image src={`${process.env.PUBLIC_URL}/images/logo/logo-full.svg`} alt="ht-logo" h={30} />
                <Image src={`${process.env.PUBLIC_URL}/images/logo/ht-logo.svg`} alt="ht-logo" w={10} h={8} />
            </HStack>
        </>
    );
};
