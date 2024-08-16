import React, { useEffect, useState } from "react";
import {
  Body,
  GridContainer,
  Container,
  Header,
  SecondWrapper,
  Heading,
  FlexCard,
} from "./styled";
import SessionCard from "../../../components/card/sessionCard";
import CheckUpCard from "../../../components/card/checkUpCard";
import BlogCard from "../../../components/card/blogCard";
import { useSelector } from "react-redux";
import { getAppointmentsListPatientId } from "../../../services/api";

const Home = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [eventList, setEventList] = useState([]);

  const handleFetchAppointment = async () => {
    try {
      const response = await getAppointmentsListPatientId(loginInfo?.userId);
      if (response?.status === 200) {
        setEventList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchAppointment();
  }, []);

  return (
    <div>
      <Container>
        <Header>
          <p>Book your GP</p>
          <p>
            Trusted GP appointment booking services to support your healthcare
            journey.
          </p>
        </Header>
        <Body>
          <GridContainer>
            <FlexCard>
              <SessionCard />
              <SecondWrapper>
                {eventList.length > 0 && (
                  <>
                    <Heading>Upcoming Appointment</Heading>
                    {eventList?.map((el, index) => (
                      <CheckUpCard
                        key={index}
                        reason={el?.reason}
                        address={el?.address}
                        date={el?.appointment_date.slice(0, 10)}
                        time={el?.start_time}
                      />
                    ))}
                  </>
                )}
              </SecondWrapper>
            </FlexCard>
            <SecondWrapper>
              <Heading>What's new</Heading>
              <BlogCard />
            </SecondWrapper>
          </GridContainer>
        </Body>
      </Container>
    </div>
  );
};
export default Home;
