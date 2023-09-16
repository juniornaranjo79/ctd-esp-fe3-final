import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { ICharacters } from "interface/characters";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface PropsCharacter {
  character: ICharacters;
}

const CharacterPage: NextPage<PropsCharacter> = ({ character }) => {
  return (
    <>
      <Head>
        <title> Personaje </title>
        <meta
          name="description"
          content="¡Explora el apasionante mundo de los personajes en nuestra plataforma especializada en personajes! Sumérgete en la profundidad y complejidad de tus héroes y villanos favoritos de cómics, películas, series de televisión y más. Aquí encontrarás perfiles detallados, historias de origen, evolución a lo largo del tiempo y mucho más sobre los personajes que amas. Únete a nuestra comunidad de aficionados y descubre los secretos y conexiones entre tus personajes preferidos."
        />
        <meta
          name="keywords"
          content="Perfiles de personajes, Historias de personajes, Características de personajes, Evolución de personajes, Detalles de personajes, Análisis de personajes, Héroes y villanos, Historia de origen de personajes, Conexiones entre personajes, Desarrollo de personajes, Personalidades de personajes, Iconos de la cultura pop, Personajes de ficción, Admiradores de personajes, Comunidad de aficionados a personajes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutGeneral>
        <BodySingle title={character.name}>
          <Typography align="center" gutterBottom variant="h5" component="div">
            Detalle del personaje
          </Typography>
          <Container sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                sx={{ width: 650, height: "auto" }}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
              <CardContent
                sx={{ maxWidth: 770, minWidth: 770, padding: "25px" }}
              >
                <Typography gutterBottom variant="h2" component="div">
                  {character.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Descripción
                </Typography>
                {character.description === null ||
                character.description === "" ? (
                  "Sin descripcion disponible"
                ) : (
                  <Typography gutterBottom variant="body1" component="div">
                    {character.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Container>
        </BodySingle>
      </LayoutGeneral>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  const character = await getCharacter(id);

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
