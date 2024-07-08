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
import { NavLink } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from "../../../components/mainButton";
import { userLoginSchema } from "./schema";
const Login = () => {

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  });


  const submitForm =(data)=>{
    console.log(data);}
  

  return (
    <>
      <AuthLayout linkText="Sign Up" link="/register/user" question="Don't have an account?">
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




