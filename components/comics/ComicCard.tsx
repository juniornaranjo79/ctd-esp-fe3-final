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
    router.push(`/comic/${id}`);
  };

  const handleComicBuy = () => {
    router.push(`/checkout/${id}`);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={image} />
        <CardContent sx={{ height: "100%" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
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
