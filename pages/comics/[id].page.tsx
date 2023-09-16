import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Divider, Button, CardActions } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { Result, IComic } from "interface/comics";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface PropsComic {
  comic: IComic;
}

const ComicPage: NextPage<PropsComic> = ({ comic }) => {
  const router = useRouter();

  const handleComicBuy = () => {
    router.push({ pathname: `/checkout/`, query: { comicId: comic.id } });
  };

  return (
    <>
      <Head>
        <title> Detalle del comic </title>
        <meta
          name="description"
          content="Explora los detalles ocultos y fascinantes de tus cómics favoritos en nuestra plataforma dedicada a los detalles de cómics. Sumérgete en el mundo de la narrativa gráfica y descubre los secretos detrás de las ilustraciones, personajes y tramas de tus cómics más queridos. Desde análisis de arte y simbolismo hasta perfiles detallados de personajes, te ofrecemos una experiencia enriquecedora para que puedas apreciar aún más tus historias en viñetas."
        />
        <meta
          name="keywords"
          content="Detalles de cómics, Análisis de cómics, Secretos de cómics, Arte en cómics, Simbolismo en cómics, Personajes de cómics, Historia de cómics, Cómics explicados, Curiosidades de cómics, Ilustraciones de cómics, Interpretación de cómics, Tramas de cómics, Detalles ocultos en cómics, Cómics revelados, Exposición de cómics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutGeneral>
        <BodySingle title={comic.title}>
          <Typography align="center" gutterBottom variant="h5" component="div">
            Detalle del comic
          </Typography>
          <Container sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                sx={{ width: 650, height: "auto" }}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              />
              <CardContent
                sx={{ maxWidth: 770, minWidth: 770, padding: "25px" }}
              >
                <Typography gutterBottom variant="h2" component="div">
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
                <Typography gutterBottom variant="h4" component="div">
                  Stock:{" "}
                  {comic.stock <= 0
                    ? "Sin stock disponible"
                    : `${comic.stock} Uni.`}
                </Typography>
                <Divider sx={{ marginY: 2, borderColor: "#202020" }} />
                <Typography gutterBottom variant="h5" component="div">
                  Descripción
                </Typography>
                {comic.description === null || comic.description === "" ? (
                  "Sin descripcion disponible"
                ) : (
                  <Typography gutterBottom variant="body1" component="div">
                    {comic.description}
                  </Typography>
                )}
                <Divider sx={{ marginY: 2, borderColor: "#202020" }} />
                <Typography gutterBottom variant="h5" component="div">
                  Personajes
                </Typography>
                {comic.characters.items.length > 0 ? (
                  <div>
                    <ul
                      style={{
                        display: "flex",
                        paddingLeft: "0",
                        flexWrap: "wrap",
                      }}
                    >
                      {comic.characters.items.map((character, i) => (
                        <li
                          key={i}
                          style={{ listStyleType: "none", marginRight: 10 }}
                        >
                          <NextLink
                            href={`/characters/${character.resourceURI
                              .split("/")
                              .pop()}`}
                            passHref
                          >
                            {character.name}
                          </NextLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  "Sin personajes disponibles"
                )}
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    disableElevation
                    disabled={comic.stock <= 0}
                    onClick={() => handleComicBuy()}
                  >
                    {comic.stock <= 0 ? "Sin stock" : "Comprar"}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Container>
        </BodySingle>
      </LayoutGeneral>
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

export default ComicPage;
