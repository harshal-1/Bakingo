import { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  FormErrorMessage,
} from '@chakra-ui/react';

const isEmpty = (value) => value.trim() === '';

const Checkout = (props) => {
  const [formInputsValidity, setFormsInputsValidity] = useState({
    name: true,
    address: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);

    setFormsInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredAddressIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
    });
  };

  return (
    <Box as="form" onSubmit={confirmHandler} mt={4}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!formInputsValidity.name}>
          <FormLabel htmlFor="name" color="gray.700" fontWeight="semibold">Your Name</FormLabel>
          <Input
            type="text"
            id="name"
            ref={nameInputRef}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #da2635' }}
            borderRadius="8px"
          />
          <FormErrorMessage>Please enter a valid name!</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formInputsValidity.address}>
          <FormLabel htmlFor="address" color="gray.700" fontWeight="semibold">Your Address</FormLabel>
          <Textarea
            id="address"
            ref={addressInputRef}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'brand.red', boxShadow: '0 0 0 1px #da2635' }}
            borderRadius="8px"
            rows={2}
            resize="vertical"
          />
          <FormErrorMessage>Please enter a valid address!</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} justify="flex-end" pt={2}>
          <Button
            variant="outline"
            onClick={props.onCancel}
            borderRadius="25px"
            borderColor="gray.300"
            color="gray.700"
            _hover={{ bg: 'gray.50' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="red"
            borderRadius="25px"
            fontWeight="bold"
          >
            Confirm
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Checkout;
