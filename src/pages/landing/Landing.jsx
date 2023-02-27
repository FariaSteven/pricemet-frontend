import { Card, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Login from "../../components/login/Login";
import SignUp from "../../components/signup/SignUp";
import instance from "../../utils/instance";

const Landing = () => {
  const [users, setUsers] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState();
  const [render, setRender] = useState(true);
  const [enter, setEnter] = useState();
  useEffect(() => {
    instance.get("users").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    const findEmail = users?.find((userEmail) => userEmail?.email === email);
    const findPassword = users?.find(
      (userPassword) => userPassword?.password === password
    );
    if (!!findEmail && !!findPassword) {
      setLogin(findEmail);
    }
  }, [email, password]);

  return (
    <Stack height={'100vh'} justify={'center'} alignItems={'center'}>
      {render ? (
        <Card padding={'5'}>
        <Login
          setRender={setRender}
          setEmail={setEmail}
          setPassword={setPassword}
          login={login}
          password={password}
          render={render}
        /></Card>
      ) : (
        <Card padding={'5'}><SignUp setRender={setRender} /></Card>
      )}
    </Stack>
  );
};

export default Landing;
