import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react"
import { Encryption } from "../components/rail-fence-cipher/encryption";
import { Decryption } from "../components/rail-fence-cipher/decryption";

export const RailFenceCipher: FC<{}> = () => {
    const [currentComponent, setCurrentComponent] = useState("Encryption");

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
      setCurrentComponent(newValue);
    };
  
    return (
      <Box>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Rail Fence Cipher
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
      </Box>
    );
}
