import { IComic, Result } from "interface/comics";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography/Typography";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { schema } from "rules";

interface PropsCheckout {
  comic: IComic;
}

const CheckoutPage: NextPage<PropsCheckout> = ({ comic }) => {
  type DataForm = yup.InferType<typeof schema>;

  const methods = useForm<DataForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  return (
    <>
      <Container sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Card sx={{ display: "flex" }}>
          <Grid container spacing={3} columnSpacing={{ sx: 2, sm: 2, md: 4 }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  sx={{ height: 150 }}
                  image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
                <CardContent sx={{ width: "100%", padding: "25px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {comic.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    color="primary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    Antes: ${comic.oldPrice}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Precio: ${comic.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              Aqui va el form
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apiComics = await getComics();

  const paths = apiComics.data.results.map((comic: Result) => ({
    params: { id: String(comic.id) },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  try {
    const comic = await getComic(Number(id));
    return {
      props: {
        comic,
      },
    };
  } catch (error) {
    console.error("No se encontro el comic", error);
    return {
      props: {
        comic: {},
      },
    };
  }
};

export default CheckoutPage;
