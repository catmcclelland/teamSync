import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import TeamModal from "../TeamModal";
import Card from "../Card";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import firebase from "firebase/compat/app";

function Dashboard({ logout, user }) {
  const [employees, setEmployees] = useState(null);

  const dbRef = ref(getDatabase());

  const uid = user?.uid;

  useEffect(() => {}, [employees]);

  const getEmployees = () => {
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmployees(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getEmployees();
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
        getEmployees();
        console.log("data updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <Flex
        className="content"
        direction={"column"}
        justifyContent="center"
        alignItems="center">
        <Text>
          Hello, {user?.email}!<br />
        </Text>

        <TeamModal
          employees={employees}
          setEmployees={setEmployees}
          getEmployees={getEmployees}
        />
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
                index={Object.keys(employees).indexOf(id)}
                employees={employees}
              />
            );
          })}
      </Flex>
    </main>
  );
}

export default Dashboard;
