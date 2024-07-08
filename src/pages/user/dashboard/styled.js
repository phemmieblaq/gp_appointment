import styled from "styled-components";

export const Container = styled.div`
 
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 80px;
  padding: 24px 0;
   width: 100%;

  @media screen and (max-width: 700px) {
    margin: 24px;
    padding: 0;
  }
`;

export const Body = styled.div`

  padding-block: 40px;
  width: 100%;
`

export const GridContainer = styled.div`
  display: flex;
  align-items: flex-start;
 justify-content: space-between;
   width: 100%;
   margin-bottom: 60px;


  

 


  
`;

export const Header = styled.div`

  display: flex;
  flex-flow: column;
  gap: 12px;

  z-index: 2;

  p:nth-of-type(1) {
    text-transform: capitalize;
    font-size: clamp(18px, 1.8vw, 20px);
    font-weight: 600;
  }

  p:nth-of-type(2) {
    font-size: clamp(14px, 1.5vw, 16px);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;


export const SecondWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
gap:20px;
`
export const Heading = styled.h3`
font-family: Inter;
font-size: 22px;
font-weight: 600;
line-height: 26.63px;
text-align: left;
color: #000000;`


export const FlexCard = styled.div`
display: flex;
flex-direction: column;
gap:40px;
justify-content: center;

`

export const HospitalSection = styled.div`
display: flex;
flex-direction: column;
gap:20px;
width:100%;
justify-content: : center;

`

export const MappingSection = styled.div`
display: flex;
width:100%;
justify-content: space-between;
align-items: center;
`