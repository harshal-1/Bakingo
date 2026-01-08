import { useContext, useState, useEffect } from 'react';
import { Box, Image, Badge, Heading, Text, Flex, Button, IconButton, HStack } from '@chakra-ui/react';
import { IoAdd, IoRemove } from 'react-icons/io5';

import CartContext from '../store/cart-context';

const CakeCard = (props) => {
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const price = `$${props.price.toFixed(2)}`;

  // Get current quantity from cart
  useEffect(() => {
    const cartItem = cartCtx.items.find(item => item.id === props.id);
    setQuantity(cartItem ? cartItem.amount : 0);
  }, [cartCtx.items, props.id]);

  const handleAddToCart = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
      image: props.image
    });
  };

  const handleIncrement = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
      image: props.image
    });
  };

  const handleDecrement = () => {
    cartCtx.removeItem(props.id);
  };

  // Map category to color
  const getCategoryColor = (category) => {
    const colorMap = {
      'Exotic': 'category.exotic',
      'Classic': 'category.classic',
      'Fruity': 'category.fruity',
      'Chocolate': 'category.chocolate',
    };
    return colorMap[category] || 'gray.600';
  };

  return (
    <Box
      bg="white"
      borderRadius="12px"
      minWidth={'360px'}
      maxWidth={'445px'}
      overflow="hidden"
      transition="all 0.3s ease"
      boxShadow="0 4px 16px rgba(0, 0, 0, 0.1)"
      display="flex"
      flexDirection="column"
      height="100%"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      }}
    >
      {props.image && (
        <Box p={{ base: "0.5rem", md: "1rem" }} pb="0">
          <Box
            width="100%"
            paddingBottom="56.25%"
            position="relative"
            overflow="hidden"
            borderRadius="8px"
          >
            <Image
              src={props.image}
              alt={props.name}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              objectFit="cover"
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>
        </Box>
      )}
      <Box p={{ base: "1rem", md: "1.5rem" }} pt={{ md: "0" }} display="flex" flexDirection="column" flex="1">
        <Flex justify="space-between" align="flex-start" gap="1rem" mb="1rem">
          <Box flex="1">
            <Badge
              color={getCategoryColor(props.category)}
              bg="transparent"
              fontSize={{ base: "xs", md: "xs" }}
              fontWeight="bold"
              textTransform="uppercase"
              px="0"
              mb="0.5rem"
              letterSpacing="0.5px"
            >
              {props.category}
            </Badge>
            <Heading as="h3" size={{ base: "sm", md: "md" }} color="gray.800" mt="0.1rem" lineHeight="1.3">
              {props.name}
            </Heading>
          </Box>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="brand.red" whiteSpace="nowrap">
            {price}
          </Text>
        </Flex>

        <Flex mt="auto" gap="1rem" align="flex-end">
          <Text flex="1" fontSize={{ base: "sm", md: "sm" }} color="gray.600" lineHeight="1.5">
            {props.description}
          </Text>

          <Box flexShrink="0">
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                colorScheme="red"
                size="sm"
                leftIcon={<IoAdd size={16} />}
                fontWeight="bold"
              >
                Add
              </Button>
            ) : (
              <HStack spacing={2}>
                <IconButton
                  onClick={handleDecrement}
                  icon={<IoRemove size={16} />}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  borderRadius="full"
                  aria-label="Decrease quantity"
                />
                <Text fontWeight="bold" minW="20px" textAlign="center" color="gray.800">
                  {quantity}
                </Text>
                <IconButton
                  onClick={handleIncrement}
                  icon={<IoAdd size={16} />}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  borderRadius="full"
                  aria-label="Increase quantity"
                />
              </HStack>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default CakeCard;
