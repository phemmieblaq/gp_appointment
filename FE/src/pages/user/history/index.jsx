import React, { useEffect, useState } from "react";
import {
  Body,
  Bottom,
  DoubleGridWrapper,
  Form,
  OrText,
  OrWrapper,
  QuestionWrap,
  ContainerWrapper,
  BtnHolder,
} from "./styles";
import { InputWithLabel } from "../../../components/input";
import { HeadText, TextsWithLink } from "../../../components/texts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthLayout from "../../../container/authLayout";
import NumberInput from "../../../components/input/phoneNumberInput";
import { medicalHistorySchema } from "./schema";
import CalendarIcon from "../../../assets/svg/Calendar.svg";
import DropDownInput from "../../../components/input/dropDownInput";
import Button from "../../../components/mainButton";
import {
  addUserHistory,
  getUserHistory,
  registerUser,
  saveUserHistory,
  updateUserHistory,
} from "../../../services/api"; // Add saveUserHistory import
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/Slices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MedicalHistory = () => {
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const [date, setDate] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(medicalHistorySchema),
  });

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await getUserHistory(loginInfo?.userId);
        if (response.data) {
          setInitialValues(response.data);
          console.log(response.data?.data?.sugarLevel);
          setValue("sugar_level", response?.data?.data?.sugar_level, {
            shouldValidate: true,
          });
          setValue("blood_pressure", response?.data?.data?.blood_pressure, {
            shouldValidate: true,
          });
          setValue("allergies", response?.data?.data?.allergies, {
            shouldValidate: true,
          });
          setValue("last_medication", response?.data?.data?.last_medication, {
            shouldValidate: true,
          });
          setValue("genotype", response?.data?.data?.genotype, {
            shouldValidate: true,
          });
          setValue("blood_group", response?.data?.data?.blood_group, {
            shouldValidate: true,
          });
          setValue(
            "vaccination_history",
            response?.data?.data?.vaccination_history,
            {
              shouldValidate: true,
            }
          );
          setValue("smoking_status", response?.data?.data?.smoking_status, {
            shouldValidate: true,
          });
          setValue(
            "alcohol_consumption",
            response?.data?.data?.alcohol_consumption,
            {
              shouldValidate: true,
            }
          );
          setValue(
            "current_medications",
            response?.data?.data?.current_medications,
            {
              shouldValidate: true,
            }
          );
          setValue(
            "immunization_status",
            response?.data?.data?.immunization_status,
            {
              shouldValidate: true,
            }
          );
        }
      } catch (error) {
        console.log("Error fetching user history:", error);
        toast.error("Error fetching user history");
      }
    };
    fetchUserHistory();
  }, [setValue]);

  const submitForm = async (data) => {
    try {
      // Save user history
      const historyData = {
        sugar_level: data.sugar_level,
        blood_pressure: data.blood_pressure,
        allergies: data.allergies,
        last_medication: data.last_medication,
        genotype: data.genotype,
        blood_group: data.blood_group,
        vaccination_history: data.vaccination_history,
        smoking_status: data.smoking_status,
        alcohol_consumption: data.alcohol_consumption,
        current_medications: data.current_medications,
        immunization_status: data.immunization_status,
      };
      if (initialValues) {
        const response = await updateUserHistory(
          historyData,
          initialValues?.data?.history_id,
          initialValues?.data?.user_id
        );
        toast.success(response?.data?.message);
      } else {
        const response = await addUserHistory(historyData);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log("Error registering user:", error);
      toast.error("Error registering user");
    }
  };
  console.log("result", initialValues);

  return (
    <ContainerWrapper>
      <Form onSubmit={handleSubmit(submitForm)}>
        <HeadText
          title="Medical Information"
          body="Please provide information required to save medical information"
          align="flex-start"
          margintop="8px"
        />
        <Body>
          <div>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your sugar level"
                label="Sugar Level"
                type="text"
                name="sugar_level"
                register={register}
                errorMessage={errors.sugar_level?.message}
              />
              <InputWithLabel
                placeholder="Enter your blood pressure"
                label="Blood Pressure"
                type="text"
                name="blood_pressure"
                register={register}
                errorMessage={errors.blood_pressure?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your allergies"
                label="Allergies"
                type="text"
                name="allergies"
                register={register}
                errorMessage={errors.allergies?.message}
              />
              <InputWithLabel
                placeholder="Enter your last medication"
                label="Last Medication"
                type="text"
                name="last_medication"
                register={register}
                errorMessage={errors.last_medication?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your genotype"
                label="Genotype"
                type="text"
                name="genotype"
                register={register}
                errorMessage={errors.genotype?.message}
              />
              <InputWithLabel
                placeholder="Enter your blood group"
                label="Blood Group"
                type="text"
                name="blood_group"
                register={register}
                errorMessage={errors.blood_group?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                label="Smoking Status"
                type="checkbox"
                name="smoking_status"
                register={register}
              />
              <InputWithLabel
                label="Alcohol Consumption"
                type="checkbox"
                name="alcohol_consumption"
                register={register}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your vaccination history"
                label="Vaccination History"
                type="text"
                name="vaccination_history"
                register={register}
                errorMessage={errors.vaccination_history?.message}
              />

              <InputWithLabel
                placeholder="Enter your current medications"
                label="Current Medications"
                type="text"
                name="current_medications"
                register={register}
                errorMessage={errors.current_medications?.message}
              />
            </DoubleGridWrapper>
            <DoubleGridWrapper>
              <InputWithLabel
                placeholder="Enter your immunization status"
                label="Immunization Status"
                type="text"
                name="immunization_status"
                register={register}
                errorMessage={errors.immunization_status?.message}
              />
              <BtnHolder>
                <Button title="Submit" type="submit" bg_color="#3C0FBD" />
              </BtnHolder>
            </DoubleGridWrapper>
          </div>
        </Body>
      </Form>
    </ContainerWrapper>
  );
};

export default MedicalHistory;
