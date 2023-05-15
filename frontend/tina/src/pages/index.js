import Head from "next/head";
import Header from "./components/header";
import Accueil from "./components/accueil";

export default function Home() {
  return (
    <>
      <style type="text/css">
        {`
                    .fc-event-main {
                      background-color: #1AA7EC; /* gris clair */ !important
                      color: white; 
                  }
                  .fc-timegrid-event {
                      background-color: #1AA7EC; /* gris clair */ !important
                  }
                  
              `}
      </style>
      <Head>
        <title>Page d'accueil</title>
      </Head>
      <main>
        <Header />
        <Accueil />
      </main>
    </>
  );
}
