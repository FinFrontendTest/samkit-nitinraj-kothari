import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Form.module.scss";
import { Row } from "../../redux/tableSlice";
import { INITIAL_VALUE } from "./constants";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Invalid Contact number")
    .required("Contact is required"),
  weekdays: yup.object().required("Select at least one weekday").shape({
    monday: yup.boolean().required(),
    tuesday: yup.boolean().required(),
    wednesday: yup.boolean().required(),
    thursday: yup.boolean().required(),
    friday: yup.boolean().required(),
  }),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of Birth is required"),
});

interface FormProps {
  onSubmit: (formData: Row) => void;
  initialValues?: Row;
}

export type FormData = Omit<Row, "id">;

const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues = INITIAL_VALUE,
}) => {
  const { id, ...defaultValues } = initialValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit({ ...data, id });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Contact"
        {...register("contact")}
        error={!!errors.contact}
        helperText={errors.contact?.message}
      />

      <FormLabel>Work Days</FormLabel>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              {...register("weekdays.monday")}
              checked={watch("weekdays.monday")}
            />
          }
          label="Monday"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("weekdays.tuesday")}
              checked={watch("weekdays.tuesday")}
            />
          }
          label="Tuesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("weekdays.wednesday")}
              checked={watch("weekdays.wednesday")}
            />
          }
          label="Wednesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("weekdays.thursday")}
              checked={watch("weekdays.thursday")}
            />
          }
          label="Thursday"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("weekdays.friday")}
              checked={watch("weekdays.friday")}
            />
          }
          label="Friday"
        />
      </div>

      <FormLabel>Gender</FormLabel>
      <div>
        <FormControlLabel
          control={
            <Radio
              {...register("gender")}
              value="Male"
              checked={watch("gender") === "Male"}
            />
          }
          label="Male"
        />
        <FormControlLabel
          control={
            <Radio
              {...register("gender")}
              value="Female"
              checked={watch("gender") === "Female"}
            />
          }
          label="Female"
        />
      </div>

      <TextField
        label="Date of Birth"
        type="date"
        {...register("dob", {
          validate: (value) => {
            const selectedDate = new Date(value);
            const currentDate = new Date();

            return (
              selectedDate <= currentDate ||
              "Date of Birth cannot be in the future"
            );
          },
        })}
        defaultValue={initialValues.dob}
        error={!!errors.dob}
        helperText={errors.dob?.message}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          max: new Date().toISOString().split("T")[0],
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
