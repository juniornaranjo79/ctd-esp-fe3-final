import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/router";
import { Button, CardActions } from "@mui/material";

interface PropsCardConfirm {
  name: string;
  price: string;
  image: string;
  address: string;
}

const CardComfirm = ({ name, price, image, address }: PropsCardConfirm) => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      {/* seccion verde parte superior */}
      <Card elevation={0} sx={{ textAlign: "center" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography gutterBottom variant="h2" component="div" color="green">
          Que disfrutes tu compra
        </Typography>
      </Card>
      {/* seccion card */}
      <Card sx={{ display: "flex", alignItems: "center", marginY: "15px" }}>
        <CardMedia sx={{ width: 650, height: 250 }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
      {/* seccion inferior */}
      <Card sx={{ textAlign: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Dirección de entrega
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            {address}
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Precio pagado: ${price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={goToHome}
          >
            Volver al inicio
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CardComfirm;
