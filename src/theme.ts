import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: '#1E1E1E',
            100: '#B2B2B2',
            200: '#FFFFFF',
            300: '#3E3E3E',
            400: '#F2F2F2',
            500: '#e5e5e5',
        },
        grayAlpha: {
            50: 'rgba(23,25,35,0.04)',
            100: 'rgba(23,25,35,0.06)',
            200: 'rgba(23,25,35,0.08)',
            300: 'rgba(23,25,35,0.16)',
            400: 'rgba(23,25,35,0.24)',
            500: 'rgba(23,25,35,0.36)',
            600: 'rgba(23,25,35,0.48)',
            700: 'rgba(23,25,35,0.64)',
            800: 'rgba(23,25,35,0.80)',
            900: 'rgba(23,25,35,0.92)',
        },
    },
    fonts: {
        body: "'Noto Sans Khmer', sans-serif",
        heading: "'Outfit', sans-serif",
    },
    textStyles: {
        header1: {
            fontFamily: 'heading',
            fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
            fontWeight: '500',
        },
        header2: {
            fontFamily: 'heading',
            fontSize: { base: 'md', sm: 'lg', md: 'xl', lg: '2xl' },
            fontWeight: '500',
        },
        header3: {
            fontFamily: 'heading',
            fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
            fontWeight: '300',
        },
        header4: {
            fontFamily: 'heading',
            fontSize: { base: 'md', sm: 'lg', md: 'xl', lg: '2xl' },
            fontWeight: '300',
        },
        subheader: {
            fontFamily: 'body',
            fontSize: { base: 'sm', sm: 'md', md: 'lg', lg: 'xl' },
            fontWeight: '400',
        },
        subheaderHighlight: {
            fontFamily: 'heading',
            fontSize: { base: 'sm', sm: 'md', md: 'lg', lg: 'xl' },
            fontWeight: '500',
        },
        button: {
            fontFamily: 'heading',
            fontSize: { base: 'xs', sm: 'xs', md: 'sm', lg: 'md' },
            fontWeight: '400',
        },
        body: {
            fontFamily: 'body',
            fontSize: { base: '2xs', sm: 'xs', md: 'xs', lg: 'sm' },
            fontWeight: '400',
            maxW: '2xl',
        },
        bodyHighlight: {
            fontFamily: 'heading',
            fontSize: { base: '2xs', sm: 'xs', md: 'sm', lg: 'md' },
            fontWeight: '500',
        },
    },
    components: {
        Button: {
            variants: {
                solidButton: {
                    bg: 'brand.50',
                    color: 'brand.200',
                    fontWeight: '450',
                    fontFamily: 'heading',
                    fontSize: {
                        base: 'xs',
                        sm: 'xs',
                        md: 'sm',
                        lg: 'md',
                    },
                    shadow: 'lg',
                    _hover: {
                        bg: 'brand.300',
                    },
                },
                cancelButton: {
                    bg: 'brand.200',
                    color: 'brand.50',
                    fontWeight: '450',
                    fontFamily: 'heading',
                    fontSize: {
                        base: '2xs',
                        sm: 'xs',
                        md: 'sm',
                        lg: 'md',
                    },
                    shadow: 'none',
                    _hover: {
                        bg: 'brand.400',
                    },
                },
                warningButton: {
                    bg: 'red.500',
                    color: 'brand.200',
                    fontWeight: '450',
                    fontFamily: 'heading',
                    fontSize: {
                        base: '2xs',
                        sm: 'xs',
                        md: 'sm',
                        lg: 'md',
                    },
                    shadow: 'none',
                    _hover: {
                        bg: 'red.400',
                    },
                    _focus: {
                        bg: 'red.600',
                    },
                },
                hyperlinkButton: {
                    color: 'brand.50',
                    fontWeight: '400',
                    fontSize: {
                        base: '2xs',
                        sm: '2xs',
                        md: 'xs',
                        lg: 'sm',
                    },
                    _hover: {
                        textDecoration: 'underline',
                    },
                    p: 0,
                    height: 'auto',
                },
            },
        },
        Text: {
            baseStyle: {
                color: 'brand.50',
            },
        },
    },
});

export default theme;
