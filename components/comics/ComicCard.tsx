import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface PropsCard {
  id: number;
  title: string;
  image: string;
}

export const ComicCard = ({ id, title, image }: PropsCard) => {
  const router = useRouter();

  const handleComicDetail = () => {
    router.push(`/comics/${id}`);
  };

  const handleComicBuy = () => {
    router.push(`/checkout/${id}`);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardMedia sx={{ height: 150 }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            size="small"
            disableElevation
            onClick={handleComicDetail}
          >
            Ver detalle
          </Button>
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={handleComicBuy}
          >
            Comprar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
