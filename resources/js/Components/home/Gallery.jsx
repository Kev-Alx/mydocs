import "./Gallery.css";
import Image1 from "../../assets/image1.png";
import Image2 from "../../assets/image2.png";
import Image3 from "../../assets/image3.png";
import Image4 from "../../assets/image4.png";
import Image5 from "../../assets/image5.png";
import Image6 from "../../assets/image6.png";
import Image7 from "../../assets/image7.png";
import Image8 from "../../assets/image8.png";
import Image9 from "../../assets/image9.png";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Column = ({ images, y }) => {
    return (
        <motion.div className={"column"} style={{ y }}>
            {images.map((src, i) => {
                return (
                    <div key={i} className={"imageContainer"}>
                        <img src={src} alt="image" />
                    </div>
                );
            })}
        </motion.div>
    );
};
const Gallery = () => {
    const gallery = useRef(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });
    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    useEffect(() => {
        const resize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", resize);
        // requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className={"gallery"} ref={gallery}>
            <div className={"galleryWrapper"}>
                <Column images={[Image1, Image2, Image3]} y={y} />

                <Column images={[Image4, Image5, Image6]} y={y2} />

                <Column images={[Image7, Image8, Image9]} y={y3} />

                <Column images={[Image6, Image3, Image1]} y={y4} />
            </div>
        </div>
    );
};

export default Gallery;
