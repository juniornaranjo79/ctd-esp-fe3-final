import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";

interface CustomTextFieldProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  control: Control<any>;
  defaultValue?: string;
  error?: boolean;
  message?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  textFieldProps?: Record<string, any>;
}

export const CustomTextField = ({
  name,
  label,
  type,
  required,
  control,
  defaultValue,
  error,
  message,
  onChange,
}: CustomTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          fullWidth
          required={required}
          error={error}
          helperText={message}
          sx={{ mb: 2 }}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e as ChangeEvent<HTMLInputElement>);
          }}
        />
      )}
    />
  );
};
