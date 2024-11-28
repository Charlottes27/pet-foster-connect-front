import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp} from "@fortawesome/free-solid-svg-icons";

import "./ScrollToTopButton.css";

function ScrollToTopButton () {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            // Vérifiez si l'utilisateur a défilé plus que 100vh
            if(window.scrollY > window.innerHeight * 4) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        // Nettoyer l'écouteur d'événements lors du démontage
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
        setShowTopBtn(false)
    }

    return (
        <div>
            {showTopBtn &&
            <button type="button" onClick={goToTop} id="goToTop">
                <FontAwesomeIcon icon={faArrowUp}/>
            </button>
            }
        </div>
    );
};

export default ScrollToTopButton