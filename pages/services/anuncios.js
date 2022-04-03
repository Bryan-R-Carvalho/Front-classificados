import Head from "next/head";
import Header from "../../components/Header";

export default function Anuncios() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto"></main>
    </div>
  );
}
