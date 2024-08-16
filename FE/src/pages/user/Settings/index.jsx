import ProfileDetails from "../../../components/profileDetails";
import {
  DetailContainer,
  Top,
  ProfileImage,
  NameContainer,
  Frame,
  Name,
  Title,
  ButtonContainer,
  Button,
  FilledButton,
} from "./style";

import User from "../../../assets/images/user.png";
import { useSelector } from "react-redux";

export default function Personal() {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  return (
    <>
      <Top>
        <NameContainer>
          <ProfileImage>
            <img src={User} alt="user" />
          </ProfileImage>
          <Frame>
            <Name>{loginInfo?.first_name + " " + loginInfo?.last_name} </Name>
            <Title>{loginInfo?.role === "doctor" ? "Doctor" : "Patient"}</Title>
          </Frame>
        </NameContainer>

        {/* <ButtonContainer>
					<Button>Cancel</Button>
					<FilledButton>Save changes</FilledButton>
				</ButtonContainer> */}
      </Top>
      <DetailContainer>
        <ProfileDetails />
      </DetailContainer>
    </>
  );
}
