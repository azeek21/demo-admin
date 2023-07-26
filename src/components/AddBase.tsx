import { Add, Cancel, Save } from "@mui/icons-material";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
  Fab,
  Divider,
} from "@mui/material";
import { useState, PropsWithChildren } from "react";

interface IAddBase extends PropsWithChildren {
  title: string;
  onSave: () => Promise<void>;
  onCancel: () => boolean;
}

export default function AddBase({
  children,
  title,
  onSave,
  onCancel,
}: IAddBase) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
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
          <Button
            onClick={() => {
              if (onCancel()) {
                setIsOpen(false);
              }
            }}
          >
            Cancel
            <Cancel />
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              await onSave();
              setIsLoading(false);
              setIsOpen(false);
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
        sx={{ position: "absolute", bottom: "-2.3rem", right: "-2.3rem" }}
      >
        <Add />
      </Fab>
    </>
  );
}
