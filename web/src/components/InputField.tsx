import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} mt={4}>
        {label
          ? label
          : field.name.charAt(0).toUpperCase() + field.name.slice(1) + ":"}
      </FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
