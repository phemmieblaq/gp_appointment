import React from "react";
import { BoldText, ComingBtn, Main, ParagraphText } from "./styled";
import { useNavigate } from "react-router-dom";
import { FaGithubAlt } from "react-icons/fa";

const NotFound = ({ message }) => {
  return (
    <Main>
      <FaGithubAlt size={100} color="#263684" />

      <BoldText>{message}</BoldText>
    </Main>
  );
};

export default NotFound;
