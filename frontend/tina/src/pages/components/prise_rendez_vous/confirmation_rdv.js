import Header from "../header";
import Head from "next/head";
import Footer from "../footer";
import Link from "next/link";
import {Button} from "react-bootstrap";

/**
 * @namespace 'confirmation_rdv.js'
 * @description This component display the confirmation of an appointment.
 * @returns {JSX.Element} A React functional component rendering the confirmation of an appointment.
 */
export default function ConfirmationRdv() {

    return (
        <>
            <Head>
                <title>Tina - Confirmation de rendez-vous</title>
                <meta name="description" content="Confirmation de rendez-vous" />
            </Head>
            <Header />
            <main className="bg-light">
                <div className="container py-5">
                    <div className="jumbotron bg-white shadow rounded pb-5">
                        <h1 className="display-4 text-center">Merci pour votre réservation !</h1>
                        <p className="lead text-center mt-4">Votre rendez-vous a été réservé avec succès.</p>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-around mt-5">
                            <Link href={"/"}>
                                <Button className="btn btn-primary btn-lg shadow">Retour à l'accueil</Button>
                            </Link>
                            <Link href={"/components/CRUD_utilisateur/calendrier_utilisateur"}>
                                <Button className="btn btn-secondary btn-lg shadow">Voir mes rendez-vous</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );



}
