import { useState } from "react";
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

//Components
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { FiSend } from "react-icons/fi";
import VeiculoForm from "./VeiculoForm";
import LaudoForm from "./LaudoForm";
import ParametrosForm from "./ParametrosForm";
import Steps from "./Steps";

//Hooks
import { stepFormHook } from "../hooks/stepFormHook";

let tmpEndereco, tmpCnpj;

const formTemplate = {
    editID: "",
    inputPlaca: "",
    inputRenavam: "",
    inputChassi: "",
    inputMotor: "",
    inputProprietario: "",
    inputCpfCnpj: "",
    selectProcedencia: "",
    selectEspecie: "",
    selectUf: "",
    inputMunicipio: "",
    selectTipo: "",
    inputAnoFabricacao: "",
    inputAnoModelo: "",
    selectCombustivel: "",
    selectCor: "",
    inputMarcmod: "",
    selectTipoRemarcacao: "",
    selectCiretran: "",
    selectLoja: "",
    dataLaudo: "",
    horaLaudo: "",
    inputOficio: "",
    endereco: "",
    cnpjLoja: "",
};

function TodoForm({url, handleAuth}) {

    const [data,setData] = useState(formTemplate);

    const updateFieldHandler = (key, value) => {
        setData((prevState) => {
            return{...prevState, [key]: value}
        });
    }

    const updateImageHandler = (key, value) => {
        getBase64(value)
        .then(base64 => {localStorage[key] = base64})
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    };

    const handleEnviar = (laudo) => {
        laudo.data.dataLaudo = moment().format('YYYY-MM-DD HH:mm:ss');
        laudo.data.horaLaudo = laudo.data.dataLaudo.slice(11);
        axios.get(url + "endereco/" + laudo.data.selectLoja)
        .then(({data}) => {
            tmpEndereco = `${data[0].PAR_ENDERECO}, ${data[0].PAR_NUMERO} ` +
            ` - ${data[0].PAR_BAIRRO} - ${laudo.data.selectLoja}/${data[0].PAR_UF}`;
            tmpCnpj = data[0].PAR_CNPJ;
            console.log(tmpEndereco,tmpCnpj);
            laudo.data.endereco = tmpEndereco;
            laudo.data.cnpjLoja = tmpCnpj;
            localStorage.setItem("formData",JSON.stringify(laudo));
            handleSubmit();
        })
    }

    const handleSubmit = async () => {

        const form = JSON.parse(localStorage.getItem('formData'));

        
        if(form.editID === ""){
            await axios
            .post(url + "veiculos", {
                VEI_PLACA: form.data.inputPlaca,
                VEI_RENAVAM: form.data.inputRenavam,
                VEI_CHASSI: form.data.inputChassi,
                VEI_MUNICIPIO: form.data.inputMunicipio,
                VEI_MARCMOD: form.data.inputMarcmod,
                VEI_PROCEDENCIA: form.data.selectProcedencia,
                VEI_TIPO: form.data.selectTipo,
                VEI_COR: form.data.selectCor,
                VEI_COMBUSTIVEL: form.data.selectCombustivel,
                VEI_ESPECIE: form.data.selectEspecie,
                VEI_ANO_FABRICACAO: form.data.inputAnoFabricacao,
                VEI_ANO_MODELO: form.data.inputAnoModelo,
                VEI_NUMERO_MOTOR: form.data.inputMotor,
                VEI_TIPOREMARCACAO: form.data.selectTipoRemarcacao,
                VEI_UF: form.data.selectUf,
                VEI_PROPRIETARIO: form.data.inputProprietario,
                VEI_CPF_CNPJ: form.data.inputCpfCnpj,
            })
            .then(({data}) => alert(JSON.stringify(data)))
            .catch(({data}) => alert(JSON.stringify(data)));
        } else {
            await axios
            .put(url + "veiculos/" + form.data.editID, {
                VEI_PLACA: form.data.inputPlaca,
                VEI_RENAVAM: form.data.inputRenavam,
                VEI_CHASSI: form.data.inputChassi,
                VEI_MUNICIPIO: form.data.inputMunicipio,
                VEI_MARCMOD: form.data.inputMarcmod,
                VEI_PROCEDENCIA: form.data.selectProcedencia,
                VEI_TIPO: form.data.selectTipo,
                VEI_COR: form.data.selectCor,
                VEI_COMBUSTIVEL: form.data.selectCombustivel,
                VEI_ESPECIE: form.data.selectEspecie,
                VEI_ANO_FABRICACAO: form.data.inputAnoFabricacao,
                VEI_ANO_MODELO: form.data.inputAnoModelo,
                VEI_NUMERO_MOTOR: form.data.inputMotor,
                VEI_TIPOREMARCACAO: form.data.selectTipoRemarcacao,
                VEI_UF: form.data.selectUf,
                VEI_PROPRIETARIO: form.data.inputProprietario,
                VEI_CPF_CNPJ: form.data.inputCpfCnpj,
            })
            .then(({data}) => alert(JSON.stringify(data)))
            .catch(({data}) => alert(JSON.stringify(data)));
        }

        await axios
        .post(url + "laudos", {
            LAU_DATA: form.data.dataLaudo,
            LAU_PLACA: form.data.inputPlaca,
            LAU_CHASSI: form.data.inputChassi,
            LAU_RENAVAM: form.data.inputRenavam,
            LAU_RESULTADO: "A",
            LAU_TIPO: "REMARCAÇÃO DE " + (form.data.selectTipoRemarcacao === 0 ? "CHASSI" : "MOTOR"),
            LAU_HORA: form.data.horaLaudo,
            LAU_HASH: "",
            LAU_STATUS: "U",
            LAU_MOTOR: form.data.inputMotor,
            LAU_OFICIO: form.data.inputOficio,
            LAU_CIRETRAN: form.data.selectCiretran,
        })
        .then(({data}) => {
            alert(JSON.stringify(data));
            axios(url + "laudo")
            .then(({data}) => localStorage.setItem("numeroLaudo",data[0].LAU_NUMERO))
            .then(window.open("pdf"));
        })
        .catch(({data}) => alert(JSON.stringify(data)));
    };


    const navigate = useNavigate();
    const handleLogout = () => {
        axios.get(url + "logout")
        .then(res => {
            if(res.data.Status === "Sucesso"){
                handleAuth(false);
            }
        })
        .then(location.reload(true));
    }

    const handleGoToLaudos = () => {
        navigate("/laudos");
    }
    const handleGoToCampinas = () => {
        navigate("/laudosC");
    }
    const handleGoToJundiai = () => {
        navigate("/laudosJ");
    }
    

    const formComponents = 
    [<VeiculoForm url={url} data={data} updateFieldHandler={updateFieldHandler}/>,
    <LaudoForm data={data} updateImageHandler={updateImageHandler}/>, 
    <ParametrosForm url={url} data={data} updateFieldHandler={updateFieldHandler}/>];
    const {currentStep, currentComponent, changeStep,
            isFirstStep, isLastStep} = stepFormHook(formComponents);

    return (
    <div className="form-container">
        <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                <button className="btn btn-primary btn-sm" onClick={handleGoToLaudos}>Laudos</button>
                <button className="btn btn-primary btn-sm" onClick={handleGoToCampinas}>Campinas</button>
                <button className="btn btn-primary btn-sm" onClick={handleGoToJundiai}>Jundiai</button>
        </div>
        <Steps currentStep={currentStep} />
        <form 
        onSubmit={(event) => changeStep(currentStep + 1, event)} encType="multipart/form-data">
            <div className="inputs-container">
                {currentComponent}
            </div>
            <div className="actions">
                
                {!isFirstStep && (
                    <button type="button" onClick={(e) => changeStep(currentStep - 1,e)}>
                        <GrFormPrevious />
                        <span>Voltar</span>
                    </button>
                )}
                {!isLastStep ? (
                    <button type="submit">
                        <GrFormNext />
                        <span>Avançar</span>
                    </button>
                ) : (
                    <button type="button" onClick={() => handleEnviar({data})}>
                        <FiSend />
                        <span>Enviar</span>
                    </button>
                )}
            </div>
        </form>
    </div>
    );
}

export default TodoForm;
