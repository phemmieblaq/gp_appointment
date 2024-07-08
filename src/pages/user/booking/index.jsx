import React from 'react'
import styled  from 'styled-components'
import bookImage from '../../../assets/images/bookImage.png'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Header } from '../dashboard/styled';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithLabel } from '../../../components/input';
import DropDownInput from '../../../components/input/dropDownInput';
import { useState } from 'react';
import Textarea from '../../../components/input/TextArea';
const BookingForm = () => {
  const [date, setDate] = useState("");

  const handleDate = (e) => {
    const value = e.target.value;
    setDate(value);
    //setValue("date", date, { shouldValidate: true });

  };

  const {
    handleSubmit,
    register,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const Departments = [
    "General Practice (GP)",
    "Accident & Emergency (A&E)",
    "Outpatients Department",
    "Mental Health Services",
    "Maternity Services",
    "Dental Services",
    "Community Health Services",
    "Sexual Health Clinics",
    "Optometry Services",
    "Specialist Clinics",
    "Vaccination Clinics",
    "Rehabilitation Services"
]

 const inputClass = {
  "height": "200px",
  border: "1px solid black"
 }


  const submitForm =(data)=>{
    console.log(data);}
  
  return (
   
      <Wrapper>
        <LeftWrapper>
          <PrevWrapper>
            <IoIosArrowRoundBack
            color='#3C0FBD'/>
            <Previous>
               Previous
            </Previous>


            
          </PrevWrapper>
          <Header>
            <p>Book a session</p>
          <p>Please provide the required information to book an appointment.</p>

          <Form onSubmit={handleSubmit(submitForm)} >
          
        
              <InputWithLabel
               
                label="Why are you booking an appointment?"
                type="text"
                name="reasons"
               
              />

              <DropDownInput
              label ="which department do you want to book an appointment with? "
              OptionValues={Departments}
              register={register}
              name='department'
              />
              <Textarea
              inputClass={inputClass}
              maxHeight="200px"
               
               label="How do you feel? Give a description of your symptoms"
               type="text"
               name="reasons"
              
             />

                <InputWithLabel
      
                label='Date'
                type='date'
                name="date"
                onChange={handleDate}       
                errorMessage={errors.dateOfBirth?.message}/>

              



           
              {/* <InputWithLabel
                placeholder="********"
                label="Password"
                type="password"
                rightText
                name="password"
                 register={register}
                 errorMessage={errors.password?.message}
              /> */}
              
                


                
              
               
         
      
            {/* <Button
              title='Sign in'
              //onClick={{}}
              type='submit'
              bg_color='#3C0FBD'
/>
           
      */}
        </Form>

        </Header>
          


        </LeftWrapper>

        <RightWrapper>
          <Image src={bookImage} alt= 'booking' />
        </RightWrapper>

      </Wrapper>

      
   
  )
}

export default BookingForm

const Wrapper = styled.div`
width : 100%;
display : flex;
height : 100vh;
`
const LeftWrapper = styled.div`
width : 100%;
padding : 63px 119px 75px 40px;




`
const RightWrapper = styled.div`
display : flex;
justify-content : center;
align-items : center;
postion : fixed;
left : 0px;
bottom : 0px;
width : 100%
`
const Image = styled.img`
width:100%;
`
const PrevWrapper = styled.div`
display : flex;

gap:8px;
cursor : pointer;
margin-bottom :80px;

`
const Previous = styled.p`
font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 14.52px;
text-align: left;
color:#3C0FBD;
`

const Form = styled.div`
`