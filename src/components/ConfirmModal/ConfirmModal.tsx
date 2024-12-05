import "./ConfirmModal.css"

interface IConfirmModalProps {
    text: string; // Texte à afficher dans le modal
    opened: boolean; // Indique si le modal est ouvert
    onConfirm: () => void; // Fonction à appeler lors de la confirmation
    onCancel: () => void; // Fonction à appeler lors de l'annulation
}

function ConfirmModal ({text, opened, onConfirm, onCancel}:IConfirmModalProps) {
    return (
        <div className={`confirmModal ${opened && "show"}`}>
            <div className="modalContent">
                <h3>{text}</h3>
                <div className="modalBtns">
                    <button type="button" className="confirmBtn" onClick={onConfirm}>
                        Confirmer
                    </button>
                    <button type="button" className="cancelBtn" onClick={onCancel}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmModal;