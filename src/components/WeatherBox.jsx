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
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  FaTemperatureHigh,
  FaExclamationTriangle,
  FaTrash,
} from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
import { FocusLock } from "@chakra-ui/focus-lock";

function WeatherBox(props) {
  const [teamFirstName, setTeamFirstName] = useState(props.firstName);
  const [teamLastName, setTeamLastName] = useState(props.lastName);
  const [role, setRole] = useState(props.role);
  const [location, setLocation] = useState(props.location);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const initialFocusRef = React.useRef();
  return (
    <Flex
      direction={"row"}
      width="100%"
      bg={
        // useColorModeValue("white", "gray.800")
        "transparent"
      }
      justifyContent="center"
      alignItems="center"
      my={"1rem"}>
      <Flex direction="column" width="100%">
        {/* <Flex
          direction={"row"}
          alignItems="center"
          justifyContent={"flex-end"}
          width="full"> */}
        <VStack position="absolute">
          <Popover
            isOpen={isOpen}
            // initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeonChange={false}
            m={0}>
            <PopoverTrigger>
              <EditIcon cursor="pointer" w={8} h={5} />
            </PopoverTrigger>
            <PopoverContent p={5}>
              <FocusLock returnFocus persistentFocus={false}>
                <PopoverArrow />
                <PopoverCloseButton />

                <form onCancel={onClose}>
                  <VStack>
                    <HStack>
                      <FormControl>
                        <FormLabel htmlFor="first-name">First Name</FormLabel>
                        <Input
                          id="first-name"
                          type="name"
                          defaultValue={props.firstName}
                          onChange={(e) => setTeamFirstName(e.target.value)}
                          required></Input>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="last-name">Last Name</FormLabel>
                        <Input
                          id="last-name"
                          type="name"
                          defaultValue={props.lastName}
                          onChange={(e) =>
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
                        defaultValue={props.location}
                        onChange={(e) => {
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
                        onClose();
                      }}>
                      Save
                    </Button>
                  </VStack>
                </form>
              </FocusLock>
            </PopoverContent>
          </Popover>
          <Popover>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Icon as={FaTrash} cursor="pointer" />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>
                    Are you sure you would like to delete?
                  </PopoverBody>
                  <PopoverFooter
                    border="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={4}>
                    <ButtonGroup size="sm">
                      <Button
                        colorScheme="green"
                        onClick={() => {
                          console.log("closing...");
                          onClose();
                        }}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        ref={initialFocusRef}
                        onClick={() => {
                          props.onDelete(props.employeeId);
                        }}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </>
            )}
          </Popover>
        </VStack>
        {/* end of edit/delete module, start of employee info */}

        <HStack display="absolute">
          <Flex justifyContent={"center"}>
            <VStack margin="0 auto" position="absolute">
              <Text lineHeight={"1rem"} fontSize="xl" fontWeight="500">
                {props.name}
              </Text>
              <Text lineHeight={".5rem"} fontSize="sm">
                {props.role}
              </Text>
            </VStack>
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <VStack>
              <Text lineHeight={"1rem"} fontSize="sm">
                {props.city}
              </Text>
              <Text lineHeight={".5rem"} fontSize="sm">
                {props.time}
              </Text>
            </VStack>
          </Flex>
        </HStack>

        {/* start of weather */}

        <Flex
          direction={"row"}
          justifyContent="space-around"
          alignItems="center"
          mt={"1.5rem"}>
          <HStack>
            <Icon
              as={FaTemperatureHigh}
              w={"1rem"}
              m={0}
              lineHeight={".5rem"}
            />
            <Text
              fontSize={"sm"}
              lineHeight={"1rem"}
              marginInlineStart="0"
              align="center">
              {props.temp}°F
            </Text>
          </HStack>
          <HStack>
            <Image src={props.icon} w={"1rem"} m={0} />
            <Text fontSize={"sm"} lineHeight={"1rem"} m={0} align="center">
              {props.condition}
            </Text>
          </HStack>
          {props.alert && (
            <HStack>
              <Icon as={FaExclamationTriangle} w={"1rem"} m={0} />
              <Text fontSize={"sm"} lineHeight={"1rem"} align="center">
                {props.alert}
              </Text>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default WeatherBox;
