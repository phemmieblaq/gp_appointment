import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/mainButton'
import Search from '../../../components/navbar/Search'
import MedicalCard from '../../../components/card/medicalCard'
import { cardDetails } from '../dashboard/constants'

const Explore = () => {
  return (
    <Wrapper>
            <Heading>
            <Title>Medical Centers</Title>
         
            <ButtonWrapper>
            <Button
            bg_color='#3C0FBD'
            title='Book a session'/>
            </ButtonWrapper>
            </Heading>
            <SearchWrapper>
                <Search
                placeholder='search by location'/>
            </SearchWrapper>

            <MappingSection>
            {cardDetails?.map((card, index) => (
                <MedicalCard
                key={index}
                hospitalName={card.hospitalName}
                address={card.address}
                carTime={card.carTime}
                walkDistance={card.walkDistance}
                />
            ))}
        </MappingSection>
            

        </Wrapper>
  )
}

export default Explore

const Wrapper = styled.div`
display: flex;
flex-direction : column;
gap: 16px;
//border:1px solid red;
width: 100%;

padding: 24px 80px;
flex-flow: column;

`
const Heading = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;

`
const Title = styled.h4`
font-family: Inter;
font-size: 22px;
font-weight: 600;
line-height: 26.63px;
text-align: left;
color: #000000;



`
const ButtonWrapper= styled.div`
max-width: 178px;
height:47px;

`
const SearchWrapper = styled.div`
max-width:565px;
margin-bottom: 40px;



`
const MappingSection = styled.div`
width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  row-gap: 30px;
  column-gap: 48px;
`;
