import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;
export const Top = styled.div``;
export const Body = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 150px;
`;
export const Main = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: auto 250px;
  height: 60vh;
`;
export const Image = styled.img`
  margin-bottom: 24px;
`;
export const BoldText = styled.h3`
  color: #151717;
  font-size: 30px;
  font-weight: 700;
`;

export const ParagraphText = styled.p`
  color: #4e5152;
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  text-align: center;
`;

export const ComingBtn = styled.button`
  border: 1px solid #5c2684;
  padding: 16px 7px;
  width: 500px;
  color: #5c2684;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;
`;
