
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

import "./Slider.css";
import { IAnimal } from "../../@types/animal";
import { IAssociation } from "../../@types/association";
import axiosInstance from "../../services/axios/axios";

interface ISliderProps {
    entity: IAnimal | IAssociation 
    idEntity: number
}

function Slider({entity, idEntity}: ISliderProps) {
    const [validImages, setValidImages] = useState<string[]>([]);

    const isAnimal = (entity: IAnimal | IAssociation): entity is IAnimal => {
        return 'species' in entity;
    };

    useEffect(() => {
        const validateImages = async () => {
        if (entity) {
            let imageUrls: string[] = [entity?.profile_photo as string];
            
            if(isAnimal(entity)) {
                imageUrls.push(
                    entity.photo1 as string,
                    entity.photo2 as string,
                    entity.photo3 as string,
                )
            }
            
            imageUrls = imageUrls.filter((photo) => photo)
            .map((photo) => `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`);

            const validUrls = await Promise.all(
            imageUrls.map(async (url) =>
                (await checkImageExists(url)) ? url : null
            )
            );

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
