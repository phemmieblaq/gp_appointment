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

import User  from "../../../assets/images/user.png";

export default function Personal () {
	return (
		<>
			<Top>
				<NameContainer>
					<ProfileImage>
    <img src={User} alt="user" />
					</ProfileImage>
					<Frame>
						<Name>Abdulsalam Akinlusi</Name>
						<Title>Compliance officer</Title>
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
