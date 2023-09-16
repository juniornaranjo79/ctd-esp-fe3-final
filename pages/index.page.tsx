import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import GridComponent from "dh-marvel/components/grid/GridComponent";
import { Comics, Result } from "interface/comics";
import { PropsCard } from "../components/comics/ComicCard";
import { Typography, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
  transformComics: PropsCard[];
  apiComics: Comics;
}

const itemsPerPage = 12;

const Index: NextPage<Props> = ({ transformComics, apiComics }) => {
  const router = useRouter();

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = (page - 1) * itemsPerPage + itemsPerPage;

    router.push(`/?page=${page}`);
  };

  return (
    <>
      <Head>
        <title>Marvel comics</title>
        <meta
          name="description"
          content="¡Bienvenido a la tienda en línea definitiva para los amantes del cómic! En nuestra tienda, encontrarás una amplia y emocionante selección de cómics, desde clásicos atemporales hasta las últimas novedades. Nuestro objetivo es proporcionarte acceso fácil y conveniente a un mundo de aventuras gráficas y narrativas fascinantes. Explora nuestra colección, descubre tus cómics favoritos y sumérgete en el emocionante universo de la historieta."
        />
        <meta
          name="keywords"
          content="Cómics en línea, Tienda de cómics, Comprar cómics, Novedades de cómics, Cómics clásicos, Cómics populares, Colección de cómics, Tienda de cómics en línea, Venta de cómics, Cómics de superhéroes, Cómics de fantasía, Cómics de ciencia ficción, Cómics de aventuras, Historietas de culto, Cómics para coleccionistas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutGeneral>
        <BodySingle title={"Comics"}>
          <Typography align="center" gutterBottom variant="h5" component="div">
            Los mejores comics que puedes encontrar!
          </Typography>
          <Box
            sx={{ padding: "20px", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={Math.ceil(apiComics.data.total / itemsPerPage)}
              onChange={handlePage}
            />
          </Box>
          <GridComponent comics={transformComics} />
        </BodySingle>
      </LayoutGeneral>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const page = Number(query.page ?? 1);
  const apiComics = await getComics(page, itemsPerPage);

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

  const transformComics: PropsCard[] = apiComics.data.results.map(
    (item: Result) => ({
      id: item.id,
      title: item.title,
      image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
    })
  );

  return {
    props: {
      transformComics,
      apiComics,
    },
  };
};

export default Index;
