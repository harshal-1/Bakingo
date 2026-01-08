import { Flex, Box, Heading, Text, IconButton, HStack, Image } from '@chakra-ui/react';
import { IoAdd, IoRemove } from 'react-icons/io5';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const totalPrice = `$${(props.price * props.amount).toFixed(2)}`;

  return (
    <Box
      bg="white"
      borderRadius="12px"
      p={4}
      mb={3}
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        {props.image && (
          <Box
            width="60px"
            height="60px"
            borderRadius="8px"
            overflow="hidden"
            flexShrink={0}
          >
            <Image
              src={props.image}
              alt={props.name}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        )}
        <Box flex="1">
          <Heading as="h3" size="sm" color="gray.800" mb={2} fontWeight="bold">
            {props.name}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {price} × {props.amount}
          </Text>
        </Box>
        <Flex direction="column" align="flex-end" gap={2}>
          <HStack spacing={2}>
            <IconButton
              onClick={props.onRemove}
              icon={<IoRemove size={16} />}
              size="sm"
              colorScheme="red"
              variant="outline"
              borderRadius="full"
              aria-label="Decrease quantity"
              minW="32px"
              h="32px"
            />
            <Text fontWeight="bold" minW="24px" textAlign="center" color="gray.800" fontSize="sm">
              {props.amount}
            </Text>
            <IconButton
              onClick={props.onAdd}
              icon={<IoAdd size={16} />}
              size="sm"
              colorScheme="red"
              variant="outline"
              borderRadius="full"
              aria-label="Increase quantity"
              minW="32px"
              h="32px"
            />
          </HStack>
          <Text fontSize="md" fontWeight="bold" color="brand.red">
            {totalPrice}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartItem;
