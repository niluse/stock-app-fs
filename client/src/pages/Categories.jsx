import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useStockCalls from "../service/useStockCalls";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CategoryCard from "../components/CategoryCard";
import { useState } from "react";
import CategoryModal from "../components/CategoryModal";

export default function Categories() {
  const { getStocks } = useStockCalls();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
  });

  useEffect(() => {
    getStocks("categories");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { categories, loading, error } = useSelector((state) => state.stock);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setData({ name: "" });
  };

  return (
    <div>
      <Typography variant="h5" color="error" mb={3}>
        Categories
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Category
      </Button>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        data={data}
        setData={setData}
      />
      <Grid
        container
        spacing={3}
        gap={2}
        justifyContent={"center"}
        marginTop={2}>
        {categories?.map((category) => (
          <Grid item key={category._id}>
            <CategoryCard
              category={category}
              setData={setData}
              handleOpen={handleOpen}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
