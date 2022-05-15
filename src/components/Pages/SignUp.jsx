import React, { useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Button,
  Center,
} from "@chakra-ui/react";

function SignUp({
  setRegisterEmail,
  setRegisterPassword,
  register,
  setUser,
  user,
}) {
  return (
    <div className="content">
      <Center width="100vw">
        <VStack>
          <form>
            <Heading
              fontSize="lg"
              fontWeight="medium"
              lineHeight="6"
              mt={"2rem"}
              mb={"2rem"}>
              Sign Up
            </Heading>
            <FormControl mt={3} w={{ sm: "100%", md: "140%", lg: "140%" }}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
            </FormControl>

            <FormControl
              mt={3}
              mb={15}
              w={{ sm: "100%", md: "140%", lg: "140%" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
            </FormControl>

            <Button width="full" top={"1rem"} onClick={register}>
              Submit
            </Button>
          </form>
        </VStack>
      </Center>
    </div>
  );
}

export default SignUp;
