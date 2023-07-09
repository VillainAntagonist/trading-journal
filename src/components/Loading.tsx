import React from "react";
import {CircularProgress} from "@mui/material";

const Loading: React.FC = () => {
    return (
          <div
              style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95vh",
                  width: "100%",
              }}
          >
                <CircularProgress size={200} />
          </div>
    );
};



export default Loading;
