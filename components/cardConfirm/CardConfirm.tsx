import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

interface PropsCardConfirm {
  name: string;
  price: string;
  image: string;
  address: string;
}

const CardComfirm = ({ name, price, image, address }: PropsCardConfirm) => {
  return (
    <>
      {/* seccion verde parte superior */}
      <Typography gutterBottom variant="h2" component="div" color="green">
        Que disfrutes tu compra
      </Typography>
      {/* seccion card */}
      <Card sx={{ display: "flex" }}>
        <CardMedia sx={{ width: 650, height: "auto" }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div" color="green">
            {name}
          </Typography>
        </CardContent>
      </Card>
      {/* seccion inferior */}
      <Card sx={{ display: "flex" }}>
        <CardContent>
          <Typography gutterBottom variant="h2" component="div" color="green">
            Dirección de entrega
          </Typography>
          <Typography gutterBottom variant="h2" component="div" color="green">
            {address}
          </Typography>
          <Typography gutterBottom variant="h2" component="div" color="green">
            Precio pagado: ${price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CardComfirm;
