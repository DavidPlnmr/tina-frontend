import { useState } from "react";

function ServicesForm() {
    const [services, setServices] = useState([
        {
            type_of_service: 0,
            name: "",
            price: 0,
            price_student: 0,
            duration: 0,
        },
    ]);
    const [compteur, setCompteur] = useState(1);

    const handleChange = (evt, index) => {
        const { name, value } = evt.target;

        const newServices = [...services];
        newServices[index] = { ...newServices[index], [name]: value };

        setServices(newServices);
    };

    const addService = (evt) => {
        evt.preventDefault();
        if (compteur < 3) {
            setCompteur(compteur + 1);
            setServices([
                ...services,
                {
                    type_of_service: 0,
                    name: "",
                    price: 0,
                    price_student: 0,
                    duration: 0,
                },
            ]);
        }
    };

    return (
        <>
            {services.map((service, index) => (
                <div key={index}>
                    <div className="row mb-3">
                        <label htmlFor={`name-${index}`} className="col-sm-2 col-form-label">
                            Service {index + 1} titre
                        </label>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                id={`name-${index}`}
                                name="name"
                                value={service.name}
                                placeholder={`Le titre du service ${index + 1}`}
                                onChange={(evt) => handleChange(evt, index)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor={`price-${index}`} className="col-sm-2 col-form-label">
                            Service {index + 1} prix
                        </label>
                        <div className="col-auto">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">CHF</div>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`price-${index}`}
                                    name="price"
                                    value={service.price}
                                    placeholder="0"
                                    onChange={(evt) => handleChange(evt, index)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor={`price_student-${index}`} className="col-sm-2 col-form-label">
                            Service {index + 1} prix étudiant
                        </label>
                        <div className="col-auto">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">CHF</div>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`price_student-${index}`}
                                    name="price_student"
                                    value={service.price_student}
                                    placeholder="0"
                                    onChange={(evt) => handleChange(evt, index)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor={`duration-${index}`} className="col-sm-2 col-form-label">
                            Service {index + 1} durée
                        </label>
                        <div className="col-auto">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
</>
);
}