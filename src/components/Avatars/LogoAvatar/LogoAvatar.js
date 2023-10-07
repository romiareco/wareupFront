import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export function LogoAvatar({logo, width}) {
  return (
    <Stack direction="row">
      <Avatar
        src={logo}
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
