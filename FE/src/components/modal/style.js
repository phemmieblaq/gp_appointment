import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
export const Text = styled.p`
  font-size: 13px;
`;

export const TableInModal = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  //margin-top: 0.1vw;
  background: #fafbfb;
`;
export const PopupImage = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`;
export const ModalWrapper = styled.div`
  background: #fff;
  border-radius: 24px;
  scroll-behavior: smooth;
  overflow-y: auto;
  max-height: 90vh;
  max-width: 1000px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;
export const Content = styled.div``;
export const Heading = styled.h3`
  font-family: "Poppins", sans-serif;
  letter-spacing: 1px;
  font-size: 20px;
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1vw;
  margin-top: 20px;
`;
export const SubText = styled.p`
  font-size: 15px;
  padding-top: 30px;
  font-family: "Poppins", sans-serif;
  padding-bottom: 15px;
`;
export const Table = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  margin-top: 1vw;
  background: #fafbfb;
`;
export const GridContainer = styled.div`
  display: flex;
`;
export const GridItems = styled.div`
  border: 1px solid #dfe2e6;
  padding: 10px;
  font-size: 11px;
  color: #2d2235;
  width: 20vw;
  display: flex;
  text-align: center;
`;
export const SubTex = styled.h4`
  font-size: 15px;
  padding-top: 30px;
  font-family: "Poppins", sans-serif;
  padding-bottom: 15px;
`;
export const Input = styled.input`
  width: 100%;
  background: whitesmoke;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: bold;
  padding: 15px;
  outline: none;
  border: none;
  height: 100px;
`;
export const ModalTexts = styled.h4`
  font-family: "Poppins", sans-serif;
  width: 300px;
  margin-top: 10px;
  text-align: center;
  padding: 15px;
  color: #2d2235;
  margin-top: 30px;
`;
export const CloseWrapper = styled.div`
  cursor: pointer;
`;
export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`;

// export const StyledModalBoby = styled(ModalBody)`
//   padding: 0;
// `;
