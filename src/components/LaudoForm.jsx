import { useState } from "react";

const LaudoForm = ({ data, updateImageHandler }) => {


    // Declarar a variável para receber a imagem
    const [imagemDianteira, setImagemDianteira] = useState();
    const [imagemTraseira, setImagemTraseira] = useState();
    const [imagemAntes, setImagemAntes] = useState();
    const [imagemDepois, setImagemDepois] = useState();

    return (
        <div className="form-imagens">
            <div className="col-12">
                <label className="form-label" htmlFor="imagem-dianteira">Dianteira: </label>
                <input className="form-control" type="file" name="imagemDianteira" id="imagem-dianteira"
                onChange={(e) => {updateImageHandler("imagem-dianteira",e.target.files[0]);
                                    setImagemDianteira(e.target.files[0])}}/>
            </div>
            <div className="col-12">
                <label  className="form-label" htmlFor="imagem-traseira">Traseira: </label>
                <input  className="form-control" type="file" name="imagemTraseira" id="imagem-traseira"
                onChange={(e) => {updateImageHandler("imagem-traseira",e.target.files[0]);
                setImagemTraseira(e.target.files[0])}}/>
            </div>
            <div className="col-12">
                <label className="form-label" htmlFor="imagem-antes">{data.selectTipoRemarcacao === "0"
                                                ? "Chassi " : "Motor "} Antes: </label>
                <input className="form-control" type="file" name="imagemAntes" id="imagem-antes"
                onChange={(e) => {updateImageHandler("imagem-antes",e.target.files[0]);
                setImagemAntes(e.target.files[0])}}/>
            </div>
            <div className="col-12">
                <label className="form-label" htmlFor="imagem-depois">{data.selectTipoRemarcacao === "0"
                                                ? "Chassi " : "Motor "} Depois: </label>
                <input className="form-control" type="file" name="imagemDepois" id="imagem-depois"
                onChange={(e) => {updateImageHandler("imagem-depois",e.target.files[0]);
                setImagemDepois(e.target.files[0])}}/>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="preview-dianteira">Dianteira</label>
                    <img className="preview-imagem form-control"
                    src={imagemDianteira ? URL.createObjectURL(imagemDianteira) 
                    : localStorage.getItem("imagem-dianteira")} 
                    id="preview-dianteira"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="preview-traseira">Traseira</label>
                    <img className="preview-imagem form-control"
                    src={imagemTraseira ? URL.createObjectURL(imagemTraseira) 
                    : localStorage.getItem("imagem-traseira")} 
                    id="preview-traseira"/>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="preview-antes">{data.selectTipoRemarcacao === "0"
                                                ? "Chassi " : "Motor "}
                    Antes</label>
                    <img className="preview-imagem form-control"
                    src={imagemAntes ? URL.createObjectURL(imagemAntes) 
                    : localStorage.getItem("imagem-antes")} 
                    id="preview-antes"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="preview-depois">{data.selectTipoRemarcacao === "0"
                                                ? "Chassi " : "Motor "}
                    Depois</label>
                    <img className="preview-imagem form-control"
                    src={imagemDepois ? URL.createObjectURL(imagemDepois) 
                    : localStorage.getItem("imagem-depois")} 
                    id="preview-depois"/>
                </div>
            </div>
        </div>
    );
}

export default LaudoForm;