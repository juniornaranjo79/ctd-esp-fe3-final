import React, { FC, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useForm, useFormContext } from "react-hook-form";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import PayForm from "./PayForm";
import { IComic } from "interface/comics";
import { useRouter } from "next/router";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { ICheckout } from "interface/checkout";

const steps = ["Datos personales", "Dirección entrega", "Datos de pago"];

const CustomForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      customer: {
        firstName: "",
        lastname: "",
        email: "",
      },
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
      },
      payment: {
        number: "",
        cvc: "",
        expDate: "",
        nameOnCard: "",
      },
    },
  });
  const { handleSubmit, formState, trigger } = useFormContext();
  const { isSubmitting, isValid, errors } = formState;
  const [activeStep, setActiveStep] = useState(0); // Inicia en el primer paso

  const handleNextStep = async () => {
    if (activeStep === 0) {
      const isValidFirstName = await trigger("firstName");
      const isValidLastName = await trigger("lastName");
      const isValidEmail = await trigger("email");

      if (isValidFirstName && isValidLastName && isValidEmail) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
    if (activeStep === 1) {
      // Validación y procesamiento del segundo paso
      const isValidAddress = await trigger("address");
      const isValidDepartment = await trigger("department");
      const isValidCity = await trigger("city");
      const isValidProvince = await trigger("province");
      const isValidPostalCode = await trigger("postalCode");

      if (
        isValidAddress &&
        isValidDepartment &&
        isValidCity &&
        isValidProvince &&
        isValidPostalCode
      ) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
    if (activeStep === 2) {
      // Validación y procesamiento del tercer paso
      const isValidCardNumber = await trigger("cardNumber");
      const isValidCardName = await trigger("cardName");
      const isValidDueDate = await trigger("dueDate");
      const isValidCvc = await trigger("cvc");

      if (
        isValidCardNumber &&
        isValidCardName &&
        isValidDueDate &&
        isValidCvc
      ) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Card elevation={0} sx={{ padding: "10px" }}>
        <Stepper
          activeStep={activeStep}
          sx={{ padding: "10px" }}
          alternativeLabel
        >
          {steps.map((item) => (
            <Step key={item}>
              <StepLabel>{item}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && <PersonalForm />}
          {activeStep === 1 && <AddressForm />}
          {activeStep === 2 && <PayForm />}
          <CardActions>
            {activeStep !== 0 && (
              <Button
                variant="outlined"
                size="small"
                disableElevation
                onClick={handlePreviousStep}
              >
                Anterior
              </Button>
            )}
            {activeStep !== 2 && (
              <Button
                type="submit"
                variant="contained"
                size="small"
                disableElevation
                onClick={handleNextStep}
              >
                Siguiente
              </Button>
            )}
            {activeStep === 2 && (
              <Button
                type="submit"
                variant="contained"
                size="small"
                disableElevation
                sx={{ display: activeStep === 2 ? "block" : "none" }}
                disabled={isSubmitting}
              >
                Enviar
              </Button>
            )}
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default CustomForm;
