import { Pagination } from "react-bootstrap";

const TablePagination = ({pagination, dataFetch }) => {
    return (
        <>
        {
            pagination ? 
            <Pagination className="float-end">
                {
                    pagination.currentPage > 1 ? 
                    // Render First and Previous buttons if current page is not the first page
                    <>
                    <Pagination.First onClick={(e) => {
                        e.preventDefault();
                        dataFetch({page: 1}); // Fetch data for the first page
                    }} />
                    <Pagination.Prev 
                        onClick={(e) => {
                            e.preventDefault();
                            dataFetch({page: (+pagination.currentPage - 1)}); // Fetch data for the previous page
                        }} 
                    />
                    </>
                    : <></> // Otherwise, render nothing
                }

                {
                    // Map through the number of pages and render a Pagination.Item for each page
                    [...Array(pagination.pages)].map((item, ind) => (
                        <Pagination.Item 
                            key={ind} 
                            active={+pagination.currentPage === (ind+1) ? true : false} // Highlight the active page
                            onClick={(e) => {
                                e.preventDefault();
                                dataFetch({page: (ind+1)}); // Fetch data for the clicked page
                            }}   
                        >
                            {ind+1}
                        </Pagination.Item>
                    ))
                }
                
                {
                    pagination.currentPage < pagination.pages ? 
                    // Render Next and Last buttons if current page is not the last page
                    <>
                    <Pagination.Next onClick={(e) => {
                        e.preventDefault();
                        dataFetch({page: (+pagination.currentPage + 1)}); // Fetch data for the next page
                    }} />
                    <Pagination.Last 
                        onClick={(e) => {
                            e.preventDefault();
                            dataFetch({page: pagination.pages}); // Fetch data for the last page
                        }} 
                    />
                    </>
                    : <></> // Otherwise, render nothing
                }
            </Pagination> 
            : <></> // If no pagination data is available, render nothing
        }
        </>
    );
}

export default TablePagination;
