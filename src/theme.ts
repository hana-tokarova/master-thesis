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
            fontSize: { base: 'rg', sm: 'lg', md: 'xl', lg: '2xl' },
            fontWeight: '500',
        },
        header3: {
            fontFamily: 'heading',
            fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
            fontWeight: '300',
        },
        header4: {
            fontFamily: 'heading',
            fontSize: { base: 'rg', sm: 'lg', md: 'xl', lg: '2xl' },
            fontWeight: '300',
        },
        subheader: {
            fontFamily: 'body',
            fontSize: { base: 'rg', sm: 'lg', md: 'xl', lg: '2xl' },
            fontWeight: '400',
        },
        button: {
            fontFamily: 'heading',
            fontSize: { base: '2xs', sm: 'xs', md: 'sm', lg: 'md' },
            fontWeight: '400',
        },
        body: {
            fontFamily: 'body',
            fontSize: { base: '2xs', sm: 'xs', md: 'sm', lg: 'md' },
            fontWeight: '400',
            maxW: '2xl',
        },
        bodyHighlight: {
            fontFamily: 'heading',
            fontSize: { base: '2xs', sm: 'xs', md: 'sm', lg: 'md' },
            fontWeight: '600',
        },
    },
});

export default theme;
