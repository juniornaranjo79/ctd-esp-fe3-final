import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import { CustomTextField } from "./input/CustomTextField";

const AddressForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Container>
        <CustomTextField
          name="address"
          label="Dirección"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.address}
          message={errors.address?.message as string}
        />
        <CustomTextField
          name="department"
          label="Departamento"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.department}
          message={errors.department?.message as string}
        />
        <CustomTextField
          name="city"
          label="Ciudad"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.city}
          message={errors.city?.message as string}
        />
        <CustomTextField
          name="province"
          label="Provincia"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.province}
          message={errors.province?.message as string}
        />
        <CustomTextField
          name="postalCode"
          label="Código postal"
          type="text"
          control={control}
          defaultValue=""
          error={!!errors.postalCode}
          message={errors.postalCode?.message as string}
        />
      </Container>
    </>
  );
};

export default AddressForm;
