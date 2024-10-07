import React from 'react'
import styled from 'styled-components'
import medicals from '../../assets/images/medicals.png'
import car from '../../assets/svg/car.svg'
import walk from '../../assets/svg/walk.svg'

const MedicalCard = ({hospitalName='St Thomas Hospital',
  address='Westminster Bridge Rd, London England',carTime='10 mins',walkDistance='115km'
}) => {
  return (
    <div>
      <Wrapper>
            <ImageWrapper>
                <img src={medicals} alt="" />
            </ImageWrapper>
            <LowerContainer>
            <Heading>
            {hospitalName}
        </Heading>
        <Address>
        {address}
        </Address>

        <DateWrapper>
            <TimeWrapper>
                <img src={car} alt="calendar" />
                <Time>{carTime}</Time>


            </TimeWrapper>

            <TimeWrapper>
                <img src={walk} alt="clock" />
                <Time>{walkDistance}</Time>
                

            </TimeWrapper>

        </DateWrapper>
<LowerWrapper>
  <InnerText>
  Open 24 hours
  </InnerText>
</LowerWrapper>

            </LowerContainer>
            </Wrapper>
      
    </div>
  )
}

export default MedicalCard
const Wrapper = styled.div`
max-width: 300px;



display: flex;
flex-direction: column;
justify-content: center;
border-radius: 8px
border: 1px solid red;
box-shadow: 0px 2px 4px -1px #0000001A;




`
const ImageWrapper = styled.div`
width: 100%;
max-height: 230px;

`
const Heading = styled.h3`
font-family: Inter;
font-size: 18px;
font-weight: 500;
line-height: 21.78px;
text-align: left;
color: #292D32;
margin-bottom: 8px;
`;

const LowerContainer = styled.div`
width: 100%;

padding:24px;`

const Address = styled.p`
font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 19.36px;
text-align: left;
margin-bottom: 16px;

`
const DateWrapper = styled.div`
display:flex;
max-width:215px;
align-items: center;
justify-content: space-between;
`
const TimeWrapper = styled.div`
display:flex;
gap:8px;
align-items: center;
justify-content: center;
`

const Time = styled.h4`
font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 14.52px;
text-align: left;
`
const LowerWrapper = styled.div`
max-width: 100px;
display: flex;

padding: 4px 8px 4px 8px;
gap: 8px;
border-radius: 4px 
background-color:red;

color:#16A53E;


`
const InnerText = styled.p`
font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 14.52px;
text-align: left;

`