import React from "react";
import styles from "./ImgSection.css";
import inicia from "../../assets/inicia.png"

export const ImgSection = () => {
    return(
        <div className="img-container" style={ styles }>
            <img src= { inicia } alt="imagen oficina" />
        </div>
    );
};
export default ImgSection;