import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

function NewsBox(props) {
  return (
    <Link href={props.url} _hover={{}} target="_blank" rel="noopener">
      <Box
        maxW="xs"
        minW="xs"
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        mr={"1rem"}>
        <Box px={4} py={2} height="14rem">
          <chakra.h2
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            fontSize="xl">
            {props.title.split("-")[0]}
          </chakra.h2>
          <chakra.p
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}>
            {props.description}
          </chakra.p>
        </Box>

        <Image
          h={48}
          w="full"
          fit="cover"
          display={{ sm: "hidden" }}
          mt={2}
          src={props.image}
          alt="NIKE AIR"
        />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg={useColorModeValue("white", "gray.800")}
          roundedBottom="lg"></Flex>
      </Box>
    </Link>
  );
}

export default NewsBox;
