import React, { useEffect, useState } from "react";
import { Flex, Box, VStack } from "@chakra-ui/react";
import TeamModal from "../TeamModal";
import Card from "../Card";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";

function Dashboard({ logout, user }) {
  const [employees, setEmployees] = useState(null);

  const dbRef = ref(getDatabase());

  const uid = user?.uid;
  const tempArray = [];

  useEffect(() => {
    // if (!uid) return;
    // console.log(employees && Object.keys(employees));
    // const auth = getAuth();
    // const user = auth.currentUser;
    // const uid = user?.uid;

    // const tempArray = [];
    console.log(employees);
  }, [employees]);

  get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (!employees) setEmployees(snapshot.val());
        // Object.keys(snapshot.val()).forEach((key, index) => {
        //   const request = snapshot.val()[key];

        //   let personData = {
        //     firstName: request.firstName,
        //     lastName: request.lastName,
        //     location: request.location,
        //     role: request.role,
        //     key: Object.keys(snapshot.val())[index],
        //     index: index,
        //   };

        // tempArray.push(personData);
        // });
        // setEmployees(tempArray);
        // console.log("employees", employees);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleSubmit = async (
    data,
    teamFirstName,
    teamLastName,
    role,
    location
  ) => {
    console.log(teamFirstName, teamLastName, role, location);
    const db = getDatabase();
    update(ref(db), {
      [`/users/${uid}/${data}`]: {
        firstName: teamFirstName,
        lastName: teamLastName,
        role,
        location,
      },
    });
  };

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
    <Flex className="content" direction={"column"} alignContent="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        m={"1rem"}
        direction="column">
        <Flex
          direction="column"
          px={50}
          alignItems="items-start"
          borderRadius={"1rem"}
          minWidth={"1400px"}>
          Hello, {user?.email}!<br />
          <br></br>
          <TeamModal
            employees={employees}
            setEmployees={setEmployees}
            alignSelf="flex-start"
          />
        </Flex>

        {employees &&
          Object.keys(employees)?.length &&
          Object.keys(employees).map((id) => {
            const employee = employees[id];
            return (
              <Card
                name={employee?.firstName + " " + employee?.lastName}
                role={employee?.role}
                location={employee?.location}
                key={id}
                firstName={employee?.firstName}
                lastName={employee?.lastName}
                employeeId={id}
                onSubmit={handleSubmit}
              />
            );
          })}
      </Flex>
    </Flex>
  );
}

export default Dashboard;
