import React from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const createMemo = () => {

  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo}
        loading={false}
      >
        Create a new memo
      </LoadingButton>
    </Box>
  );
};

export default Home;
