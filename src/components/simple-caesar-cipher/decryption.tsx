import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { decryptWithAscii } from "../../utils/simple-caesar-cipher/decrypt";

export const Decryption: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [shift, setShift] = useState(3);

  useEffect(() => {
    setDecryptedText(decryptWithAscii(inputText, shift));
  }, [inputText, shift]);

  return (
    <Grid container sx={{ marginTop: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          was shifted by
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
      <Grid item xs={6}>
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
    </Grid>
  );
};
