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
import { Dispatch, useEffect, useState } from "react";
import {
  Add,
  Cancel,
  CheckOutlined,
  Deselect,
  Save,
} from "@mui/icons-material";

interface Data {
  id: number | string;
  name: string;
}

interface ICustomDialogProps {
  fetchData: () => Promise<Data[]>;
  onApprove: (data: Data[]) => Promise<void>;
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
  const { data, isLoading, isError } = useQuery([cacheHash], fetchData);
  const [selecteds, setSelecteds] = useState<Array<string | number>>([]);
  const mutate = useMutation({
    onSuccess: () => {
      setSelecteds([]);
      close();
    },
    onError: (err) => {
      alert(`SOMETHING WENT WRONG DURING UPDATE: ${err}`);
    },
    mutationFn: async () => {
      if (data) {
        return await onApprove(data);
      }
    },
  });

  function handleSelect(id: string | number) {
    setSelecteds((old) => [...old, id]);
  }

  function handleUnSelect(id: string | number) {
    setSelecteds((old) => old.filter((item) => item != id));
  }

  // function handleRemove
  useEffect(() => {
    fetchData();
  }, []);

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
