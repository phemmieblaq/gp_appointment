import React from "react";
import { Body, Bottom, Form, OrText, OrWrapper, Registration } from "./styles";
import { InputWithLabel } from "../../../components/input";

import AuthLayout from "../../../container/authLayout";
import { HeadText, TextsWithLink } from "../../../components/texts";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../../components/mainButton";
import { userForgotSchema } from "./schema";
import { forgotPassword } from "../../../services/api";
import toast from "react-hot-toast";
import { setLoginInfo } from "../../../redux/Slices";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userForgotSchema),
  });

  const submitForm = async (data) => {
    const userData = {
      email: data?.email,
    };
    console.log(userData);
    try {
      const response = await forgotPassword(userData);
      console.log(response);

      toast.success(response?.data?.message);
      navigate("/otp", { state: { from: "forgot" } });
      //console.log('User registered successfully:', response.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
      console.log("Error logging in user:", error);
    }
    console.log(data);
  };
  return (
    <>
      <AuthLayout>
        <Registration>
          <Form onSubmit={handleSubmit(submitForm)}>
            <HeadText
              title="Forgot Password"
              body="Please provide your email address"
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
              </div>
              <Button title="Submit" type="submit" bg_color="#3C0FBD" />
            </Body>
          </Form>
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
                text: "Remember Password? ",
                link: { text: "Sign In", to: "/signin" },
              },
            ]}
            // $mobileResponsive
          />
        </Bottom>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
