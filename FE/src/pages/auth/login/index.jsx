import React from "react";
import {
  Body,
  Bottom,
  Form,
  OrText,
  OrWrapper,
  Registration,
} from "./styles";
import { InputWithLabel } from "../../../components/input";

import  AuthLayout  from "../../../container/authLayout"
import { HeadText, TextsWithLink } from "../../../components/texts";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from "../../../components/mainButton";
import { userLoginSchema } from "./schema";
import { loginUser } from "../../../services/api";
import toast from "react-hot-toast";
import { setLoginInfo } from "../../../redux/Slices";
const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  });


  const submitForm =async (data)=>{
    const userData = {
     
      "email": data?.email,
      "password": data?.password,
      
  };
   
  try {
    const response = await loginUser(userData);
    console.log(response)

    toast.success("check your email for 6-digit OTP");
      navigate('/otp');
    //console.log('User registered successfully:', response.data);
  } catch (error) {
    toast.error(error.message);
    console.log('Error logging in user:', error);
  }
     console.log(data);

  
   
  }
  return (
    <>
      <AuthLayout >
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)} >
          <HeadText
            title="Welcome Back"
            body="Sign in to your account"
            align="flex-start"
            margintop="8px"
          />
          <Body>
            <div>
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="email"
                 register={register}
                 errorMessage={errors.email?.message}
              />

           
              <InputWithLabel
                placeholder="********"
                label="Password"
                type="password"
                rightText
                name="password"
                 register={register}
                 errorMessage={errors.password?.message}
              />
              
                <NavLink
                  to="/login/forgotpassword"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Forgot password?
                </NavLink>


                
              
               
         
            </div>
            <Button
              title='Sign in'
              //onClick={{}}
              type='submit'
              bg_color='#3C0FBD'
/>
           
          </Body>
        </Form>
        {/* <AppFeedback subProject="Sign In" /> */}
      </Registration>
      <OrWrapper>
        <hr />
        <OrText> OR </OrText>
        <hr />
      </OrWrapper>
      <Bottom>
        <TextsWithLink
          text={[
            {
              text: "Don't have an account? ",
              link: { text: "Sign Up", to: "/register" },
            },
          ]}
          // $mobileResponsive
        />
      </Bottom>
      </AuthLayout>

       
    </>
    

  );
};

export default Login;




