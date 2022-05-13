import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import HeroImg from "./img/undraw.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Hero = () => {
  return (
    <Flex
      px={16}
      py={24}
      mx="auto"
      // height={"40rem"}
      maxW="7xl"
      display={{ sm: "flex" }}>
      <Image
        src={HeroImg}
        w={{ sm: "full", md: "50%" }}
        minW={"10rem"}
        marginRight={{ md: "4rem" }}
      />

      <Box
        mx="auto"
        w={{ md: 9 / 12, lg: 8 / 12, xl: 5 / 12 }}
        top={{ sm: "5rem" }}>
        <chakra.p
          mb={2}
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          color="gray.400"
          textTransform="uppercase">
          For Leaders
        </chakra.p>
        <chakra.h1
          mb={3}
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          lineHeight="shorter"
          color={useColorModeValue("gray.900", "white")}>
          Stay connected
        </chakra.h1>
        <chakra.p mb={5} color="gray.500" fontSize={{ md: "lg" }}>
          It's more important than ever to help you and your team stay
          connected. That's why we provide tools to help you stay close to your
          team - no matter how far you are.
        </chakra.p>
        <HStack>
          <Link to="/sign-up">
            <Button
              as="a"
              w={{ base: "full", sm: "auto" }}
              variant="solid"
              bg="teal"
              color="white"
              size="lg"
              mb={{ base: 2, sm: 0 }}
              cursor="pointer">
              Sign up for free
            </Button>
          </Link>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Hero;
