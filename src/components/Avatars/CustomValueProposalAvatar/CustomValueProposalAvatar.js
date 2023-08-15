import Avatar from "@mui/material/Avatar";

export function CustomValueProposalAvatar({ src, alt }) {
  return (
    <Avatar
      src={src}
      alt={alt}
      size="large"
      sx={{
        width: 150,
        height: 150,
      }}
      variant="square"
    />
  );
}
