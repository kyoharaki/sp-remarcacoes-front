import { useState } from "react";

export function menuPageHook(pages) {
    const [currentPage, setCurrentPage] = useState(0);

    function changePage(index,event){
        if(event) event.preventDefault();

        if(index < 0 || index >= pages.length) return;

        setCurrentPage(index);
    };

    return {
        currentPage,
        currentComponent: pages[currentPage],
        changePage,
        isFirstPage: currentPage === 0 ? true : false,
        isLastPage: currentPage + 1 === pages.length ? true : false,
    };
}