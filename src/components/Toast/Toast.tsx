
import "./Toast.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IToastProps {
  setToast: React.Dispatch<React.SetStateAction<string | null>>;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

function Toast({ setToast, message, type }: IToastProps) {
  // type
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="toastContainer">
      <div className={`toast ${type}`}>
        <p>{message}</p>
        <button onClick={() => setToast(null)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
