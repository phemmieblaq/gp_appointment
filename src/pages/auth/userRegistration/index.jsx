import React, { useState } from "react";
import {
  Body,
  Bottom,
  DoubleGridWrapper,
  Form,
  OrText,
  OrWrapper,
  QuestionWrap,
  Registration,
} from "./styles";
import { InputWithLabel, TagInputWithSearch } from "../../../components/input";
import { HeadText, TextsWithLink } from "../../../components/texts";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import  AuthLayout  from "../../../container/authLayout"
import NumberInput from "../../../components/input/phoneNumberInput";
import { userRegistrationSchema } from './schema'
import  CalendarIcon from '../../../assets/svg/Calendar.svg'
import DropDownInput from "../../../components/input/dropDownInput";
import Button from "../../../components/mainButton";
const UserRegistration = () => {

  const [date, setDate] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });


  const handleDate = (e) => {
    const value = e.target.value;
    setDate(value);
    setValue("dateOfBirth", date, { shouldValidate: true });

  };
  const handleNumberChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Genderqueer",
    "Genderfluid",
    "Transgender",
    "Intersex",
    "Prefer not to say",
   
  ];
  const submitForm =(data)=>{
    console.log(data);}


  return (
    <AuthLayout
      register={true}
      linkText="Sign In"
      link="/login"
      question="Already have an account?"
    >
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)} >
          <HeadText
            title="Create an account"
            body="Please provide information required to create an account"
            align="flex-start"
            margintop="8px"
            
          />
          <Body>
            <div>
              <DoubleGridWrapper>
                <InputWithLabel
                  placeholder="Enter your first name"
                  label="First name"
                  type="text"
                  name="first_name"
                   register={register}
                   errorMessage={errors.first_name?.message}
                />
                <InputWithLabel
                  placeholder="Enter your last name"
                  label="Last name"
                  type="text"
                  name="last_name"
                  register={register}
                  errorMessage={errors.last_name?.message}
                />


              </DoubleGridWrapper>

              <InputWithLabel
                leftIcon={CalendarIcon}
                label='Date of Birth'
                type='date'
                name="dateOfBirth"
                onChange={handleDate}       
                errorMessage={errors.dateOfBirth?.message}/>

              

              
              <InputWithLabel
                placeholder="Enter your email address"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
              <NumberInput
                placeholder="Phone number"
                label="Phone Number"
                name="phone"
                type="number"
                onChange={handleNumberChange}
                register={register}
                errorMessage={errors.phone?.message}
              />
              <InputWithLabel
                placeholder="Min. of 6 characters"
                label="Password"
                type="password"
                rightText
                name="password"
                register={register}
                errorMessage={errors.password?.message}
              />

              <DropDownInput
              label ="Gender"
              OptionValues={genderOptions}
              register={register}
              name='gender'
              />

              <DoubleGridWrapper>
                <InputWithLabel
              
                  label="county"
                  type="text"
                  name="first_name"
                   register={register}
                   errorMessage={errors.first_name?.message}
                />
                <InputWithLabel
                  placeholder=""
                  label="Last name"
                  type="text"
                  name="last_name"
                  register={register}
                  errorMessage={errors.last_name?.message}
                />


              </DoubleGridWrapper>
             

              
            </div>
            <TextsWithLink
              text={[
                {
                  text: "By creating an account , you agree to Crade's",
                  link: {
                    text: "Privacy Policy",
                    to: "",
                  },
                  action: () => window.open("https://policy.sidebrief.com/privacy", "_blank"),
                },
                {
                  text: "&",
                  link: {
                    text: "Terms of Use.",
                    to: "",
                  },
                  action: () => window.open("https://policy.sidebrief.com/terms", "_blank"),
                },
              ]}
            />

            
            <QuestionWrap>
              <TextsWithLink
                text={[
                  {
                    text: "Have an account? ",
                    link: { text: "Sign In", to: "/signin" },
                  },
                ]}
                // $mobileResponsive
              />
            </QuestionWrap> 
              <Button
              title='Create an account'
              //onClick={{}}
              type='submit'
              bg_color='#3C0FBD'
/>
          </Body>
        </Form>
        {/* <AppFeedback subProject="User registration" /> */}
      </Registration>

      <OrWrapper>
        <hr />
        <OrText> OR </OrText>
        <hr />
      </OrWrapper>
      <Bottom>
        
     
       
      </Bottom>
    </AuthLayout>
  );
};

export default UserRegistration;
