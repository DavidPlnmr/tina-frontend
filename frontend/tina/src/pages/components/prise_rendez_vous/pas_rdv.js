import Header from "../header";
import { useRouter, Router } from "next/router";
import Head from "next/head";
import Footer from "../footer";

/**
 * @namespace 'confirmation_rdv.js'
 * @description This component display the confirmation of an appointment.
 * @returns {JSX.Element} A React functional component rendering the confirmation of an appointment.
 */
export default function ConfirmationRdv() {

    /**
     * @constant router
     * @memberof 'confirmation_rdv.js'
     * @see {@link 'header.js'.router}
     */
    const router = useRouter();

    /**
     * @function handleClick
     * @memberof 'confirmation_rdv.js'
     * @description A function that redirects to the home page.
     * @returns {void}
     */
    const handleClick = () => {
        router.push("./service_rdv");
    };
    return (
        <>
            <Head>
                <title>Tina - Confirmation de rendez-vous</title>
                <meta name="description" content="Confirmation de rendez-vous" />
            </Head>
            <Header />
            <main>
                <div
                    className="container py-5 jumbotron rounded shadow-lg text-center"
                    style={{ marginTop: "200px", backgroundColor: "#f8f9fa" }}  // light grey background
                >
                    <h1 className="mb-5">Cet employé n'a pas de disponibilités !</h1>
                    <div className="d-grid gap-3 col-6 mx-auto">
                        <button
                            className="btn btn-primary btn-lg"  // larger button
                            type="button"
                            onClick={handleClick}
                            style={{ backgroundColor: "#232627" }}
                        >
                            Retour en arrière
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );

}
