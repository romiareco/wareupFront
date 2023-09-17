import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import WULogo from "../../../assets/official-images/logo.png";

export function LogoAvatar({width}) {
  return (
    <Stack direction="row">
      <Avatar
        src={WULogo}
        alt="Ware Up"
        size="large"
        sx={{
          width: width,
          height: "auto",
        }}
        cover="true"
        variant="square"
      ></Avatar>
    </Stack>
  );
}
