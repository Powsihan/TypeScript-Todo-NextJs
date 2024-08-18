import React from "react";
import Button from "./Button";

interface ConfirmationModalProps {
    show: boolean;
    message: string;
    heading?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal = ({
    show,
    message,
    heading = "Confirmation",
    onConfirm,
    onCancel,
}: ConfirmationModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="modal-content p-6">
                    <h2 className="text-2xl font-semibold mb-4" style={{ color: "darkred" }}>
                        {heading}
                    </h2>
                    <hr className="mb-6" />
                    <p className="text-lg mb-6">{message}</p>
                    <hr />
                    <div className="mt-4 flex justify-end">
                        <Button text={"Confirm"} onClick={onConfirm} />
                        <Button text={"Cancel"} onClick={onCancel} secondary/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
