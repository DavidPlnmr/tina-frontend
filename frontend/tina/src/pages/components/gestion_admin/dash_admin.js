import Header from '../header';
import Link from 'next/link';
import { FaUserPlus, FaCalendarCheck, FaUsersCog, FaServicestack, FaCashRegister } from 'react-icons/fa';
import Footer from "@/pages/components/footer";
import Head from "next/head";

export default function Dash() {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>Tina - Dashboard administrateur</title>
            </Head>
            <Header/>
            <main>
                <div className="container my-5">
                    <h2>Dashboard administrateur :</h2>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <FaUserPlus size={70} className="my-3" style={{color: "green"}}/>
                                    <h5 className="card-title text-center font-weight-bold">Création d'un employé</h5>
                                    <Link href="./gestion_employee/employe">
                                        <p className="btn btn-primary mt-3" style={{backgroundColor: "#232627", border: "none"}}>Choisir</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <FaCalendarCheck size={70} className="my-3" style={{color: "green"}}/>
                                    <h5 className="card-title text-center font-weight-bold">Gestion des disponibilités</h5>
                                    <Link href="./gestion_employee/ajout_dispo">
                                        <p className="btn btn-primary mt-3" style={{backgroundColor: "#232627", border: "none"}}>Choisir</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <FaUsersCog size={70} className="my-3" style={{color: "green"}}/>
                                    <h5 className="card-title text-center font-weight-bold">Gestion des employés</h5>
                                    <Link href="./gestion_employee/display_employee">
                                        <p className="btn btn-primary mt-3" style={{backgroundColor: "#232627", border: "none"}}>Choisir</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <FaServicestack size={70} className="my-3" style={{color: "blue"}}/>
                                    <h5 className="card-title text-center font-weight-bold">Gestion des services</h5>
                                    <Link href="./gestion_services/menu_services">
                                        <p className="btn btn-primary mt-3" style={{backgroundColor: "#232627", border: "none"}}>Choisir</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <FaCashRegister size={70} className="my-3" style={{color: "orange"}}/>
                                    <h5 className="card-title text-center font-weight-bold">Gestion des encaissements</h5>
                                    <Link href="../CRUD_encaissement/menu_encaissement">
                                        <p className="btn btn-primary mt-3" style={{backgroundColor: "#232627", border: "none"}}>Choisir</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}
