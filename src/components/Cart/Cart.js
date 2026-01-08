import { Fragment, useContext, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  Flex,
  Text,
  Box,
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
    <VStack spacing={0} align="stretch">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </VStack>
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
    <Flex justify="space-between" width="100%" gap={4}>
      <Button variant="outline" onClick={props.onClose} flex={1}>
        Close
      </Button>
      {hasItems && (
        <Button colorScheme="red" onClick={orderHandler} flex={1}>
          Order
        </Button>
      )}
    </Flex>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <Flex justify="space-between" align="center" fontWeight="bold" fontSize="xl" mt={4} py={4}>
        <Text>Total Amount</Text>
        <Text color="brand.red">{totalAmount}</Text>
      </Flex>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <Text textAlign="center" py={4}>Sending order data....</Text>
  );

  const didSubmitModalContent = (
    <Fragment>
      <Text textAlign="center" py={4}>Successfully sent the order!</Text>
      <Button colorScheme="red" width="100%" onClick={props.onClose}>
        Close
      </Button>
    </Fragment>
  );

  return (
    <Modal isOpen={true} onClose={props.onClose} size="xl">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg="brand.darkGray" color="white">
        <ModalHeader>Your Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
