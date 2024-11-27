
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

import "./Slider.css";
import { IAnimal } from "../../@types/animal";
import axiosInstance from "../../services/axios/axios";

interface ISliderProps {
    entity: IAnimal
    idEntity: number
}

function Slider({entity, idEntity}: ISliderProps) {
    const [validImages, setValidImages] = useState<string[]>([]);

    useEffect(() => {
        const validateImages = async () => {
        if (entity) {
            const imageUrls = [
            entity.profile_photo,
            entity.photo1,
            entity.photo2,
            entity.photo3,
            ]
            .filter((photo) => photo)
            .map((photo) => `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`);
console.log(imageUrls);

            const validUrls = await Promise.all(
            imageUrls.map(async (url) =>
                (await checkImageExists(url)) ? url : null
            )
            );
console.log(validUrls);


            setValidImages(validUrls.filter((url) => url !== null) as string[]);
        }
        };

        validateImages();
    }, [entity]);

    const checkImageExists = async (url: string) => {
        try {
        const res = await axiosInstance.head(url);
        console.log(res);
        
        return res.status === 200;
        } catch (error) {
        return false;
        }
    };

    if (validImages.length === 0) return <p>Aucune photo disponible</p>;

    return (
        <section className="morePhotos">
        <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            showIndicators={true}
            showThumbs={false}
        >
            {validImages.map((photo, index) => (
            <div key={index}>
                <img
                className="carouselPhoto"
                src={photo}
                alt={`Photo ${index + 1}`}
                />
            </div>
            ))}
        </Carousel>
        </section>
    );
}

export default Slider;
