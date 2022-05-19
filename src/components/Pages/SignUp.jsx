import React, { useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Button,
  Center,
  FormErrorMessage,
  FormHelperText,
  ChakraProvider,
  chakra,
} from "@chakra-ui/react";

function SignUp(props) {
  return (
    <div className="content">
      <Center width="100vw">
        <VStack>
          <form>
            <chakra.h1
              fontSize="lg"
              fontWeight="medium"
              lineHeight="6"
              mt={"2rem"}
              mb={"2rem"}>
              Sign Up
            </chakra.h1>
            <FormControl
              mt={3}
              w={{ sm: "100%", md: "140%", lg: "140%" }}
              isInvalid={props.isEmailError[0]}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                onChange={(event) => {
                  props.setRegisterEmail(event.target.value);
                }}
              />
              {props.isEmailError[0] && (
                <FormErrorMessage>{props.isEmailError[1]}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={props.isPasswordError[0]}
              mt={3}
              mb={15}
              w={{ sm: "100%", md: "140%", lg: "140%" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                onChange={(event) => {
                  props.setRegisterPassword(event.target.value);
                }}
              />
              {props.isPasswordError[0] && (
                <FormErrorMessage>
                  Password must be at least 6 characters.
                </FormErrorMessage>
              )}
            </FormControl>

            <Button width="full" top={"1rem"} onClick={props.register}>
              Submit
            </Button>
          </form>
        </VStack>
      </Center>
    </div>
  );
}

export default SignUp;
