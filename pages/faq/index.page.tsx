import { GetStaticProps, NextPage } from "next";
import { FaqsType } from "dh-marvel/components/faqs/data/faqsData";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import FaqsComponent from "dh-marvel/components/faqs/FaqsComponent";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
  faqs: FaqsType[];
}

const Faq: NextPage<Props> = ({ faqs }) => {
  return (
    <LayoutGeneral>
      <BodySingle title={"Preguntas frecuentes (FAQ)"}>
        <FaqsComponent faqs={faqs} />
      </BodySingle>
    </LayoutGeneral>
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
