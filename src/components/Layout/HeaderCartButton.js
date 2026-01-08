import { useContext, useEffect, useState } from 'react';
import { Button, Box, Badge } from '@chakra-ui/react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const bumpAnimation = btnIsHighlighted
    ? {
      animation: 'bump 300ms ease-out',
      '@keyframes bump': {
        '0%': { transform: 'scale(1)' },
        '10%': { transform: 'scale(0.9)' },
        '30%': { transform: 'scale(1.1)' },
        '50%': { transform: 'scale(1.15)' },
        '100%': { transform: 'scale(1)' },
      },
    }
    : {};

  return (
    <Button
      onClick={props.onClick}
      variant="cart"
      display="flex"
      alignItems="center"
      gap="0.5rem"
      sx={bumpAnimation}
    >
      <Box width="1.35rem" height="1.35rem">
        <CartIcon />
      </Box>
      <Box>Your Cart</Box>
      <Badge
        bg="#f10a0a"
        color="white"
        px="1rem"
        py="0.25rem"
        borderRadius="25px"
        ml="1rem"
        fontWeight="bold"
        _hover={{ bg: '#d82828' }}
      >
        {numberOfCartItems}
      </Badge>
    </Button>
  );
};

export default HeaderCartButton;
