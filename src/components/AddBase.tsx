import { Add, Cancel, Save } from "@mui/icons-material";
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
} from "@mui/material";
import { useState, PropsWithChildren } from "react";

interface IAddBase extends PropsWithChildren {
  title: string;
  onSave: VoidFunction;
  onCancel: VoidFunction;
}

export default function AddBase({ children, title, onSave }: IAddBase) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // function handleClose() {
  //   setIsOpen(false);
  // }

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
          sx={{ position: "absolute", bottom: '-2.3rem', right: '-2.3rem' }}
        >
          <Add />
        </Fab>
    </>
  );
}
