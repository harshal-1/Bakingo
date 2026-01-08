import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import mealsImage from '../assets/order.png';

const Home = () => {
  return (
    <Box
      as="section"
      mt={{ base: '6rem', md: '4rem' }}
      px={{ base: '1.5rem', md: '5rem' }}
      maxW="1557px"
      mx="auto"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        // gap={{ base: '0.1rem', md: '4rem' }}
        align="center"
      >
        <Box flex="1">
          <Heading
            // as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color="white"
            mb="1.5rem"
            lineHeight="1.2"
          >
            Crafted to Delight. Baked to Impress.
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="brand.lightGray"
            lineHeight="1.8"
          >
            Discover cakes that look stunning and taste even better. From timeless classics to rich chocolates, refreshing fruity delights, and premium exotic creations — we bake every cake fresh, with the finest ingredients, and deliver it straight to your door. Whether it's a celebration or a sudden craving, Bakingo makes every moment sweeter.
          </Text>
        </Box>
        <Box flex="1" display="flex" justifyContent="end" alignItems="center">
          <Image
            src={mealsImage}
            alt="A table full of delicious cakes!"
            maxW={{ base: '100%', md: '500px' }}
            w="100%"
            h="auto"
            borderRadius="16px"
            // boxShadow="0 8px 32px rgba(255, 255, 255, 0.1)"
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
