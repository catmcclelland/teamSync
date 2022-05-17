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

  //   const slides = [
  //     {
  //       img: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //       label: "First Slide",
  //       description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  //     },
  //     {
  //       img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //       label: "Second Slide",
  //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     },
  //     {
  //       img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  //       label: "Third Slide",
  //       description:
  //         "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  //     },
  //     {
  //       img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //       label: "Fourth Slide",
  //       description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  //     },
  //     {
  //       img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //       label: "Fifth Slide",
  //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     },
  //   ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = props.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
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
          {props.newsArray.map((slide, sid) => (
            <Link href={slide.link} target="_blank">
              <Box
                key={`slide-${sid}`}
                boxSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                shadow="md"
                flex="none">
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0">
                  {sid + 1} / {slidesCount}
                </Text>

                <Image
                  src={slide.media}
                  alt="carousel image"
                  m="0 auto"
                  height="80%"
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
                  height="-webkit-fit-content"
                  background="rgba( 0, 0, 0, 0.25 )"
                  boxShadow="0 8px 32px 0 rgba( 255, 255, 135, 0.37 )"
                  backdropFilter="blur(10px)"
                  border="1px solid rgba( 255, 255, 255, 0.01 )">
                  <Box pb="1rem" px="1rem">
                    <Text fontSize="lg" fontWeight="semibold">
                      {slide.title}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Link>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", , "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={() => setSlide(slide)}></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}
