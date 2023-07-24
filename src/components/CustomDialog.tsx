import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Add, Cancel, CheckOutlined, Save } from "@mui/icons-material";

interface Data {
  id: number;
  name: string;
}

interface ICustomDialogProps {
  fetchData: () => Promise<Data[]>;
  onApprove: (data: number[]) => Promise<void>;
  onCancel: () => boolean;
  invalidateCache: () => Promise<void>;
  isOpen: boolean;
  cacheHash: string;
  close: VoidFunction;
  title: string;
}

export default function CustomDialog({
  fetchData,
  onApprove,
  isOpen,
  onCancel,
  cacheHash,
  close,
}: ICustomDialogProps) {
  const { data, isError } = useQuery([cacheHash], fetchData);
  const [selecteds, setSelecteds] = useState<number[]>([]);
  const mutate = useMutation({
    onSuccess: () => {
      setSelecteds([]);
      close();
    },
    onError: (err) => {
      alert(`SOMETHING WENT WRONG DURING UPDATE: ${err}`);
    },
    mutationFn: async () => {
      if (selecteds.length > 0) {
        return await onApprove(selecteds);
      }
    },
  });

  function handleSelect(id: number) {
    setSelecteds((old) => [...old, id]);
  }

  function handleUnSelect(id: number) {
    setSelecteds((old) => old.filter((item) => item != id));
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onCancel}
      aria-describedby="dialog-add"
      aria-labelledby="dialog-label"
      // fullWidth
    >
      <DialogTitle id="dialog-label">Add employees to project</DialogTitle>

      <DialogContent id="dialog-add">
        <Divider />
        <List>
          {data ? (
            data.map((d) => (
              <ListItem
                key={d.id}
                divider
                selected={selecteds.includes(d.id)}
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      selecteds.includes(d.id)
                        ? handleUnSelect(d.id)
                        : handleSelect(d.id);
                    }}
                  >
                    {selecteds.includes(d.id) ? (
                      <CheckOutlined color="primary" />
                    ) : (
                      <Add />
                    )}
                  </IconButton>
                }
              >
                <ListItemText primary={d.name} />
              </ListItem>
            ))
          ) : isError ? (
            <Typography>Something went wrong</Typography>
          ) : (
            <LinearProgress sx={{ m: "auto" }} />
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (selecteds.length > 0) {
              if (onCancel()) {
                setSelecteds([]);
              }
            } else {
              close();
            }
          }}
        >
          Cancel <Cancel />
        </Button>
        <Button
          onClick={() => mutate.mutateAsync()}
          disabled={selecteds.length == 0 || mutate.isLoading}
        >
          Save
          {mutate.isLoading ? (
            <CircularProgress />
          ) : selecteds.length > 0 ? (
            <Save />
          ) : (
            ""
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
