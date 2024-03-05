import "./LaudoGrid.css";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import Pagination from "./Pagination";

const LaudoGrid = ({url, handleAuth}) => {

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

    const handleGoToRemarcar = () => {
        navigate("/");
    }

    const [laudos, setLaudos] = useState([]);
    const [laudosInalterados, setLaudosInalterados] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);
    const pageNumberLimit = 5;

    const itemsPerPage = 20;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const numPages = Math.ceil(laudos.length / itemsPerPage);

    let lista = laudos.slice(firstIndex, lastIndex);

    const getLaudos = async () => {
        try {
          const res = await axios.get(url + "laudos");
          setLaudos(res.data.sort((a,b) => (a.LAU_NUMERO < b.LAU_NUMERO ? 1 : -1)));
        } catch (error){
          alert(error);
        }
    };

    useEffect(() => {
        axios.get(url + "laudos")
        .then(res => {
            setLaudos(res.data.sort((a,b) => (a.LAU_NUMERO < b.LAU_NUMERO ? 1 : -1)))
            setLaudosInalterados(res.data.sort((a,b) => (a.LAU_NUMERO < b.LAU_NUMERO ? 1 : -1)))
        });
    }, []);

    const handleStatus = async (laudo,status) => {
        await axios
        .put(url + "laudos/" + laudo, {
            LAU_STATUS: status,
        })
        .then(({data}) => alert(JSON.stringify(data)))
        .catch(({data}) => alert(JSON.stringify(data)));
        getLaudos();
    };

    const Filter = (filtro) => {
        setLaudos(laudosInalterados.filter(f => f.LAU_PLACA.includes(filtro.toUpperCase())));
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    const onPrevClick = ()=>{
        if( currentPage -1 <= 0) return;

        if((currentPage-1) % pageNumberLimit === 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev=> prev-1)
    }

    const onNextClick = ()=>{
        if( currentPage + 1 > numPages) return;

        if(currentPage+1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev=>prev+1);
    }

    const onPrevEllipseClick = ()=>{
        if( currentPage -5 <= 0) return;

        if((currentPage-5) < minPageLimit){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev=> prev-5);
    }

    const onNextEllipseClick = ()=>{
        if( currentPage + 5 > numPages) return;

        if(currentPage+5 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev=>prev+5);
    }

    const paginationAttributes = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        totalPages: numPages,
    };

    return (
        <div className="laudo-grid">
            <div class="d-grid gap-2 d-md-flex justify-content-center">
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                <button className="btn btn-primary btn-sm" onClick={handleGoToRemarcar}>Remarcar</button>
            </div>
            <div className="filtro-box">
                <label htmlFor="filtro-placa">PLACA</label>
                <input type="text" className="filtro" name="filtro-placa"
                onChange={(e) => Filter(e.target.value)}/>
            </div>
        <table className="table table-hover">
        <thead>
            <tr>
            <th>ID</th>
            <th>PLACA</th>
            <th>RENAVAM</th>
            <th>NºCHASSI</th>
            <th>NºMOTOR</th>
            <th>STATUS</th>
            <th>DOWNLOAD</th>
            <th />
            </tr>
        </thead>
        <tbody>
        {lista.map((item,i) => (
            <tr key={i}>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>
                    {`000000${item.LAU_NUMERO}`.slice(-6)}
                </td>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>{item.LAU_PLACA}</td>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>{item.LAU_RENAVAM}</td>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>{item.LAU_CHASSI}</td>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>{item.LAU_MOTOR}</td>
                <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>{item.LAU_STATUS}</td>
     
                {item.LAU_STATUS === "U"
                ? item.LAU_NUMERO < 2483 ?
                    <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>
                    <a href={url + "download/d" + item.LAU_PLACA.toLowerCase()
                    + `000000${item.LAU_NUMERO}`.slice(-6) + ".pdf"} 
                    target="_blank" rel="noopener noreferrer">
                        Doc.</a><br/>
                    <a href={url + "download/l" + item.LAU_PLACA.toLowerCase()
                    + `000000${item.LAU_NUMERO}`.slice(-6) + ".pdf"} 
                    target="_blank" rel="noopener noreferrer">
                        Laudo</a>
                    </td> 
                    : 
                    <td className={item.LAU_STATUS === "C" ? "bg-danger" : ""}>
                    <a href={url + "download/" + item.LAU_PLACA.toLowerCase()
                    + `000000${item.LAU_NUMERO}`.slice(-6) + ".pdf"} 
                    target="_blank" rel="noopener noreferrer">
                        Laudo
                    </a></td>
                : <td className="bg-danger">-----</td>}

                {item.LAU_STATUS === "C"
                ? <td className="react-icons bg-danger">
                    <FaCheck onClick={() => handleStatus(item.LAU_NUMERO,"U")}/></td>
                : <td className="react-icons">
                    <FaTrash onClick={() => handleStatus(item.LAU_NUMERO,"C")}/></td>}

            </tr>
        ))}
        </tbody>
        </table>
        <Pagination {...paginationAttributes} 
                    onPrevClick={onPrevClick} 
                    onNextClick={onNextClick}
                    onPageChange={onPageChange}
                    onPrevEllipseClick={onPrevEllipseClick} 
                    onNextEllipseClick={onNextEllipseClick}/>
        </div>
    );
};

export default LaudoGrid;