import React, { useState } from "react";
import UAuth from "@uauth/js";
import { log } from "console";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const UnstoppableLoginButton = () => {
  const uauth = new UAuth({
    clientID: "a0ee8e9c-91ef-48ad-b9ff-14b3610bcb75",
    redirectUri: "https://hobby-flo.vercel.app",
    scope: "openid wallet messaging:notifications:optional",
  });

  const [isUdConnected, setIsUdConneted] = useState(false);
  const [udAddress, setUdAddress] = useState("");

  const { isConnected, address } = useAccount();

  const login = () => {
    uauth.loginWithPopup().then((authorization) => {
      console.log(authorization);
      setIsUdConneted(true);
      setUdAddress(authorization.idToken.wallet_address || "");
    });
  };

  const logout = () => {
    setUdAddress("");
    uauth.logout();
    setIsUdConneted(false);
  };

  return (
    <>
      <div className="flex">
        {isUdConnected && (
          <div className="flex">
            <p className="mx-1  bg-orange-400 text-white px-4 py-2 rounded-xl font-bold">
              {udAddress.substring(0, 6)}...{udAddress.slice(-6)}
            </p>
            <button
              onClick={logout}
              className="mx-6  bg-[#0e76fd] text-white px-4 py-2 rounded-xl font-bold"
            >
              Logout
            </button>
          </div>
        )}
        {!isUdConnected && (
          <>
            {!address && (
              <button
                onClick={login}
                className="mx-6  bg-[#0e76fd] text-white px-4 py-2 rounded-xl font-bold"
              >
                Sign In with Unstoppable
              </button>
            )}
            <ConnectButton label="Sign In" />
          </>
        )}
      </div>
    </>
  );
};
