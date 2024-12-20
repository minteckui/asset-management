/* eslint-disable no-unused-vars */
import { useState } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddLocation from "./add-location";
import { useGetLocation } from "../../../api-hook";
import DeleteRecord from "../../../components/DeleteRecord";
import { deleteLocation } from "../../../mutations";
import { useSnackbar } from "notistack";
const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
export default function Location() {
  const { data, isLoading, refetch } = useGetLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteLocation(selectedRow.id);
      enqueueSnackbar("Successfully deleted record", { variant: "success" });
      setOpenDelete(false);
      setSelectedRow(null);
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to delete", { variant: "error" });
    }
  };
  return (
    <>
      {open && (
        <AddLocation
          open={open}
          isEditMode={isEditMode}
          onClose={() => {
            setIsEditMode(false);
            setSelectedRow(null);
            setOpen(false);
          }}
          row={selectedRow}
          refetch={refetch}
        />
      )}

      {openDelete && (
        <DeleteRecord
          title={"Delete Location"}
          row={selectedRow}
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
          onSubmit={handleDelete}
        />
      )}
      <MRTTable
        data={data || []}
        columns={columns}
        loading={isLoading}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={() => {
                setOpen(true);
                setSelectedRow(row.original);
                setIsEditMode(true);
              }}
            >
              <Iconify icon={"eva:edit-fill"} />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDelete(true);
                setSelectedRow(row.original);
              }}
              color="error"
            >
              <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen(true);
                setIsEditMode(false);
              }}
            >
              Add New
            </Button>
          </Box>
        )}
      />
    </>
  );
}
