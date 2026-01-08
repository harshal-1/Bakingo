import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Header from './components/Layout/Header';
import Home from './components/Home';
import Cakes from './components/Cakes';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import theme from './theme';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <>
            <Home />
            <Cakes />
        </>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
