import React, { useState } from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { SignInModal } from "./SignInModal";
import { SunIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default function Navbar(props) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [darkMode, setDarkMode] = useState(false);
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md">
        <nav>
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              {/* <chakra.a
                href="/"  
                title="teamSync home page"
                display="flex"
                alignItems="center">
                <VisuallyHidden tabIndex={"-1"}>teamSync</VisuallyHidden>
              </chakra.a> */}
              <Link to="/">
                <chakra.h1
                  fontSize="xl"
                  fontWeight="medium"
                  ml="2"
                  // tabIndex={"0"}
                >
                  teamSync
                </chakra.h1>
              </Link>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{ base: "none", md: "inline-flex" }}>
                <IconButton
                  aria-label={
                    darkMode ? "dark mode toggle, on" : "dark mode toggle, off"
                  }
                  marginRight={4}
                  icon={<SunIcon />}
                  onClick={() => {
                    toggleColorMode();
                    setDarkMode(!darkMode);
                  }}
                />

                {props.user ? (
                  <HStack>
                    <Link to="/dashboard">
                      <Button
                        tabIndex={"-1"}
                        bg="teal"
                        size="md"
                        color="white"
                        onClick={mobileNav.onClose}>
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        mobileNav.onClose();
                        props.logout();
                      }}>
                      Logout
                    </Button>
                  </HStack>
                ) : (
                  <SignInModal
                    isOpen={isOpen}
                    onClose={onClose}
                    variant="ghost"
                    setLoginEmail={props.setLoginEmail}
                    setLoginPassword={props.setLoginPassword}
                    setLoggedIn={props.setLoggedIn}
                    login={props.login}
                    mobileNav={props.mobileNav}
                    isEmailError={props.isEmailError}
                    isPasswordError={props.isPasswordError}></SignInModal>
                )}
              </HStack>
              {!props.user && (
                <Link to="/sign-up">
                  <Button bg="teal" size="md" color="white" tabIndex={"-1"}>
                    Get Started
                  </Button>
                </Link>
              )}
              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color={useColorModeValue("gray.800", "inherit")}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={0}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                  zIndex={3}>
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />

                  {props.user ? (
                    <VStack>
                      <Link to="/dashboard">
                        <Button
                          bg="teal"
                          size="md"
                          color="white"
                          onClick={mobileNav.onClose}>
                          Dashboard
                        </Button>
                      </Link>

                      <Button onClick={props.logout}>Logout</Button>
                    </VStack>
                  ) : (
                    <SignInModal
                      isOpen={isOpen}
                      onClose={onClose}
                      variant="ghost"
                      setLoginEmail={props.setLoginEmail}
                      setLoginPassword={props.setLoginPassword}
                      setLoggedIn={props.setLoggedIn}
                      login={props.login}
                      mobileNav={mobileNav}
                      isEmailError={props.isEmailError}
                      isPasswordError={props.isPasswordError}></SignInModal>
                  )}
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </nav>
      </chakra.header>
    </React.Fragment>
  );
}
