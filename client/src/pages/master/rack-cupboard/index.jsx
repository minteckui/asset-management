import { useState } from "react";
import MRTTable from "../../../components/mrt-table";
import { Box, Button, IconButton } from "@mui/material";
import Iconify from "../../../components/Iconify";
import AddRackCupboard from "./add-rack-cupboard";
import { useGetRackCupBoard } from "../../../api-hook";
import DeleteRecord from "../../../components/DeleteRecord";
import { deleteRackCupBoard } from "../../../mutations";
import { useSnackbar } from "notistack";
const columns = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "barcodeId",
    header: "Barcode ID",
  },

  {
    accessorKey: "description",
    header: "Description",
  },
];
export default function RackCupboard() {
  const { data, isLoading, refetch } = useGetRackCupBoard();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteRackCupBoard(selectedRow.id);
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
        <AddRackCupboard
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
          onClose={() => {
            setOpenDelete(false);
            setSelectedRow(null);
          }}
          row={selectedRow}
          title={"Delete Rack/Cupboard"}
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
