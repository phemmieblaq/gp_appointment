import React from "react";
import { Background, ModalContent, ModalWrapper } from "./style";

const GeneralModal = ({ children }) => {
  return (
    <>
      <Background>
        <ModalWrapper>
          <ModalContent>{children}</ModalContent>
        </ModalWrapper>
      </Background>
    </>
  );
};
export default GeneralModal;
