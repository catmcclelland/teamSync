import React, { useEffect, useState } from "react";
import { Flex, useColorModeValue, VStack, HStack } from "@chakra-ui/react";

import NewsBox from "./NewsBox";
import WeatherBox from "./WeatherBox";

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

    // return (
    // setNewsArray(JSON.parse(localStorage.getItem("newsArray"))) ||
    fetch(
      `https://newsapi.org/v2/everything?q=${props.location?.replace(
        /\s/g,
        ""
      )}&searchIn=title&from=${date}&language=en&sortBy=popularity&apiKey=${API_KEY}`
    )
      // fetch(
      //   `https://untitled-2a2be96kz7xk.runkit.sh/${props.location?.replace(
      //     /\s/g,
      //     ""
      //   )}`
      // )
      .then((response) => response.json())
      .then((data) => {
        const boxes = [];
        data.articles.map((item) => {
          if (item.urlToImage && boxes.length < 3) {
            boxes.push(item);
          }
        });
        setNewsArray([...boxes]);
        window.localStorage.setItem("newsArray", JSON.stringify([...boxes]));
      })

      .catch((e) => console.log("error", e));
    // );
  }, []);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${props.location}`
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
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${props.location}&alerts=yes`
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
        bg={useColorModeValue(
          "rgba(249, 250, 251, 1)",
          "rgba( 69, 84, 112, 1 )"
        )}
        p={50}
        alignItems="center"
        justifyContent="center"
        borderRadius={"1rem"}
        my={"1rem"}
        minWidth={"2xl"}
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 ) "
        backdropFilter="blur(4px)"
        border="1px solid rgba( 255, 255, 255, 0.18 )">
        <Flex direction="column">
          <HStack>
            <VStack align="start" mr={"1rem"}>
              <WeatherBox
                city={weatherArray[0]?.location.name}
                state={weatherArray[0]?.location.region}
                time={weatherArray[0]?.location.localtime.split(" ")[1]}
                temp={weatherArray[0]?.current.temp_f}
                condition={weatherArray[0]?.current.condition.text}
                icon={weatherArray[0]?.current.condition.icon}
                alert={forecast[0]?.event}
                name={props.name}
                role={props.role}
                firstName={props.firstName}
                lastName={props.lastName}
                location={props.location}
                employeeId={props.employeeId}
                onSubmit={props.onSubmit}
                onDelete={props.onDelete}
              />
            </VStack>

            {newsArray.map((news, index) => {
              return (
                <NewsBox
                  key={index}
                  title={news.title}
                  image={news.urlToImage}
                  description={news.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  url={news.url}
                  height="100%"
                />
              );
            })}
          </HStack>
        </Flex>
      </Flex>
    </section>
  );
}

export default Card;
