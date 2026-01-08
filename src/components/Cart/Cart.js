import { Fragment, useContext, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Flex,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';

import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <Box>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </Box>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://bakingo-c4f8f-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <Flex justify="space-between" width="100%" gap={4} mt={2}>
      <Button
        variant="outline"
        onClick={props.onClose}
        flex={1}
        borderRadius="25px"
        borderColor="gray.300"
        color="gray.700"
        _hover={{ bg: 'gray.50' }}
      >
        Close
      </Button>
      {hasItems && (
        <Button
          colorScheme="red"
          onClick={orderHandler}
          flex={1}
          borderRadius="25px"
          fontWeight="bold"
        >
          Order
        </Button>
      )}
    </Flex>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <Divider borderColor="gray.300" mt={4} mb={3} />
      <Flex justify="flex-end" align="center" fontWeight="bold" fontSize="xl" px={1} gap={2}>
        <Text color="gray.700">Total:</Text>
        <Text color="brand.red" fontSize="xl">{totalAmount}</Text>
      </Flex>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <Text textAlign="center" py={4} color="gray.700" fontSize="lg">Sending order data....</Text>
  );

  const didSubmitModalContent = (
    <VStack spacing={3} align="center">
      <Text textAlign="center" py={1} color="brand.red" fontSize="lg" fontWeight="semibold">Successfully sent the order!</Text>
      <Button colorScheme="red" width="30%" onClick={props.onClose} borderRadius="25px" fontWeight="bold">
        Close
      </Button>
    </VStack>
  );

  return (
    <Modal isOpen={true} onClose={props.onClose} size="xl">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg="white" color="gray.800" maxW={{ base: "90%", md: "xl" }}>
        <ModalHeader fontWeight="bold" fontSize="2xl" pb={2}>Your Cart</ModalHeader>
        <ModalCloseButton color="gray.600" />
        <ModalBody pb={4}>
          {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
