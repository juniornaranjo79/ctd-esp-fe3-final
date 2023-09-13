import * as yup from "yup";

export const schema = yup.object({
  firstName: yup
    .string()
    .required("Este campo es requerido")
    .min(3, "Minimo 3 caracteres")
    .max(15, "Maximo 15 caracteres"),
  lastName: yup
    .string()
    .required("Este campo es requerido")
    .min(3, "Minimo 3 caracteres")
    .max(15, "Maximo 15 caracteres"),
  email: yup
    .string()
    .required("Este campo es requerido")
    .email("El correo no es valido")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),

  address: yup
    .string()
    .required("Este campo es requerido")
    .min(5, "Minimo 5 caracteres")
    .max(30, "Maximo 30 caracteres"),
  department: yup.string().notRequired(),
  city: yup.string().required("Este campo es requerido"),
  province: yup.string().required("Este campo es requerido"),
  postalCode: yup.string().required("Este campo es requerido"),

  cardNumber: yup
    .string()
    .required("Este campo es requerido")
    .matches(/^[0-9]{16}$/, "El número de la tarjeta debe ser de 16 dígitos"),
  cardName: yup
    .string()
    .required("El nombre como aparece en la tarjeta es requerido"),
  dueDate: yup
    .string()
    .required("Este campo es requerido")
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Inválido (MM/YY)"),
  cvc: yup
    .string()
    .required("Este campo es requerido")
    .matches(
      /^[0-9]{3}$/,
      "El el codigo cvc de la tarjeta debe ser de 3 dígitos"
    ),
});
