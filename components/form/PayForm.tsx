import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "./input/CustomTextField";

const PayForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Container>
        <CustomTextField
          name="cardNumber"
          label="Número de tarjeta"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.cardNumber}
          message={errors.cardNumber?.message as string}
        />
        <CustomTextField
          name="cardName"
          label="Nombre como aparece en la tarjeta"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.cardName}
          message={errors.cardName?.message as string}
        />
        <CustomTextField
          name="dueDate"
          label="Fecha de expiración"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.dueDate}
          message={errors.dueDate?.message as string}
        />
        <CustomTextField
          name="cvc"
          label="Código de seguridad"
          type="password"
          control={control}
          defaultValue=""
          error={!!errors.cvc}
          message={errors.cvc?.message as string}
        />
      </Container>
    </>
  );
};

export default PayForm;
