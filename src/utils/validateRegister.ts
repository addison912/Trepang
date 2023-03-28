import { ValidationError } from "apollo-server-express";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserRegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

export const validateRegister = (options: UserRegisterInput) => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      options.email.toLowerCase()
    ) === false
  ) {
    return [
      {
        field: "email",
        message: "The email address you entered is not valid.",
      },
    ];
  }

  if (options.username.length < 3) {
    return [
      {
        field: "username",
        message: "Username must be three or more characters.",
      },
    ];
  }

  if (/^[a-zA-Z0-9]/.test(options.username.toLowerCase()) === false) {
    return [
      {
        field: "username",
        message: "Username must start with a number or letter",
      },
    ];
  }

  if (
    /^[a-zA-Z0-9][a-zA-Z0-9._-]+$/.test(options.username.toLowerCase()) ===
    false
  ) {
    return [
      {
        field: "username",
        message:
          'Usernames can only contain letters, numbers, "-", "_", and "."',
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: 'Username cannot contain "@"',
      },
    ];
  }

  if (options.password.length < 8 || options.password.length > 65) {
    return [
      {
        field: "password",
        message: "Password must be between 8 and 64 characters",
      },
    ];
  }

  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/.test(
      options.password
    )
  ) {
    return [
      {
        field: "password",
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      },
    ];
  }

  return null;
};

export const checkDbRegisterErrors = (err: ValidationError) => {
  console.log(err);
  if (err.constraint === "user_email_unique") {
    return [
      {
        field: "email",
        message: "A user with this email address already exists",
      },
    ];
  }

  if (err.constraint === "user_email_unique") {
    return [
      {
        field: "username",
        message: "This username is already taken",
      },
    ];
  }

  return [
    {
      field: "user registration",
      message: err.message || err.detail,
    },
  ];
};
