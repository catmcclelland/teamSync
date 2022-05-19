import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  Stack,
  VStack,
  Link,
} from "@chakra-ui/react";

export function Carousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  const slides = props.newsArray.map((slide, index) => {
    return {
      ...slide,
      index: index,
    };
  });
  const slidesCount = slides.length;
  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  // const setSlide = (slide) => {
  //   setCurrentSlide(slide);
  // };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      w={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
      bg={
        //   useColorModeValue("gray.200", "gray.600")
        "transparent"
      }
      p={0}
      my={"1rem"}
      alignItems="center"
      justifyContent="center">
      <Flex
        w={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
        pos="relative"
        overflow="hidden"
        borderRadius="10px">
        <Flex
          w={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
          {...carouselStyle}>
          {slides.map((slide) => (
            <Box
              key={`slide-${slide.index}`}
              boxSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
              shadow="md"
              flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0">
                {slide.index + 1} / {slidesCount}
              </Text>
              <Link href={slide.link} target="_blank">
                <Image
                  src={slide.media}
                  alt="news carousel image"
                  m="0 auto"
                  height="75%"
                  backgroundSize="cover"
                  fit="cover"
                />
                <Stack
                  pos="absolute"
                  textAlign="center"
                  bottom="0px"
                  w="full"
                  mb="0"
                  color="white"
                  height="25%"
                  background="rgba( 0, 0, 0, 0.25 )"
                  backdropFilter="blur(12px)"
                  border="1px solid rgba( 255, 255, 255, 0.01 )">
                  <Box p="1rem">
                    <Text
                      fontSize={{ base: "sm", sm: "lg", md: "lg", lg: "xl" }}>
                      {slide.title}
                    </Text>
                  </Box>
                </Stack>
              </Link>
            </Box>
          ))}
        </Flex>
        <Text
          {...arrowStyles}
          left="0"
          onClick={() => {
            prevSlide();
            console.log(slides, currentSlide);
          }}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
    </Flex>
  );
}
