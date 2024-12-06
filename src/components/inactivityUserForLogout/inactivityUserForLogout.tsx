import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const inactivityUserForLogout = (inactivityTime = 3600000) => {
        //inactivityTime est une valeur pas défaut qui pourrait être changé lors de son appelle dans App
        // dans se cas penser à le rajouter dans les dépendances de checkInactivity
    const lastActivity = useRef(Date.now());

    const navigate = useNavigate();

    const resetTimerOfLastActivity = () => {
        lastActivity.current = Date.now();
    };

    const checkInactivity = () => {
        const currentTime = Date.now();
        if (currentTime - lastActivity.current > inactivityTime) {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            navigate("/");
        }
    };

    useEffect(() => {
        const events =["mousedown", "keypress", "scroll", "touchstart"];
        events.forEach(event => document.addEventListener(event, resetTimerOfLastActivity));

        const interval = setInterval(checkInactivity, 60000);
            // Toutes les 1 min checkInactivity est appelée

        return () => {
            events.forEach(event => document.removeEventListener(event, resetTimerOfLastActivity));
            clearInterval(interval);
        }
            // Le return dans le useEffect est enregistré en temps de fonction de nettoyage
            // Cette fonction n'est appelée qu'avant que :
                // le composant ne soit démonté
                // l'effet ne soit réexécuté
    }, [])

    // return resetTimerOfLastActivity;
        // Ce return pourrait me servir si dans mon appli j'ai besoin de réinitialisé manuellement lastActivity
};

export default inactivityUserForLogout;