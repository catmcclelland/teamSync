import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import TeamModal from "../TeamModal";
import Card from "../Card";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import firebase from "firebase/compat/app";

function Dashboard({ logout, user }) {
  const [employees, setEmployees] = useState(null);

  const dbRef = ref(getDatabase());

  const uid = user?.uid;

  useEffect(() => {}, [employees]);

  get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (!employees) setEmployees(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleSubmit = (data, teamFirstName, teamLastName, role, location) => {
    const db = getDatabase();

    const employeeData = {
      firstName: teamFirstName,
      lastName: teamLastName,
      role,
      location,
    };
    const updates = {};

    updates["/users/" + uid + "/" + data] = employeeData;

    return update(ref(db), updates)
      .then(() => {
        console.log("data updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteEmployee = (data) => {
    const db = getDatabase();

    return update(ref(db, "/users/" + uid + "/" + data), {
      firstName: null,
      lastName: null,
      role: null,
      location: null,
    })
      .then(() => {
        console.log("data updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
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
                  onDelete={deleteEmployee}
                />
              );
            })}
        </Flex>
      </Flex>
    </main>
  );
}

export default Dashboard;
