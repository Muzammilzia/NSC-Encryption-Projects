import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { encrypt, encryptWithAscii } from "../../utils/simple-caesar-cipher/encrypt";

export const Encryption: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [shift, setShift] = useState(3);

  useEffect(() => {
    setEncryptedText(encrypt(inputText, shift));
    setEncryptedText(encryptWithAscii(inputText, shift));
  }, [inputText, shift]);

  return (
    <Grid container sx={{ marginTop: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Shift by
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => setShift((prev) => prev - 1)}
          >
            -
          </Button>
          <Typography variant="h5" sx={{ padding: "0 16px" }}>
            {shift}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShift((prev) => prev + 1)}
          >
            +
          </Button>
        </Box>
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
