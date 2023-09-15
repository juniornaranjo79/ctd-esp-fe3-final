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
        <meta name="description" content="Generated by create next app" />
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
