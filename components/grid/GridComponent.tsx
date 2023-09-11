import { ComicCard, PropsCard } from "../comics/ComicCard";
import { Container, Grid } from "@mui/material";
import React from "react";

interface PropsGrid {
  comics: PropsCard[];
}

const GridComponent = ({ comics }: PropsGrid) => {
  return (
    <Container sx={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {comics &&
          comics.map((item) => (
            <Grid item xs={4} sm={6} md={3} key={item.id}>
              <ComicCard id={item.id} title={item.title} image={item.image} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default GridComponent;
