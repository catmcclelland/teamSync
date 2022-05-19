import React, { useEffect, useState } from "react";
import { Flex, useColorModeValue, VStack, HStack } from "@chakra-ui/react";
import "simple-rate-limiter";
import NewsBox from "./NewsBox";
import WeatherBox from "./WeatherBox";
import { Carousel } from "./Carousel";

function Card(props) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [newsArray, setNewsArray] = useState([]);
  const [weatherArray, setWeatherArray] = useState([]);
  const [forecast, setForecast] = useState([]);
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const date = yesterday.toISOString().split("T")[0];
    const options = {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
      },
    };

    setTimeout(() => {
      fetch(
        `https://api.newscatcherapi.com/v2/search?q=${props.location}&lang=en&ranked_only=true&sort_by=rank&search_in=title`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const boxes = [];
          data.articles.map((item) => {
            if (item.media && boxes.length < 10) {
              boxes.push(item);
            }
          });
          setNewsArray([...boxes]);
          window.localStorage.setItem("newsArray", JSON.stringify([...boxes]));
        })

        .catch((e) => console.log("error", e));
    }, 1002 * props.index);
  }, []);

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${props.location}`
    )
      .then((response) => response.json())
      .then((data) => {
        const boxes = [];
        boxes.push(data);
        setWeatherArray([...boxes]);
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${props.location}&alerts=yes`
    )
      .then((response) => response.json())
      .then((data) => {
        const boxes = [];
        data.alerts?.alert.map((alert) => {
          if (alert.category) {
            boxes.push(alert);
          }
        });
        setForecast([...boxes]);
      });
  }, []);

  return (
    <section>
      <Flex
        width={{ base: "95vw", sm: "md", md: "lg", lg: "xl" }}
        bg={useColorModeValue(
          "rgba(249, 250, 251, .25)",
          "rgba( 69, 84, 112, .25 )"
        )}
        borderRadius={"1rem"}
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) "
        backdropFilter="blur(4px)"
        border="1px solid rgba( 255, 255, 255, 0.18 )"
        my=".75rem"
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Flex direction="column" justifyContent="center" alignItems="center">
          <WeatherBox
            city={weatherArray[0]?.location?.name}
            state={weatherArray[0]?.location?.region}
            time={weatherArray[0]?.location?.localtime.split(" ")[1]}
            temp={weatherArray[0]?.current?.temp_f}
            condition={weatherArray[0]?.current?.condition.text}
            icon={weatherArray[0]?.current?.condition.icon}
            alert={forecast[0]?.event}
            name={props.name}
            role={props.role}
            firstName={props.firstName}
            lastName={props.lastName}
            location={props.location}
            employeeId={props.employeeId}
            onSubmit={props.onSubmit}
            onDelete={props.onDelete}
            employees={props.employees}
          />
          <Carousel length={newsArray.length} newsArray={newsArray} />
        </Flex>
      </Flex>
    </section>
  );
}

export default Card;
