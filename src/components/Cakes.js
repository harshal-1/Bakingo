import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import CakeCard from './CakeCard';
import mealsData from '../assets/meals.json';

const Cakes = () => {
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

  const mealsList = meals.map((meal) => (
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
      px={{ base: '1.5rem', md: '2rem', lg: '3rem' }}
      animation="meals-appear 1s ease-out forwards"
      sx={{
        '@keyframes meals-appear': {
          from: { opacity: 0, transform: 'translateY(3rem)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
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
