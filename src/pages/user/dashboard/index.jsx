import React from 'react'
import { Body, GridContainer,Container, Header,SecondWrapper ,Heading,FlexCard, HospitalSection, MappingSection} from './styled'
import SessionCard from '../../../components/card/sessionCard'
import CheckUpCard from '../../../components/card/checkUpCard'
import BlogCard from '../../../components/card/blogCard'
import { cardDetails } from './constants'
import MedicalCard from '../../../components/card/medicalCard'
import { useSelector } from 'react-redux'

const Home = () => {

  const loginInfo = useSelector((state) => state.user.loginInfo);
  console.log("login", loginInfo);

  return (
    <div>
        <Container>
      
        <Header>
            <p>Book your GP</p>
          <p>Trusted GP appointment booking services to support your healthcare journey.</p>

        </Header>
        <Body>
      
      <GridContainer >
    <FlexCard>
    <SessionCard/>
    <SecondWrapper>
    <Heading>
        Upcoming Appointment
        </Heading>
    <CheckUpCard/> 
    </SecondWrapper>
    </FlexCard>
    <SecondWrapper>
        <Heading>
        What's new 
        </Heading>
        <BlogCard/>

    </SecondWrapper>
    </GridContainer>
    <HospitalSection>
    <Heading>
    Medical center's near you
        </Heading>
        <MappingSection>
            {cardDetails?.slice(0,3).map((card, index) => (
                <MedicalCard
                key={index}
                hospitalName={card.hospitalName}
                address={card.address}
                carTime={card.carTime}
                walkDistance={card.walkDistance}
                />
            ))}
        </MappingSection>
    </HospitalSection>
   
      </Body>
      </Container>
 
     
    </div>
    )
    }
export default Home
