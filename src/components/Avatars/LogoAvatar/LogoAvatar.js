import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import WULogo from "../../../assets/official-images/logo.png";

export function LogoAvatar() {
  return (
    <Stack direction="row">
      <Avatar
       src={WULogo}
       alt="Ware Up"
       size="large"
       sx={{
        width: 120, // Ajusta el ancho según tus necesidades
        height: 120, // Ajusta la altura según tus necesidades
      }}
       variant="square">
      </Avatar>
      
    </Stack>
  );
}
