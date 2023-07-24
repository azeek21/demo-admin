import { Add, Cancel, Delete, Save } from "@mui/icons-material";
import {
  DialogActions,
  Portal,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  Fab,
  Divider,
  Container,
} from "@mui/material";
import { useState, PropsWithChildren } from "react";

interface IAddBase extends PropsWithChildren {
  title: string;
  onSave: VoidFunction;
  onCancel: VoidFunction;
}

export default function AddBase({
  children,
  title,
  onSave,
  onCancel,
}: IAddBase) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <Portal>
        <Dialog
          open={isOpen}
          fullWidth
          aria-describedby="dialog-content"
          aria-labelledby="dialog-label"
        >
          <DialogTitle id={"dialog-label"}> {title} </DialogTitle>
          <Divider />
          <DialogContent id="dialog-content">
            <FormControl fullWidth sx={{ gap: "1rem" }}>
              {children}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button>
              Cancel
              <Cancel />
            </Button>
            <Button
              onClick={() => {
                setIsLoading(true);
                onSave();
              }}
              disabled={isLoading}
            >
              Save
              <Save />
            </Button>
          </DialogActions>
        </Dialog>
        <Fab
          color="primary"
          aria-label={title}
          onClick={() => {
            setIsOpen(true);
          }}
          sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
        >
          <Add />
        </Fab>
      </Portal>
    </>
  );
}
