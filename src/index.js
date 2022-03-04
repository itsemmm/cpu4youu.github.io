import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import { Anchor } from "ual-anchor";
// import { Wax } from "@eosdacio/ual-wax";
import { Wax } from "../node_modules/@deraxyna/ual-wax/dist";

const myChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.greymass.com",
      port: "443",
    },
  ],
};

// const myChain = {
//   chainId: "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
//   rpcEndpoints: [
//     {
//       protocol: "https",
//       host: "testnet.wax.eosdetroit.io",
//       port: "443",
//     },
//   ],
// };

const anchor = new Anchor([myChain], { appName: "cpu4" });
const wax = new Wax([myChain], { appName: "cpu4" });

const MyUALConsumer = withUAL(App);

ReactDOM.render(
  <React.StrictMode>
    <UALProvider
      chains={[myChain]}
      authenticators={[anchor, wax]}
      appName={"cpu4"}
    >
      <MyUALConsumer />
    </UALProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
