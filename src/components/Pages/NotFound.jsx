import React from "react";

import {
  chakra,
  Box,
  Stack,
  Flex,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as Path } from "react-router-dom";
export default function NotFound() {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center">
      <Flex
        justify="center"
        bg={useColorModeValue("white", "gray.800")}
        w="full">
        <Box
          w={{ base: "full", md: "75%", lg: "50%" }}
          px={4}
          py={20}
          textAlign={{ base: "left", md: "center" }}>
          <chakra.span
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color={useColorModeValue("gray.900", "gray.100")}
            mb={6}>
            <chakra.span display="block">Ready to dive in?</chakra.span>
            <chakra.h1
              display="block"
              color={useColorModeValue("brand.600", "gray.500")}>
              Page not found.
            </chakra.h1>
          </chakra.span>
          <Stack
            justifyContent={{ base: "left", md: "center" }}
            direction={{ base: "column", sm: "row" }}
            spacing={2}
            mt={2}>
            <Box display="inline-flex" rounded="md" shadow="md">
              <Button
                w="full"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                color={useColorModeValue("white", "black")}
                bg={useColorModeValue("teal", "white")}
                _hover={{
                  bg: useColorModeValue("brand.700", "brand.600"),
                }}>
                <Path to="/">Home</Path>
              </Button>
            </Box>
            <Box ml={3} display="inline-flex" rounded="md" shadow="md">
              <Button
                w="full"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                color={useColorModeValue("black", "white")}
                bg={useColorModeValue("white", "teal")}
                _hover={{
                  bg: "brand.50",
                }}>
                <Path to="/dashboard">Dashboard</Path>
              </Button>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
