import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is required field"),
});