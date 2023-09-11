import { GetStaticProps, NextPage } from "next";
import { FaqsType } from "dh-marvel/components/faqs/data/faqsData";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import FaqsComponent from "dh-marvel/components/faqs/FaqsComponent";

interface Props {
  faqs: FaqsType[];
}

const Faq: NextPage<Props> = ({ faqs }) => {
  return (
    <BodySingle title={"Preguntas frecuentes (FAQ)"}>
      <FaqsComponent faqs={faqs} />
    </BodySingle>
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
