import { Box, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Encryption } from "../components/rsa/encryption";
import { Decryption } from "../components/rsa/decryption";
import { generateRSAKey } from "../utils/rsa";
import { BigInteger } from "big-integer";

export const RSA: FC<{}> = () => {
  const [currentComponent, setCurrentComponent] = useState("Encryption");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentComponent(newValue);
  };

  const [key, setKey] = useState<{
    e: BigInteger;
    n: BigInteger;
    d: BigInteger;
  }>();
  useEffect(() => {
    setKey(generateRSAKey(250));
  }, []);

  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        RSA
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
        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Button variant="contained">Generate Key</Button> */}
              <TextField
                id="key"
                label="Key"
                fullWidth
                sx={{ textAlign: "center" }}
                value={JSON.stringify(key)}
                // onChange={(e) => setKey(e.target.value)}
                placeholder=""
              />
            </Box>
          </Grid>
          {currentComponent === "Encryption" ? (
            <Encryption publicKey={key} />
          ) : (
            <Decryption privateKey={key} />
          )}
        </Grid>
      </Box>
    </Box>
  );
};
