import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import "./Nature.scss";

export const Nature = () => {
    const images = [img1, img2, img3, img4, img5];

    return (
        <section className="container nature">
            <h2 className="nature-title">Beautiful nature</h2>
            <Splide
            options={{
                type: "loop",
                focus: "center",
                gap: "-1rem",
                perPage: 3,
                perMove: 1,
                pagination: false,
                arrows: false,
                padding: { left: "8rem", right: "8rem" },
                autoWidth: true,
                trimSpace: false,
            }}
            className="nature-slider"
        >
            {images.map((src, i) => (
                <SplideSlide key={i}>
                    <img src={src} className="nature-img" alt="" />
                </SplideSlide>
            ))}
        </Splide></section>
    );
};
