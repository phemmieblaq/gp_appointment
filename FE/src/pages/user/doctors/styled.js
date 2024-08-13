import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  padding: 24px 80px;
  width: 100%;

  @media screen and (max-width: 700px) {
    margin: 24px;
    padding: 0;
  }
`;

export const Body = styled.div`
  padding-block: 40px;
  width: 100%;
`;

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
  gap: 20px;
`;
export const Heading = styled.h3`
  font-family: Inter;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.63px;
  text-align: left;
  color: #000000;
`;

export const FlexCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
`;

export const HospitalSection = styled.div`
display: flex;
flex-direction: column;
gap:20px;
width:100%;
justify-content: : center;

`;

export const MappingSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SpecialtyWrapper = styled.div`
  border: solid red;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
`;
export const SpecialtyCard = styled.div`
  border: solid red;
  border-radius: 15px;
  padding: 16px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;
export const SpelName = styled.p``;
export const SpelDescription = styled.p`
  font-size: 14px;
`;

export const DoctorDetailsSection = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const DoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoItem = styled.div`
  font-size: 16px;
  color: #333;

  strong {
    font-weight: 600;
  }
`;

export const AppointmentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-start;
  gap: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
`;
export const TimeSlotWrapper = styled.div`
  display: flex;
  display: grid;

  grid-template-columns: repeat(4, 1fr);
`;

export const TimeSlotCard = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin: 8px;
  background-color: ${({ selected }) => (selected ? "#007bff" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#0056b3" : "#e0e0e0")};
  }
`;

export const ButtonHolder = styled.div`
  width: 200px;
`;

export const DoctorDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 8px;

  strong {
    font-weight: 600;
    color: #333;
  }
`;
