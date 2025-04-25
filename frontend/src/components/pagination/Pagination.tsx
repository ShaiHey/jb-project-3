import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, goToPage }: PaginationProps): JSX.Element {
    return (
        <div className="Pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination;