import React, { useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  chakra,
  Icon,
  VStack,
  HStack,
  Image,
  Avatar,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import {
  FaTemperatureHigh,
  FaExclamationTriangle,
  FaTrash,
} from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";

import { FocusLock } from "@chakra-ui/focus-lock";
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { getAuth } from "firebase/auth";
function WeatherBox(props) {
  const [teamFirstName, setTeamFirstName] = useState("");
  const [teamLastName, setTeamLastName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  function updateUserData(teamFirstName, teamLastName, role, location) {
    const db = getDatabase();

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const key = props.employeeId;

    console.log(user);
    const personData = {
      firstName: teamFirstName,
      lastName: teamLastName,
      role: role,
      location: location,
    };
    const newPostKey = push(child(ref(db), "users/{userKey}")).key;

    const updates = {};

    updates["/users/" + uid + "/" + key] = personData;

    return update(ref(db), updates)
      .then(() => {
        console.log("data updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box
      maxW="12rem"
      mx="auto"
      px={4}
      py={3}
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="md">
      <Flex>
        <VStack>
          <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={false}>
            <PopoverTrigger>
              <EditIcon cursor="pointer" w={8} h={5} />
            </PopoverTrigger>
            <PopoverContent p={5}>
              <FocusLock returnFocus persistentFocus={false}>
                <PopoverArrow />
                <PopoverCloseButton />

                <form firstFieldRef={firstFieldRef} onCancel={onClose}>
                  <VStack>
                    <HStack>
                      <FormControl>
                        <FormLabel htmlFor="first-name">First Name</FormLabel>
                        <Input
                          id="first-name"
                          type="name"
                          defaultValue={props.firstName}
                          onBlur={(e) => setTeamFirstName(e.target.value)}
                          required></Input>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="last-name">Last Name</FormLabel>
                        <Input
                          id="last-name"
                          type="name"
                          defaultValue={props.lastName}
                          onBlur={(e) =>
                            setTeamLastName(e.target.value)
                          }></Input>
                      </FormControl>
                    </HStack>
                    <FormControl>
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <Input
                        id="role"
                        type="role"
                        defaultValue={props.role}
                        onBlur={(e) => {
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
                        defaultValue={props.location}
                        onBlur={(e) => {
                          setLocation(e.target.value);
                        }}></Input>
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        props.onSubmit(
                          props.employeeId,
                          teamFirstName,
                          teamLastName,
                          role,
                          location
                        );
                        // updateUserData(
                        //   teamFirstName,
                        //   teamLastName,
                        //   role,
                        //   location
                        // );
                      }}>
                      Save
                    </Button>
                  </VStack>
                </form>
              </FocusLock>
            </PopoverContent>
          </Popover>
          <Icon as={FaTrash} cursor="pointer" />
        </VStack>
        <Box ml="3">
          <Text fontWeight="bold">{props.name}</Text>
          <Text fontSize="sm">{props.role}</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color={useColorModeValue("gray.800", "gray.400")}>
          {props.time}
        </chakra.span>
        <chakra.span
          bg={useColorModeValue("brand.200", "brand.300")}
          color={useColorModeValue("brand.800", "gray.400")}
          px={3}
          py={1}
          rounded="full"
          textTransform="uppercase"
          fontSize="xs">
          {props.city}
          <br />
          {props.state}
        </chakra.span>
      </Flex>

      <Flex
        fontSize="sm"
        mt={2}
        color={useColorModeValue("gray.600", "gray.300")}
        direction="column"
        alignItems="flex-start">
        <HStack>
          <Icon as={FaTemperatureHigh} w={8} />
          <Box fontSize="l">{props.temp}°F</Box>
        </HStack>
        <HStack>
          <Image src={props.icon} w={8} />
          <Box fontSize="l">{props.condition}</Box>
        </HStack>
        <HStack>
          <Icon as={FaExclamationTriangle} w={8} />
          <Box fontSize="l">{props.alert}</Box>
        </HStack>

        {/* <Icon as={faTemperatureHalf} /> */}
        {/* <chakra.h1
          fontSize="lg"
          fontWeight="bold"
          mt={2}
          color={useColorModeValue("gray.800", "white")}>
          
        </chakra.h1>
        <chakra.p
          fontSize="sm"
          mt={2}
          color={useColorModeValue("gray.600", "gray.300")}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          eligendi similique exercitationem optio libero vitae accusamus
          cupiditate laborum eos.
        </chakra.p> */}
      </Flex>
    </Box>
  );
}

export default WeatherBox;
