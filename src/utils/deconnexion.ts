import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext/AuthContext";
import React from "react";

import { IUser } from "../@types/user";

export function useDeconnexion () {
    const {isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();

// fonction currifié ou à fermeture multiple (une fonction dans une fonction)
// retourne une fonction qui peut être directement utilisée comme gestionnaire d'événements onClick.
    return (
        (setUser: React.Dispatch<React.SetStateAction<IUser | null>>,action?: (value: React.SetStateAction<boolean>) => void) => (event: React.MouseEvent) => {
            event.preventDefault();
            if (isAuthenticated) {
                logout();
                setUser(null);
                navigate("/")
            }
            if (action) {
                action(false);
            }
        }
    );
};