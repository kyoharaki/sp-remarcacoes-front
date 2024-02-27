import {FaCar} from "react-icons/fa";
import {MdAddAPhoto} from "react-icons/md";
import {FiSend} from "react-icons/fi";
import "./Steps.css";

const Steps = ({currentStep}) => {
    return (
        <div className="steps">
            <div className="step active">
                <FaCar />
                <p>Veículo</p>
            </div>
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                <MdAddAPhoto />
                <p>Laudo</p>
            </div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <FiSend />
                <p>Enviar</p>
            </div>
        </div>
    );
}

export default Steps;