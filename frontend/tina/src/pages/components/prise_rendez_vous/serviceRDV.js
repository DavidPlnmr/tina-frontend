import React from "react";
import styles from "./CardService.module.scss";
import Header from "@/pages/components/header";

const serviceRDV = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className={styles.cardService}>
                            <p className={styles.titre}>Cheveux</p>
                            <p className={styles.sousTitre}>À partir de 20.-</p>
                            <div className={styles.separateur} />
                            <div className={styles.conteneurDesc}>
                                <div className={styles.description}>
                                    <p className={styles.textDesc}>
                                        Coupe De Cheveux
                                        <br />
                                        Shampoing, coiffage
                                        <br />
                                        25 minutes, CHF 20.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                                <div className={styles.descriptionTwo}>
                                    <p className={styles.textDesc}>
                                        Coupe De Cheveux Longs
                                        <br />
                                        (&#43; De 20cm)
                                        <br />
                                        30 minutes, CHF 20.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                                <div className={styles.descriptionTwo}>
                                    <p className={styles.textDesc}>
                                        Coloration
                                        <br />
                                        45min - 90min, CHF 25.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.textReduc}>Étudiant réduc 5.-</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={styles.cardService}>
                            <p className={styles.titre}>Cheveux</p>
                            <p className={styles.sousTitre}>À partir de 20.-</p>
                            <div className={styles.separateur} />
                            <div className={styles.conteneurDesc}>
                                <div className={styles.description}>
                                    <p className={styles.textDesc}>
                                        Coupe De Cheveux
                                        <br />
                                        Shampoing, coiffage
                                        <br />
                                        25 minutes, CHF 20.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                                <div className={styles.descriptionTwo}>
                                    <p className={styles.textDesc}>
                                        Coupe De Cheveux Longs
                                        <br />
                                        (&#43; De 20cm)
                                        <br />
                                        30 minutes, CHF 20.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                                <div className={styles.descriptionTwo}>
                                    <p className={styles.textDesc}>
                                        Coloration
                                        <br />
                                        45min - 90min, CHF 25.-
                                    </p>
                                    <div className={styles.bouttonChoisir}>
                                        <p className={styles.textBoutton}>Choisir</p>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.textReduc}>Étudiant réduc 5.-</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className={styles.cardService}>
                            {/* contenu de la troisième cardService */}
                        </div>
                    </div>

                    {/* Répétez la structure pour chaque cardService supplémentaire */}
                </div>
            </div>
        </>
    );
};

export default serviceRDV;
