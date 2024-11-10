import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  encodeRSA,
  encryptRSA,
} from "../../utils/rsa";
import { BigInteger } from "big-integer";

interface EncryptionProps {
  publicKey?: {
    e: BigInteger;
    n: BigInteger;
    d: BigInteger;
  };
}
export const Encryption: React.FC<EncryptionProps> = ({ publicKey }) => {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");

  useEffect(() => {
    if (publicKey && publicKey.n && publicKey.e) {
      setEncryptedText(
        String(encryptRSA(encodeRSA(inputText), publicKey?.n!, publicKey?.e!))
      );
    }
  }, [inputText, publicKey]);

  return (
    <>
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
    </>
  );
};
