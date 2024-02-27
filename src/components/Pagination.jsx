import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = (props)=>{
    const {currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.totalPages-1;
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (index)=>{
        props.onPageChange(index);
    }

    const handleNextEllipseClick = ()=>{
        props.onNextEllipseClick();
    }

    const handlePrevEllipseClick = ()=>{
        props.onPrevEllipseClick();
    }

    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
        return(
            <li key={page}
            className={`page-item ${currentPage === page
                ? "active" : ""}`}>
            <a href="#" className="page-link"  id={page}
                        onClick={()=>handlePageClick(page)}>
            {page}
            </a>
        </li>
            );
        }else{
            return null;
        }
    });

    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li className="page-item">
            <a href="#" className="page-link" onClick={handleNextEllipseClick}>&hellip;</a></li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li className="page-item">
        <a href="#" className="page-link" onClick={handlePrevEllipseClick}>&hellip;</a></li>
    }

    return (
        <nav>
            <ul className="pagination"> 
               <li className="page-item">
                   <a href="#" className="page-link" 
                   onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</a>
               </li>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
                <li className="page-item">
                   <a href="#" className="page-link" 
                   onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</a>
               </li>
            </ul>
        </nav>
    )
}
export default Pagination;