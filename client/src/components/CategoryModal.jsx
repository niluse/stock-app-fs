import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useStockCalls from "../service/useStockCalls";
import { ModalStyle } from "../styles/globalStyles";

export default function CategoryModal({
  open,
  handleClose,
  handleOpen,
  data,
  setData,
}) {
  const { postStock, putStock } = useStockCalls();

  const { name } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data._id) {
      putStock("categories", data);
    } else {
      postStock("categories", data);
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          component="form"
          sx={ModalStyle}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
          onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            required
            value={name}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" size="large">
            {data._id ? "Update Category" : "Add Category"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
