import { Flex, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <Flex
      justify="space-between"
      align="center"
      py={4}
      borderBottom="1px"
      borderColor="gray.600"
    >
      <Box>
        <Heading as="h2" size="md" color="white" mb={2}>
          {props.name}
        </Heading>
        <HStack spacing={4}>
          <Text fontWeight="bold" color="brand.red">
            {price}
          </Text>
          <Text color="gray.400">x {props.amount}</Text>
        </HStack>
      </Box>
      <HStack spacing={2}>
        <Button
          onClick={props.onRemove}
          size="sm"
          colorScheme="red"
          variant="outline"
          fontWeight="bold"
          fontSize="lg"
          px={3}
        >
          −
        </Button>
        <Button
          onClick={props.onAdd}
          size="sm"
          colorScheme="red"
          variant="outline"
          fontWeight="bold"
          fontSize="lg"
          px={3}
        >
          +
        </Button>
      </HStack>
    </Flex>
  );
};

export default CartItem;
