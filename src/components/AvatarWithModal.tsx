import { Close as CloseIcon } from "@mui/icons-material";
import { Avatar, IconButton, Modal, Paper } from "@mui/material";
import { useState } from "react";

const AvatarWithModal = ({ src }: { src: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Avatar src={src} onClick={openModal} />
      <Modal
        open={isOpen}
        onClose={closeModal}
        sx={{
          height: "500px",
          width: "70%",
          margin: "auto",
        }}
      >
        <Paper elevation={24}>
          <IconButton
            onClick={(ev) => {
              ev.stopPropagation();
              closeModal();
            }}
            sx={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            src={src}
            variant="square"
            sx={{
              width: "500px",
              height: "500px",
              objectFit: "contain",
              margin: "auto",
            }}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default AvatarWithModal;
