
export default function DictionaryPagination({ pageNumbers, paginate }) {
  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div key={number} className="page-item">
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </div>
      ))}
    </div>
  );
}
