import { FC } from "react";
import "./index.css";
import {
  SimpleCaesarCipher,
  VigenereCipher,
  OneTimePadCipher,
  HillCipher,
  TranspositionCipher,
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
    </>
  );
};

export default App;
