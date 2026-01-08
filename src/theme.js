import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            red: '#da2635',
            black: '#000000',
            darkGray: '#1a1a1a',
            lightGray: '#cccccc',
            white: '#ffffff',
        },
        category: {
            exotic: '#8422daff',     // Dark purple for Exotic
            classic: '#1E3A8A',    // Dark blue for Classic
            fruity: '#15803D',     // Dark green for Fruity
            chocolate: '#78350F',  // Dark brown for Chocolate
        },
    },
    fonts: {
        heading: `'Noto Sans JP', sans-serif`,
        body: `'Noto Sans JP', sans-serif`,
    },
    styles: {
        global: {
            body: {
                bg: 'brand.black',
                color: 'brand.white',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: '25px',
            },
            variants: {
                solid: {
                    bg: '#000000',
                    color: 'white',
                    _hover: {
                        bg: '#1b1a19',
                    },
                },
                cart: {
                    bg: 'white',
                    color: 'black',
                    px: { base: "0.5rem", md: "1rem" },
                    py: { base: "0.3rem", md: "0.5rem" },
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    _hover: {
                        bg: '#f5f5f5',
                    },
                },
            },
        },
        Badge: {
            variants: {
                category: {
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    color: 'brand.red',
                    bg: 'rgba(218, 38, 53, 0.1)',
                    px: '0.75rem',
                    py: '0.25rem',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                },
            },
        },
    },
});

export default theme;
