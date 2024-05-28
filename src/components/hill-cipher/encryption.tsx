import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { encryptHillCipher } from "../../utils/hill-cipher";

export const Encryption: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");

  useEffect(() => {
    setEncryptedText(encryptHillCipher(inputText.toLowerCase(), key.toLowerCase()));
  }, [inputText, key]);

  return (
    <Grid container sx={{ marginTop: "20px" }}>
      <Grid item xs={12} md={7}>
        <TextField
          id="key"
          label="key"
          fullWidth
          sx={{ textAlign: "center" }}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="LEMON"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Plain Text
        </Typography>
        <TextField
          id="inputTextarea"
          label=""
          multiline
          fullWidth
          sx={{ textAlign: "center" }}
          rows={14}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          classes={{ root: "custom-text-field" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Cipher Text
        </Typography>
        <TextField
          id="outputTextarea"
          label=""
          multiline
          fullWidth
          rows={14}
          value={encryptedText}
          InputProps={{ readOnly: true }}
          placeholder="Encrypted text will appear here..."
          classes={{ root: "custom-text-field" }}
        />
      </Grid>
    </Grid>
  );
};
