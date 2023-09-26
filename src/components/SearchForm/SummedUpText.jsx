import React from "react";
import { Typography } from "@mui/material";

export default function SummedUpText({ totalCount }) {
    return <Typography sx={{ fontSize: 16 }}>
        合計：{totalCount}筆
    </Typography>;
}