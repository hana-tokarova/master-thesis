import { extendTheme } from '@chakra-ui/react';

// see https://chakra-ui.com/docs/styled-system/theme
const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: '#1E1E1E',
            100: '#A2ACB5',
            200: '#FFFFFF',
            300: '#7F8E9B',
            400: '#C0C8D0',
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
});

export default theme;
