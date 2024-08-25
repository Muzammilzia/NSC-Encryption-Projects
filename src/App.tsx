import { FC } from "react";
import "./index.css";
import {
  SimpleCaesarCipher,
  VigenereCipher,
  OneTimePadCipher,
  HillCipher,
  TranspositionCipher,
  PlayFairCipher,
  RailFenceCipher,
  RSA,
  DES,
} from "./projects";
import { Box } from "@mui/material";

const App: FC = () => {
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <SimpleCaesarCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <VigenereCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <OneTimePadCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <HillCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <TranspositionCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <PlayFairCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <RailFenceCipher />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <RSA />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <DES />
      </Box>
    </>
  );
};

export default App;
