import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import instance from "../../utils/instance";

const SignUp = ({ setRender }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [admin, setAdmin] = useState(false);
  const handleSubmit = async () => {
    if (name && email && password) {
      await instance
        .post("users", {
          name: name,
          email: email,
          password: password,
          admin: admin,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <FormControl width={{base: '50vw', sm: '20vw'}}>
      <FormLabel fontSize={"2x2"}>Name</FormLabel>
      <Input
        marginBottom={'20px'}
        type={"text"}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormLabel fontSize={"2x2"}>Email</FormLabel>
      <Input
        marginBottom={'20px'}
        type={"email"}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormLabel fontSize={"2x2"}>Password</FormLabel>
      <Input
        marginBottom={'20px'}
        type={"password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div>
        <FormLabel fontSize={"2x2"} htmlFor="admin" mb="0">
          Admin
        </FormLabel>
        <Switch colorScheme={'teal'} id="admin" onChange={(e) => setAdmin(!admin)} />
      </div>

      <ButtonGroup>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
        <Button mt={4} onClick={() => setRender(true)}>
          Login
        </Button>
      </ButtonGroup>
    </FormControl>
  );
};

export default SignUp;
