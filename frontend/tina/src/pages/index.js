import Head from 'next/head'
import Header from './components/header'
import Accueil from './components/accueil'


export default function Home() {
  return (
    <>
      <Head>
        <title>Page d'accueil</title>
      </Head>
      <main>
        <Header/>
        <Accueil/>
      </main>
    </>
  )
}
