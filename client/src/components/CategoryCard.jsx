import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import { btnStyle } from "../styles/globalStyles";
import useStockCalls from "../service/useStockCalls";
import { Box } from "@mui/material";

export default function CategoryCard({ category, setData, handleOpen }) {
  const { name, _id } = category;
  const { deleteStock } = useStockCalls();

  const handleEdit = () => {
    handleOpen();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "250px",
        p: 2,
      }}>
      <CardContent sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <CategoryIcon sx={{ fontSize: 80, color: "primary.main" }} />
      </Box>

      <CardActions>
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStock("categories", _id)}
        />
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            handleEdit(category?._id);
            setData(category);
          }}
        />
      </CardActions>
    </Card>
  );
}
