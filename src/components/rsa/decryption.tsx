import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import bigInt, { BigInteger } from "big-integer";
import { decodeRSA, decryptRSA } from "../../utils/rsa";

interface DecryptionProps {
  privateKey?: {
    e: BigInteger;
    n: BigInteger;
    d: BigInteger;
  };
}
export const Decryption: React.FC<DecryptionProps> = ({ privateKey }) => {
  const [inputText, setInputText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  useEffect(() => {
    if(privateKey && privateKey.d && privateKey.e) {
      setDecryptedText(
        decodeRSA(decryptRSA(bigInt(inputText), privateKey?.d!, privateKey?.n!))
      );
    }
  }, [inputText, privateKey]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Cipher Text
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
          placeholder="Type your encrypted text..."
          classes={{ root: "custom-text-field" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Plain Text
        </Typography>
        <TextField
          id="outputTextarea"
          label=""
          multiline
          fullWidth
          rows={14}
          value={decryptedText}
          InputProps={{ readOnly: true }}
          placeholder="Decrypted text will appear here..."
          classes={{ root: "custom-text-field" }}
        />
      </Grid>
    </>
  );
};
