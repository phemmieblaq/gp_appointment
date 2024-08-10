import React from 'react'
import AuthLayout from '../../../container/authLayout'
import { Body, Form, Registration } from '../../auth/userRegistration/styles'
import { HeadText } from '../../../components/texts'

import { yupResolver } from '@hookform/resolvers/yup'
import { InputWithLabel } from '../../../components/input'
import { useForm } from 'react-hook-form'
import { otpSchema } from '../booking/schema'
import Button from '../../../components/mainButton'
import { verifyOTP } from '../../../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginInfo } from '../../../redux/Slices'

const OTP = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch();

    const submitForm =async (data)=>{
        const userData = {
         
         "otp": data?.otp,
          
      };
       
      try {
        const response = await verifyOTP(userData);
        console.log(response.data)
        dispatch(setLoginInfo(response.data)); // Save user info to Redux store
        toast.success("Login Succesfully");
          navigate('/dashboard');
        console.log('Login successfully:', response.data);
      } catch (error) {
        toast.error(error.message);
        console.log('invalid otp:', error);
      }
         console.log(data);
    
      
       
      }

      const LoginInfo = useSelector((state) => state.user.LoginInfo);
      console.log(LoginInfo);
    

    const {
        handleSubmit,
        register,
       
        
       
        formState: { errors },
      } = useForm({
        
        resolver: yupResolver(otpSchema),
      });
  return (
    <AuthLayout  
    >
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)} >
          <HeadText
            title="Verification"
            body="Please provide the 6-digit code sent to your email to verify and set up your account"
            align="flex-start"
            margintop="8px"
            
          />
          <Body>
          <InputWithLabel
                  placeholder="Enter the 6 digits otp"
                  label="6-didgit code "
                  type="number"
                  name="otp"
                   register={register}
                   errorMessage={errors.otp?.message}
                />     
              <Button
              title="Verify email"
              type="submit"
              bg_color="#3C0FBD"
/>
          </Body>
        </Form>
       
      </Registration>
      
      
    </AuthLayout>
  )
}

export default OTP
