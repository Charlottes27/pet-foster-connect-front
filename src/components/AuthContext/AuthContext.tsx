
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import axiosInstance from "../../services/axios/axios"; // Si vous l'utilisez pour la gestion des API

// Interface pour le contexte d'authentification
interface AuthContextType {
  isAuthenticated: boolean; // L'état pour savoir si l'utilisateur est authentifié ou non
  login: (token: string) => void; // Fonction pour connecter l'utilisateur
  logout: () => void; // Fonction pour déconnecter l'utilisateur
  refreshToken: () => Promise<void>; // Fonction pour rafraîchir le token d'authentification
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour accéder facilement au contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

// Définition du type des propriétés du AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Les enfants du composant AuthProvider qui utiliseront le contexte
}

// Définition du composant AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // État local pour savoir si l'utilisateur est authentifié ou non
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Vérifie si un token est déjà présent dans le localStorage pour initialiser l'état
    return !!localStorage.getItem("token");
  });

  // Fonction pour rafraîchir le token
  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post("/api/refresh-token", {
        refreshToken: localStorage.getItem("refreshToken"), // Récupère le refresh token du localStorage
      });

      const { token, refreshToken: newRefreshToken, expiresIn } = response.data;

      // Sauvegarde les nouveaux tokens et l'expiration dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("tokenExpiration", (Date.now() + expiresIn * 1000).toString());

      setIsAuthenticated(true); // Met à jour l'état pour indiquer que l'utilisateur est authentifié
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error);
      logout(); // Si une erreur se produit, on déconnecte l'utilisateur
    }
  }, []);

  // Fonction pour connecter l'utilisateur
  const login = useCallback((token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); // Sauvegarde le token dans le localStorage
  }, []);

  // Fonction de déconnexion
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Supprime le token du localStorage
    localStorage.removeItem("refreshToken"); // Supprime le refresh token
    localStorage.removeItem("tokenExpiration"); // Supprime la date d'expiration du token
    localStorage.removeItem("user_id");
  }, []);

  // Effet pour gérer le rafraîchissement automatique du token
  useEffect(() => {
    let refreshTimeout: ReturnType<typeof setTimeout>; // Variable pour le timeout de rafraîchissement

    // Fonction qui planifie le rafraîchissement du token
    const scheduleTokenRefresh = () => {
      clearTimeout(refreshTimeout); // Annule tout rafraîchissement planifié précédent

      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (tokenExpiration) {
        const expiresAt = parseInt(tokenExpiration, 10); // Récupère l'heure d'expiration du token
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now; // Calcul du temps restant avant l'expiration
        const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0); // Rafraîchit 5 minutes avant l'expiration

        // Planifie le rafraîchissement du token
        refreshTimeout = setTimeout(async () => {
          if (isAuthenticated) {
            await refreshToken(); // Rafraîchit le token lorsque le timeout expire
          }
          scheduleTokenRefresh(); // Replanifie le rafraîchissement du token
        }, refreshTime);
      }
    };

    if (isAuthenticated) {
      scheduleTokenRefresh(); // Si l'utilisateur est authentifié, commence le suivi du rafraîchissement
    }

    // Nettoyage de l'effet
    return () => {
      clearTimeout(refreshTimeout); // Annule tout rafraîchissement prévu
    };
  }, [isAuthenticated, refreshToken]);

  // Valeur du contexte à fournir aux composants enfants
  const contextValue: AuthContextType = {
    isAuthenticated, // L'état d'authentification
    login, // La fonction pour connecter l'utilisateur
    logout, // La fonction pour déconnecter l'utilisateur
    refreshToken, // La fonction pour rafraîchir le token
  };

  // Fourniture du contexte aux enfants
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};