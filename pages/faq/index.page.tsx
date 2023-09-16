import { GetStaticProps, NextPage } from "next";
import { FaqsType } from "dh-marvel/components/faqs/data/faqsData";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import FaqsComponent from "dh-marvel/components/faqs/FaqsComponent";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import Head from "next/head";

interface Props {
  faqs: FaqsType[];
}

const Faq: NextPage<Props> = ({ faqs }) => {
  return (
    <>
      <Head>
        <title> Detalle del comic </title>
        <meta
          name="description"
          content="Descubre respuestas rápidas y claras a las preguntas más comunes en nuestra página de preguntas frecuentes. Estamos comprometidos en proporcionarte la información que necesitas de manera sencilla y efectiva. Encuentra soluciones a tus consultas sobre nuestros productos o servicios y agiliza tu experiencia con nosotros."
        />
        <meta
          name="keywords"
          content="Preguntas frecuentes, FAQ, Ayuda y soporte, Respuestas a preguntas comunes, Solución de problemas, Guía de usuario, Información de productos, Servicio al cliente, Consultas habituales, Asistencia técnica, Información de contacto, Políticas de la empresa, Cómo funciona, Procedimiento paso a paso, Información esencial"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutGeneral>
        <BodySingle title={"Preguntas frecuentes (FAQ)"}>
          <FaqsComponent faqs={faqs} />
        </BodySingle>
      </LayoutGeneral>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const url = "https://marvel-comics-liart.vercel.app";
  const res = await fetch(`${url}/api/faqs`);
  const faqs = await res.json();

  return {
    props: {
      faqs,
    },
  };
};

export default Faq;
