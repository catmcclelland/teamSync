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
  propNames,
  FormErrorMessage,
} from "@chakra-ui/react";

export function SignInModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
          console.log(props);
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
            <form onSubmit={props.login}>
              <FormControl mt={3} isInvalid={props.isEmailError[0]}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  onChange={(event) => {
                    props.setLoginEmail(event.target.value);
                  }}
                />
                {props.isEmailError[0] && (
                  <FormErrorMessage>{props.isEmailError[1]}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={3} mb={15} isInvalid={props.isPasswordError[0]}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    props.setLoginPassword(event.target.value);
                  }}
                />
                {props.isPasswordError[0] && (
                  <FormErrorMessage>
                    {props.isPasswordError[1]}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button
                width="full"
                top={"1rem"}
                onClick={(e) => {
                  props.login(e);
                  props.mobileNav.onClose();
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
