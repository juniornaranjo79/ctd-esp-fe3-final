import { IComic, Result } from "interface/comics";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FormProvider, useForm } from "react-hook-form";
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
import CustomForm from "dh-marvel/components/form/CustomForm";
import { ICheckout } from "interface/checkout";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { title } from "process";

/* interface PropsCheckout {
  comic: IComic;
  id: number;
} */

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { comicId } = router.query;
  console.log(comicId);
  const [dataComic, setDataComic] = useState<IComic | null>(null);
  console.log("dataComic", dataComic);
  const [status, setStatus] = useState("");

  type DataForm = yup.InferType<typeof schema>;

  const methods = useForm<DataForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const getComicById = async (id: number) => {
    const response = await fetch(`/api/comics/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  };

  useEffect(() => {
    const id = Number(comicId);
    if (comicId) {
      getComicById(id).then((res) => {
        console.log(res);
        ///const resComic = transformComics(res);
        setDataComic(res);
      });
    } else {
      router.push("/");
    }
  }, [comicId, router]);

  const transformComics: any = (dataComic: any) => {
    return {
      id: dataComic.id,
      title: dataComic.title,
      image: dataComic.thumbnail.path + "." + dataComic.thumbnail.extension,
    };
  };

  const apiCheckout = (data: ICheckout): CheckoutInput => {
    return {
      customer: {
        name: data.firstName,
        lastname: data.lastName,
        email: data.email,
        address: {
          address1: data.address,
          address2: null,
          city: data.city,
          state: data.province,
          zipCode: data.postalCode,
        },
      },
      card: {
        number: data.cardNumber,
        cvc: data.cvc,
        expDate: data.dueDate,
        nameOnCard: data.cardName,
      },
      order: {
        name: data.name,
        image: data.image,
        price: data.price,
      },
    };
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Datos que se envían al servidor:", data);
    if (!dataComic) {
      return;
    }
    const dataForm: ICheckout = {
      ...data,
      name: dataComic.title,
      image: dataComic.images,
      price: dataComic.price,
    };

    const reqs = apiCheckout(dataForm);

    try {
      //const url = "http://localhost:3000/api/checkout";
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqs), // Convierte los datos en JSON
      });

      const resParse = await response.json();
      console.log({ resParse });

      if (response.ok) {
        // Si la respuesta es exitosa, redirige al usuario a la página de confirmación
        router.push(
          {
            pathname: "/buyout",
            query: {
              name: resParse.data.order.name,
              image: resParse.data.order.images,
              price: resParse.data.order.price,
              address: resParse.data.customer.address.address1,
            },
          },
          "/buyout"
        );
      } else {
        // Si la respuesta no es exitosa, muestra un mensaje de error
        setStatus("Error al enviar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setStatus("Error al enviar los datos.");
    }
  };

  return (
    <>
      {!!dataComic ? (
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
                  elevation={0}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    sx={{ height: 150 }}
                    image={`${dataComic.thumbnail.path}.${dataComic.thumbnail.extension}`}
                    /* image={dataComic.images} */
                  />
                  <CardContent sx={{ width: "100%", padding: "25px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {dataComic.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      color="primary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      Antes: ${dataComic.oldPrice}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Precio: ${dataComic.price}
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
                <FormProvider {...methods}>
                  <CustomForm onSubmit={handleFormSubmit} />
                </FormProvider>
              </Grid>
            </Grid>
          </Card>
        </Container>
      ) : (
        "Traigo monda"
      )}
    </>
  );
};

/* export const getStaticPaths: GetStaticPaths = async () => {
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
}; */

export default CheckoutPage;
