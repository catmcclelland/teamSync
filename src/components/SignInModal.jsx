import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export function SignInModal({
  setLoggedIn,
  setLoginPassword,
  setLoginEmail,
  login,
  mobileNav,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
        }}
        size="md">
        Sign in
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={login}>
              <FormControl mt={3}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={3} mb={15}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </FormControl>
              <Button
                width="full"
                top={"1rem"}
                onClick={(e) => {
                  login(e);
                  mobileNav.onClose();
                }}>
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
