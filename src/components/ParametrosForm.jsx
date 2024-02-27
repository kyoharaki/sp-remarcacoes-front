import {useState, useEffect} from "react";
import axios from "axios";

const ParametrosForm = ({url, data, updateFieldHandler}) => {

    const[ciretran,setCiretran] = useState([]);

    const[loja,setLoja] = useState([]);

    useEffect(() => {
        axios(url + "ciretran")
        .then(({data})=>setCiretran(data));
    },[]);

    useEffect(() => {
        axios(url + "loja")
        .then(({data})=>setLoja(data));
    },[]);

    return (
        <div>
            <div className="col-12">
                <label className="form-label" htmlFor="select-ciretran">CIRETRAN</label>
                <select className="form-control" name="selectCiretran" id="select-ciretran"
                value={data.selectCiretran || ""}
                onChange={(e) => updateFieldHandler("selectCiretran", e.target.value)}>
                    <option key="--ciretran--" value="">--CIRETRAN--</option>
                    {ciretran.map(item => <option key={item.CODIGO}>
                        {item.CODIGO} - {item.DESCRICAO}</option>)}
                </select>
            </div>
            <div className="row g-3">
                <div className="col-4">
                    <label className="form-label" htmlFor="select-loja">Loja</label>
                    <select className="form-control" name="selectLoja" id="select-loja"
                    value={data.selectLoja || ""}
                    onChange={(e) => updateFieldHandler("selectLoja", e.target.value)}>
                        <option key="--loja--" value="">--Loja--</option>
                        {loja.map(item => <option key={item.PAR_CEP}>
                            {item.PAR_MUNICIPIO}</option>)}
                    </select>
                </div>
                <div className="col-4">
                    <label className="form-label" htmlFor="input-oficio">Ofício</label>
                    <input className="form-control" type="text" name="inputOficio" id="input-oficio" 
                    value={data.inputOficio || ""}
                    onChange={(e) => updateFieldHandler("inputOficio", e.target.value)}/>
                </div>
            </div>
        </div>
    );
}

export default ParametrosForm;