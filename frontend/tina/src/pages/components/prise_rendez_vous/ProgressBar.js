import React from "react";
import { FaRegCalendarAlt, FaRegUser, FaClipboardCheck, FaShoppingCart } from 'react-icons/fa';
import styles from '@/styles/ProgressBar.module.css';
import { useRouter } from 'next/router';

export const ProgressBar = ({ currentStep }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }


    return (
        <div className={styles.container}>
            <div className={styles.progressBarContainer}>
                <div onClick={currentStep > 1 ? handleGoBack : undefined} className={currentStep >= 1 ? styles.stepIcon : ""}>
                    <FaShoppingCart />
                </div>
                <div className={styles.progressBarStep}></div>
                <div onClick={currentStep > 2 ? handleGoBack : undefined} className={currentStep >= 2 ? styles.stepIcon : ""}>
                    <FaRegUser />
                </div>
                <div className={styles.progressBarStep}></div>
                <div onClick={currentStep > 3 ? handleGoBack : undefined} className={currentStep >= 3 ? styles.stepIcon : ""}>
                    <FaRegCalendarAlt />
                </div>
                <div className={styles.progressBarStep}></div>
                <div onClick={currentStep > 4 ? handleGoBack : undefined} className={currentStep >= 4 ? styles.stepIcon : ""}>
                    <FaClipboardCheck />
                </div>
            </div>
        </div>
    );
};
