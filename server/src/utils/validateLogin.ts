import { InputType, Field } from "type-graphql";

@InputType()
export class UserLoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

export const loginErrors = (options: UserLoginInput) => {
  let errors = [];
  if (options.username === "") {
    errors.push({
      field: "username",
      message: "Please enter your username",
    });
  }

  if (options.password === "") {
    errors.push({
      field: "password",
      message: "Please enter your password",
    });
  }
  if (errors.length > 0) {
    return errors;
  }
  return;
};
