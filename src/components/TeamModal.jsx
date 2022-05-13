import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

function TeamModal({ employees, setEmployees }) {
  const [teamFirstName, setTeamFirstName] = useState("");
  const [teamLastName, setTeamLastName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  function writeUserData(teamFirstName, teamLastName, role, location) {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    let tempArray = employees;
    const db = getDatabase();
    // const teamListRef = ref(db, "team");
    const fullName = `${teamFirstName} ${teamLastName}`;
    set(push(ref(db, "users/" + uid)), {
      firstName: teamFirstName,
      lastName: teamLastName,
      role: role,
      location: location,
    });
  }
  const addNewPerson = (teamFirstName, teamLastName, role, location) => {
    let personData = {
      firstName: teamFirstName,
      lastName: teamLastName,
      role: role,
      location: location,
    };
    let oldArray = employees;
    let tempArray = [];
    tempArray.push(personData);
    setEmployees(oldArray.concat(tempArray));
  };
  return (
    <Box>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        backgroundColor="teal"
        variant="solid">
        New team member
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Team Member</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setTeamFirstName("");
              setTeamLastName("");
              setRole("");
              setLocation("");
            }}
          />
          <ModalBody>
            <form>
              <VStack>
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor="first-name">First Name</FormLabel>
                    <Input
                      id="first-name"
                      type="name"
                      onChange={(e) => setTeamFirstName(e.target.value)}
                      required></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="last-name">Last Name</FormLabel>
                    <Input
                      id="last-name"
                      type="name"
                      onChange={(e) => setTeamLastName(e.target.value)}></Input>
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <Input
                    id="role"
                    type="role"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}></Input>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="location" required>
                    Location
                  </FormLabel>
                  <Input
                    id="location"
                    type="location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}></Input>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                writeUserData(teamFirstName, teamLastName, role, location);
                onClose();
                addNewPerson(teamFirstName, teamLastName, role, location);
              }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TeamModal;
