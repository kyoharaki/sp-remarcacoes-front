import {useState, useEffect} from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const VeiculoForm = ({ url, data, updateFieldHandler }) => {

    const procedencia = [
        {"DESCRICAO" : "NACIONAL"},
        {"DESCRICAO" : "IMPORTADO"}];
    const tipoRemarcacao = [
        {"CODIGO": 0, "DESCRICAO": "CHASSI"},
        {"CODIGO": 1, "DESCRICAO": "MOTOR"}];
    const uf = [
        {"UF": "AC"},
        {"UF": "AL"},
        {"UF": "AP"},
        {"UF": "AM"},
        {"UF": "BA"},
        {"UF": "CE"},
        {"UF": "DF"},
        {"UF": "ES"},
        {"UF": "GO"},
        {"UF": "MA"},
        {"UF": "MT"},
        {"UF": "MS"},
        {"UF": "MG"},
        {"UF": "PA"},
        {"UF": "PB"},
        {"UF": "PR"},
        {"UF": "PE"},
        {"UF": "PI"},
        {"UF": "RJ"},
        {"UF": "RN"},
        {"UF": "RS"},
        {"UF": "RO"},
        {"UF": "RR"},
        {"UF": "SC"},
        {"UF": "SP"},
        {"UF": "SE"},
        {"UF": "TO"},
    ];

    const[cores,setCores] = useState([]);
    const[combustiveis,setCombustivel] = useState([]);
    const[tipos,setTipo] = useState([]);
    const[especies,SetEspecie] = useState([]);

    const[completar,SetCompletar] = useState([]);

    useEffect(() => {
        axios(url + "cores")
        .then(({data})=>setCores(data));
        axios(url + "combustivel")
        .then(({data})=>setCombustivel(data));
        axios(url + "tipo")
        .then(({data})=>setTipo(data));
        axios(url + "especie")
        .then(({data})=>SetEspecie(data));
    },[]);

    const updateFieldsHandler = (item) => {
        if(item !== undefined){
            updateFieldHandler("editID", item.VEI_ID);
            updateFieldHandler("inputPlaca", item.VEI_PLACA);
            updateFieldHandler("inputRenavam", item.VEI_RENAVAM);
            updateFieldHandler("inputChassi", item.VEI_CHASSI);
            updateFieldHandler("inputMotor", item.VEI_NUMERO_MOTOR);
            updateFieldHandler("inputProprietario", item.VEI_PROPRIETARIO);
            updateFieldHandler("inputCpfCnpj", item.VEI_CPF_CNPJ);
            updateFieldHandler("selectProcedencia", item.VEI_PROCEDENCIA);
            updateFieldHandler("selectEspecie", item.VEI_ESPECIE);
            updateFieldHandler("selectUf", item.VEI_UF);
            updateFieldHandler("inputMunicipio", item.VEI_MUNICIPIO);
            updateFieldHandler("selectTipo", item.VEI_TIPO);
            updateFieldHandler("inputAnoFabricacao", item.VEI_ANO_FABRICACAO);
            updateFieldHandler("inputAnoModelo", item.VEI_ANO_MODELO);
            updateFieldHandler("selectCombustivel", item.VEI_COMBUSTIVEL);
            updateFieldHandler("selectCor", item.VEI_COR);
            updateFieldHandler("inputMarcmod", item.VEI_MARCMOD);
            updateFieldHandler("selectTipoRemarcacao", 
            item.VEI_TIPOREMARCACAO === 0 ? "0" : "1");
        } else{
            updateFieldHandler("editID","");
            updateFieldHandler("inputRenavam", "");
            updateFieldHandler("inputChassi", "");
            updateFieldHandler("inputMotor", "");
            updateFieldHandler("inputProprietario", "");
            updateFieldHandler("inputCpfCnpj", "");
            updateFieldHandler("selectProcedencia", "");
            updateFieldHandler("selectEspecie", "");
            updateFieldHandler("selectUf", "");
            updateFieldHandler("inputMunicipio", "");
            updateFieldHandler("selectTipo", "");
            updateFieldHandler("inputAnoFabricacao", "");
            updateFieldHandler("inputAnoModelo", "");
            updateFieldHandler("selectCombustivel", "");
            updateFieldHandler("selectCor", "");
            updateFieldHandler("inputMarcmod", "");
        }
    }

    const otherFieldsTrigger = async () => {
        const placa = data.inputPlaca;
        axios(url + "veiculo/" + placa)
        .then(({data}) => SetCompletar(data));
        updateFieldsHandler(completar[0]);
    }

    return (
        <div>
            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label" htmlFor="input-placa">Placa</label>
                    <input className="form-control" type="text" name="inputPlaca" id="input-placa" 
                    value={data.inputPlaca} required
                    onChange={(e) => updateFieldHandler("inputPlaca", e.target.value)}/>
                </div>
                <div className="col-md-1">
                    <label className="form-label" htmlFor="procurar-placa">...</label>
                    <button type="button" id="procurar-placa" 
                    className="btn btn-primary btn-sm" onClick={() => otherFieldsTrigger()}>
                        <FaSearch />
                    </button>
                </div>
                <div className="col-md-4">
                    <label className="form-label" htmlFor="input-renavam">Renavam</label>
                    <input className="form-control" type="text" name="inputRenavam" id="input-renavam" 
                    value={data.inputRenavam || ""} required
                    onChange={(e) => updateFieldHandler("inputRenavam", e.target.value)}/>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="input-chassi">Nº Chassi</label>
                    <input className="form-control" type="text" name="inputChassi" id="input-chassi" 
                    value={data.inputChassi || ""} required
                    onChange={(e) => updateFieldHandler("inputChassi", e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="input-motor">Nº Motor</label>
                    <input className="form-control" type="text" name="inputMotor" id="input-motor" 
                    value={data.inputMotor || ""}
                    onChange={(e) => updateFieldHandler("inputMotor", e.target.value)}/>
                </div>
            </div>
            <div className="col-12">
                <label className="form-label" htmlFor="input-proprietario">Proprietario</label>
                <input className="form-control" type="text" name="inputProprietario" id="input-proprietario" 
                value={data.inputProprietario || ""}
                onChange={(e) => updateFieldHandler("inputProprietario", e.target.value)}/>
            </div>
            <div className="col-8">
                <label className="form-label" htmlFor="input-cpf-cnpj">CPF/CNPJ</label>
                <input className="form-control" type="text" name="inputCpfCnpj" id="input-cpf-cnpf" 
                value={data.inputCpfCnpj || ""}
                onChange={(e) => updateFieldHandler("inputCpfCnpj", e.target.value)}/>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="select-procedencia">Procedência</label>
                    <select className="form-control" name="selectProcedencia" id="select-procedencia"
                    value={data.selectProcedencia || ""}
                    onChange={(e) => updateFieldHandler("selectProcedencia", e.target.value)}>
                        <option key="--procedencia--" value="">--Procedência--</option>
                        {procedencia.map(item => <option key={item.DESCRICAO}>{item.DESCRICAO}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="select-especie">Espécie</label>
                    <select className="form-control" name="selectEspecie" id="select-especie"
                    value={data.selectEspecie || ""}
                    onChange={(e) => updateFieldHandler("selectEspecie", e.target.value)}>
                        <option key="--especie--" value="">--Espécie--</option>
                        {especies.map(item => <option key={item.CODIGO}>{item.DESCRICAO}</option>)}
                    </select>                
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-2">
                <label className="form-label" htmlFor="select-uf">UF</label>
                    <select className="form-control" name="selectUf" id="select-uf"
                    value={data.selectUf || ""}
                    onChange={(e) => updateFieldHandler("selectUf", e.target.value)}>
                        <option key="--uf--" value="">--UF--</option>
                        {uf.map(item => <option key={item.UF}>{item.UF}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="input-municipio">Cidade</label>
                    <input className="form-control" type="text" name="inputMunicipio" id="input-municipio" 
                    value={data.inputMunicipio || ""}
                    onChange={(e) => updateFieldHandler("inputMunicipio", e.target.value)}/>                
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="select-tipo">Tipo</label>
                    <select className="form-control" name="selectTipo" id="select-tipo"
                    value={data.selectTipo || ""}
                    onChange={(e) => updateFieldHandler("selectTipo", e.target.value)}>
                        <option key="--tipo--" value="">--Tipo--</option>
                        {tipos.map(item => <option key={item.CODIGO}>{item.DESCRICAO}</option>)}
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label" htmlFor="input-ano-fabricacao">Fabric.</label>
                    <input className="form-control" type="text" name="inputAnoFabricacao" id="input-ano-fabricacao" 
                    value={data.inputAnoFabricacao || ""}
                    onChange={(e) => updateFieldHandler("inputAnoFabricacao", e.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label className="form-label" htmlFor="input-ano-modelo">Modelo</label>
                    <input className="form-control" type="text" name="inputAnoModelo" id="input-ano-modelo" 
                    value={data.inputAnoModelo || ""}
                    onChange={(e) => updateFieldHandler("inputAnoModelo", e.target.value)}/>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="select-combustivel">Combustível</label>
                    <select className="form-control" name="selectCombustivel" id="select-combustivel"
                    value={data.selectCombustivel || ""}
                    onChange={(e) => updateFieldHandler("selectCombustivel", e.target.value)}>
                        <option key="--combustivel--" value="">--Combustível--</option>
                        {combustiveis.map(item => <option key={item.CODIGO}>{item.DESCRICAO}</option>)}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="select-cor">Cor</label>
                    <select className="form-control" name="selectCor" id="select-cor"
                    value={data.selectCor || ""}
                    onChange={(e) => updateFieldHandler("selectCor", e.target.value)}>
                        <option key="--cor--" value="">--Cor--</option>
                        {cores.map(item => <option key={item.CODIGO}>{item.DESCRICAO}</option>)}
                    </select>
                </div>
            </div>
            <div className="col-12">
                <label className="form-label" htmlFor="input-marcmod">Marca/Modelo</label>
                <input className="form-control" type="text" name="inputMarcmod" id="input-marcmod" 
                value={data.inputProprietario || ""}
                onChange={(e) => updateFieldHandler("inputMarcmod", e.target.value)}/>
            </div>
            <div className="col-4">
                <label className="form-label" htmlFor="select-tipo-remarcacao">Tipo de Remarcação</label>
                <select className="form-control" name="selectTipoRemarcacao" id="select-tipo-remarcacao"
                value={data.selectTipoRemarcacao === "0"
                        ? "0"
                        : data.selectTipoRemarcacao === "1"
                            ? "1"
                            : ""}
                
                required
                onChange={(e) => updateFieldHandler("selectTipoRemarcacao", e.target.value)}>
                    <option key="--tiporemarc--" value="">----</option>                    
                    {tipoRemarcacao.map(item => <option key={item.CODIGO} value={item.CODIGO}>{item.DESCRICAO}</option>)}
                </select>
            </div>
        </div>
    );
}

export default VeiculoForm;