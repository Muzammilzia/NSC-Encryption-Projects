import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Encryption } from "../components/vigenere-ciphere/encryption";
import { Decryption } from "../components/vigenere-ciphere/decryption";

export const VigenereCipher: FC = () => {
  const [currentComponent, setCurrentComponent] = useState("Encryption");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentComponent(newValue);
  };

  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Vigenere Implementation
      </Typography>
      <Box sx={{ borderBottom: 1, marginTop: "8px" }}>
        <Tabs
          centered
          value={currentComponent}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Encryption" value="Encryption" sx={{ color: "#000" }} />
          <Tab label="Decryption" value="Decryption" sx={{ color: "#000" }} />
        </Tabs>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "0 80px" }}
      >
        {currentComponent === "Encryption" ? <Encryption /> : <Decryption />}
      </Box>
      {/* <Box
        sx={{ margin: "16px 0 0 0", display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          onClick={() =>
            window.open(
              "https://github.com/Muzammilzia/Simple-Caesar-Cipher-Implementation",
              "_blank"
            )
          }
        >
          See Source Code on Github
        </Button>
      </Box> */}
    </Box>
  );
};
