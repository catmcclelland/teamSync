import React from "react";

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
export default function Navbar({
  setLoggedIn,
  setLoginPassword,
  setLoginEmail,
  login,
  user,
  logout,
}) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center">
              <VisuallyHidden>teamSync</VisuallyHidden>
            </chakra.a>
            <Link to="/">
              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
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
                aria-label="dark mode toggle"
                marginRight={4}
                icon={<SunIcon />}
                onClick={() => toggleColorMode()}
              />

              {user ? (
                <HStack>
                  <Link to="/dashboard">
                    <Button
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
                      logout();
                    }}>
                    Logout
                  </Button>
                </HStack>
              ) : (
                <SignInModal
                  isOpen={isOpen}
                  onClose={onClose}
                  variant="ghost"
                  setLoginEmail={setLoginEmail}
                  setLoginPassword={setLoginPassword}
                  setLoggedIn={setLoggedIn}
                  login={login}
                  mobileNav={mobileNav}></SignInModal>
              )}
            </HStack>
            {!user && (
              <Link to="/sign-up">
                <Button bg="teal" size="md" color="white">
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

                {user ? (
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

                    <Button onClick={logout}>Logout</Button>
                  </VStack>
                ) : (
                  <SignInModal
                    isOpen={isOpen}
                    onClose={onClose}
                    variant="ghost"
                    setLoginEmail={setLoginEmail}
                    setLoginPassword={setLoginPassword}
                    setLoggedIn={setLoggedIn}
                    login={login}
                    mobileNav={mobileNav}></SignInModal>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
