import { useMemo, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import CakeCard from './CakeCard';
import mealsData from '../assets/meals.json';

const Cakes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const meals = useMemo(() => {
    const loadedMeals = [];

    for (const key in mealsData.meals) {
      loadedMeals.push({
        id: key,
        name: mealsData.meals[key].name,
        description: mealsData.meals[key].description,
        price: mealsData.meals[key].price,
        image_url: mealsData.meals[key].image_url,
        category: mealsData.meals[key].category,
      });
    }

    return loadedMeals;
  }, []);

  const filteredMeals = useMemo(() => {
    if (selectedCategory === 'All') {
      return meals;
    }
    return meals.filter((meal) => meal.category === selectedCategory);
  }, [meals, selectedCategory]);

  const categories = ['All', 'Classic', 'Fruity', 'Chocolate', 'Exotic'];

  // Map category to color
  const getCategoryColor = (category) => {
    const colorMap = {
      'All': 'gray.700',
      'Exotic': 'category.exotic',     // Dark purple
      'Classic': 'category.classic',    // Dark blue
      'Fruity': 'category.fruity',      // Dark green
      'Chocolate': 'category.chocolate', // Dark brown
    };
    return colorMap[category] || 'gray.700';
  };

  const mealsList = filteredMeals.map((meal) => (
    <CakeCard
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image_url}
      category={meal.category}
    />
  ));

  return (
    <Box
      as="section"
      maxW="1500px"
      mx="auto"
      w="90%"
      my="3rem"
      px={{ base: '0.6rem', md: '2rem', lg: '3rem' }}
      animation="meals-appear 1s ease-out forwards"
      sx={{
        '@keyframes meals-appear': {
          from: { opacity: 0, transform: 'translateY(3rem)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Filter by Categories */}
      <Flex
        mb="2rem"
        alignItems="center"
        flexWrap="wrap"
        gap={{ base: '0.5rem', md: '1rem' }}
      >
        <Text
          fontSize={{ base: '1rem', md: '1.1rem' }}
          fontWeight="600"
          color="white"
          w={{ base: '100%', md: 'auto' }}
          mr={{ base: '0', md: '1rem' }}
        >
          Filter By Categories:
        </Text>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            size={{ base: 'xs', md: 'sm' }}
            px={{ base: '1rem', md: '1.5rem' }}
            py={{ base: '0.5rem', md: '0.6rem' }}
            borderRadius="full"
            fontWeight="600"
            cursor="pointer"
            transition="all 0.3s ease"
            bg={selectedCategory === category ? 'brand.red' : 'white'}
            color={selectedCategory === category ? 'white' : getCategoryColor(category)}
            border="2px solid"
            borderColor={selectedCategory === category ? 'brand.red' : getCategoryColor(category)}
            _hover={{
              bg: selectedCategory === category ? '#c91f2e' : 'gray.50',
            }}
            _active={{
              bg: selectedCategory === category ? '#c91f2e' : 'gray.100',
            }}
          >
            {category}
          </Button>
        ))}
      </Flex>

      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={{ base: '1rem', md: '1.5rem' }}
        justifyContent="center"
      >
        {mealsList}
      </Box>
    </Box>
  );
};

export default Cakes;
