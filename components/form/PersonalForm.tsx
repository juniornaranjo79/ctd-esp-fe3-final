import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "./input/CustomTextField";

const PersonalForm = () => {
  const {
    control,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <>
      <Container>
        <CustomTextField
          name="firstName"
          label="Nombre"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.firstName}
          message={errors.firstName?.message as string}
          onChange={async () => {
            trigger("firstName");
          }}
        />
        <CustomTextField
          name="lastName"
          label="Apellido"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.lastName}
          message={errors.lastName?.message as string}
          onChange={async () => {
            trigger("lastName");
          }}
        />
        <CustomTextField
          name="email"
          label="Correo electrónico"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.email}
          message={errors.email?.message as string}
          onChange={async () => {
            trigger("email");
          }}
        />
      </Container>
    </>
  );
};

export default PersonalForm;
