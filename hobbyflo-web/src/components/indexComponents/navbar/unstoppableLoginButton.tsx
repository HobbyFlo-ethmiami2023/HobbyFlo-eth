import React from "react";
import UAuth from "@uauth/js";

export const UnstoppableLoginButton = () => {
  const uauth = new UAuth({
    clientID: "a0ee8e9c-91ef-48ad-b9ff-14b3610bcb75",
    redirectUri: "http://localhost:3001",
    scope: "openid wallet messaging:notifications:optional",
  });

  const login = () => {
    uauth.loginWithPopup().then((authorization) => {
      console.log(authorization);
    });
  };

  return (
    <>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </>
  );
};
