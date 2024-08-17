import React from "react";
import AuthLayout from "../../../container/authLayout";
import { Body, Form, Registration } from "../../auth/userRegistration/styles";
import { HeadText } from "../../../components/texts";

import { yupResolver } from "@hookform/resolvers/yup";
import { InputWithLabel } from "../../../components/input";
import { useForm } from "react-hook-form";
import Button from "../../../components/mainButton";
import {
  resetPassword,
  verifyOTP,
  verifyPasswordOTP,
} from "../../../services/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginInfo } from "../../../redux/Slices";
import { passwordSchema } from "../login/schema";

const ResetPassword = () => {
  const navigate = useNavigate();

  const submitForm = async (data) => {
    const requiredData = {
      newPassword: data.newPassword,
    };
    try {
      const response = await resetPassword(requiredData);
      toast.success(response?.data?.message);
      navigate("/signin");
    } catch (error) {
      toast.error(error.message);
      console.log("invalid otp:", error);
    }
    console.log(data);
  };

  const LoginInfo = useSelector((state) => state.user.LoginInfo);
  console.log(LoginInfo);

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  return (
    <AuthLayout>
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)}>
          <HeadText
            title="Reset Password"
            body={"Provide a new password"}
            align="flex-start"
            margintop="8px"
          />
          <Body>
            <InputWithLabel
              placeholder="********"
              label="Password"
              type="password"
              rightText
              name="newPassword"
              register={register}
              errorMessage={errors.newPassword?.message}
            />
            <Button title="Verify email" type="submit" bg_color="#3C0FBD" />
          </Body>
        </Form>
      </Registration>
    </AuthLayout>
  );
};

export default ResetPassword;
