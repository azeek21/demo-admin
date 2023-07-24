import { Button, Menu, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface ISelectButtonProps extends PropsWithChildren {
  mainText: string;
}

export default function SelectButton({
  children,
  mainText,
}: ISelectButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openMenu}
        variant="text"
        fullWidth
      >
        <Typography
          variant="body1"
          align="left"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {/* MAIN BUTTON TEXT  */}
          {mainText}
        </Typography>
        <ArrowDropDown sx={{ ml: "auto" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ maxHeight: 500, width: "100%", p: 0, pt: 0 }}
        className="disable-padding"
      >
        <Button onClick={handleClose} fullWidth size="small" sx={{ p: 0 }}>
          <ArrowDropUp />
        </Button>

        {/* CHILDREN HERE */}
        {children}
      </Menu>
    </>
  );
}
