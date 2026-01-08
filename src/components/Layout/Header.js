import { Box, Flex, Image, Heading } from '@chakra-ui/react';

import HeaderCartButton from './HeaderCartButton';
import logo from '../../assets/logo.png';

const Header = (props) => {
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="5rem"
      bg="brand.black"
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: "1.4rem", md: "2rem" }}
      py="1rem"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.25)"
      zIndex="10"
    >
      <Flex alignItems="center" gap="1rem">
        <Image src={logo} alt="Bakingo Logo" height="2rem" width="auto" />
        <Heading size="md" color="white" fontWeight="bold">
          Bakingo
        </Heading>
      </Flex>
      <HeaderCartButton onClick={props.onShowCart} />
    </Box>
  );
};

export default Header;
