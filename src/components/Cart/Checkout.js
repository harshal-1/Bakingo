import { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  FormErrorMessage,
} from '@chakra-ui/react';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormsInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    setFormsInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });
  };

  return (
    <Box as="form" onSubmit={confirmHandler} mt={4}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!formInputsValidity.name}>
          <FormLabel htmlFor="name">Your Name</FormLabel>
          <Input
            type="text"
            id="name"
            ref={nameInputRef}
            bg="gray.700"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
          />
          <FormErrorMessage>Pls enter a valid name!</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formInputsValidity.street}>
          <FormLabel htmlFor="street">Street</FormLabel>
          <Input
            type="text"
            id="street"
            ref={streetInputRef}
            bg="gray.700"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
          />
          <FormErrorMessage>Pls enter a valid street!</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formInputsValidity.postalCode}>
          <FormLabel htmlFor="postal">Postal Code</FormLabel>
          <Input
            type="text"
            id="postal"
            ref={postalCodeInputRef}
            bg="gray.700"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
          />
          <FormErrorMessage>
            Pls enter a valid postal Code! (6 characters long)
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formInputsValidity.city}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            type="text"
            id="city"
            ref={cityInputRef}
            bg="gray.700"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
          />
          <FormErrorMessage>Pls enter a valid city!</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} justify="flex-end" pt={2}>
          <Button variant="outline" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="red">
            Confirm
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Checkout;
