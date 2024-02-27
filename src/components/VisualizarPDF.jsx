import "./VisualizarPDF.css";
import moment from 'moment';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useEffect } from "react";

const VisualizarPDF = () => {

    const formData = JSON.parse(localStorage.getItem('formData')) || null;
    const laudo = localStorage.getItem('numeroLaudo') || "";
    const imagemDianteira = localStorage.getItem('imagem-dianteira') || "";
    const imagemTraseira = localStorage.getItem('imagem-traseira') || "";
    const imagemAntes = localStorage.getItem('imagem-antes') || "";
    const imagemDepois = localStorage.getItem('imagem-depois') || "";

    let placa, renavam, chassi, motor, 
        proprietario, cpfCnpj, procedencia, especie, uf,
        municipio, tipo, anoFabricacao, anoModelo,
        combustivel, cor, marcmod, tipoRemarcacao,
        ciretran, loja, data, oficio;
    placa = renavam = chassi = motor = 
    proprietario = cpfCnpj = procedencia = especie = uf =
    municipio = tipo = anoFabricacao = anoModelo =
    combustivel = cor = marcmod = tipoRemarcacao =
    ciretran = loja = data = oficio = "";

    if(formData !== null){
        placa = formData.data.inputPlaca;
        renavam = formData.data.inputRenavam;
        chassi = formData.data.inputChassi;
        motor = formData.data.inputMotor;
        proprietario = formData.data.inputProprietario;
        cpfCnpj = formData.data.inputCpfCnpj;
        procedencia = formData.data.selectProcedencia;
        especie = formData.data.selectEspecie;
        uf = formData.data.selectUf;
        municipio = formData.data.selectMunicipio;
        tipo = formData.data.selectTipo;
        anoFabricacao = formData.data.inputAnoFabricacao;
        anoModelo = formData.data.inputAnoModelo;
        combustivel = formData.data.selectCombustivel;
        cor = formData.data.selectCor;
        marcmod = formData.data.selectMarcmod;
        tipoRemarcacao = formData.data.selectTipoRemarcacao === "0" ? "CHASSI" : "MOTOR";
        ciretran = formData.data.selectCiretran;
        loja = formData.data.selectLoja;
        data = moment(formData.data.dataLaudo).format("DD/MM/YYYY");
        oficio = formData.data.inputOficio;
    };

    const handlePdf = async () => {
        const elementPdf = document.querySelector(".pdf");
        const canvas = await html2canvas(elementPdf);
        const imgData = canvas.toDataURL("img/png");
        const pdf = new jsPDF("p","px","a4");
        pdf.addImage(imgData,"PNG",15,15);
        const file = pdf.output("blob");

        const formData = new FormData();
        const filename = placa.toLowerCase() + `000000${laudo}`.slice(-6) + ".pdf";
        formData.append("file",file,filename);

        axios.post("http://localhost:8800/upload", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    };

    useEffect(() => {
        if(laudo !== ""){
            handlePdf();
        }
    });

    return (
        <div className="App">
            <div className="page">
                {/* <button type="button" encType="multipart/form-data"
                onClick={() => handlePdf()}>
                    <span>Enviar</span>
                </button> */}
                <div className="pdf">
                    <div className="banner">
                        <div className="logo-img">
                            <img src="/img/logo.png"/>
                        </div>
                        <div className="titulo">
                            <h1>SP REMARCAÇÕES</h1>
                            <h2>CNPJ: 14.026.726/0002-99</h2>
                            <h2>REMARCAÇÃO DE {tipoRemarcacao}</h2>
                        </div>
                        <div className="remarcado-box">
                            <h3>REMARCADO</h3>
                        </div>
                    </div>
                    <div className="dados-laudo">
                        <div className="dados-laudo-titulo">
                            <p>LAUDO Nº</p>
                        </div>
                        <div className="dados-laudo-info">
                            <p>{laudo}</p>
                        </div>
                        <div className="dados-laudo-titulo">
                            <p>DATA</p>
                        </div>
                        <div className="dados-laudo-info">
                            <p>{data}</p>
                        </div>
                        <div className="dados-laudo-titulo">
                            <p>OFÍCIO Nº </p>
                        </div>
                        <div className="dados-laudo-info">
                            <p>{oficio}</p>
                        </div>
                        <div className="dados-laudo-titulo">
                            <p>CIRETRAN </p>
                        </div>
                        <div className="dados-laudo-info">
                            <p>{ciretran}</p>
                        </div>
                    </div>


                    <div className="informacao-box">
                        <p>Prezado Senhores,</p>
                        <p>Informamos que foi remarcada a numeração original
                            do veículo conforme documento de Autorização da&nbsp;
                            {ciretran.split("-")[0].replace(" ","")}ª 
                            CIRETRAN DE {ciretran.split("-")[1]}.
                        </p>
                    </div>

                    <div className="dados-laudo">
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>PROPRIETÁRIO</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{proprietario}</p>
                            </div>
                        </div>
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>CPF/CNPJ</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{cpfCnpj}</p>
                            </div>
                        </div>
                    </div>

                    <div className="dados-laudo">
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>PLACA</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{placa}</p>
                            </div>
                        </div>
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>RENAVAM</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{renavam}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dados-laudo">
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>CHASSI</p>
                                <p>MOTOR</p>
                                <p>TIPO</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{chassi}</p>
                                <p>{motor}</p>
                                <p>{tipo}</p>
                            </div>
                        </div>
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>CIDADE/UF</p>
                                <p>PROCEDÊNCIA</p>
                                <p>FABRI./MODELO</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{municipio}/{uf}</p>
                                <p>{procedencia}</p>
                                <p>{anoFabricacao}/{anoModelo}</p>
                            </div>
                        </div>
                        <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>ESPÉCIE</p>
                                <p>COMBUSTÍVEL</p>
                                <p>COR</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{especie}</p>
                                <p>{combustivel}</p>
                                <p>{cor}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dados-laudo">
                            <div className="dados-laudo-titulo">
                                <p>MARCA/MODELO</p>
                            </div>
                            <div className="dados-laudo-info">
                                <p>{marcmod}</p>
                            </div>
                        </div>
                    <div className="fotos-laudo">
                            <div className="fotos-laudo-content">
                                <p>DIANTEIRA</p>
                                <img src={imagemDianteira || "/img/logo.png"} />
                            </div>
                            <div className="fotos-laudo-content">
                                <p>TRASEIRA</p>
                                <img src={imagemTraseira || "/img/logo.png"} />
                            </div>
                    </div>
                    <div className="fotos-laudo">
                            <div className="fotos-laudo-content">
                                <p>{tipoRemarcacao} ANTES</p>
                                <img src={imagemAntes || "/img/logo.png"} />
                            </div>
                            <div className="fotos-laudo-content">
                                <p>{tipoRemarcacao} DEPOIS</p>
                                <img src={imagemDepois || "/img/logo.png"} />
                            </div>
                    </div>
                    <div className="decalque">
                            <h3>DECALQUE DO {tipoRemarcacao} APÓS REMARCAÇÃO</h3>
                    <div className="decalque-box"/>
                    </div>
                    <div className="rodape">
                        <p>{loja}, {data}</p>
                        <p>SP REMARCAÇÕES</p>
                        <p>CNPJ: 14.026.726/0002-99</p>
                    </div>
                    {/* espaço para assinar */}
                </div>
            </div>
        </div>
    );
}

export default VisualizarPDF;