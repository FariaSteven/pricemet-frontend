import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const Login = ({
  setRender,
  setEmail,
  setPassword,
  login,
  password,
  render,
}) => {
  console.log("emailLOGIN", !!login);
  console.log("passwordLOGIN", password);

  const handleSubmit = () => {
    if (!!login && !!password) {
      localStorage.setItem("name", login?.name);
      localStorage.setItem("email", login?.email);
      localStorage.setItem("admin", login?.admin);
      window.location.reload();
    }
  };
  return (
    <FormControl maxW={"300"}>
      <FormLabel fontSize={"2x2"}>Email</FormLabel>
      <Input
        marginBottom={'30px'}
        type={"email"}
        placeholder="Email"
        required
        autoComplete="false"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormLabel fontSize={"2x2"}>Password</FormLabel>
      <Input
        type={"password"}
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonGroup>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button mt={4} onClick={() => setRender(false)}>
          SignUp
        </Button>
      </ButtonGroup>
    </FormControl>
  );
};

export default Login;
