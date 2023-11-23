
export default function DictionaryPagination({ pageNumbers, paginate }) {
  return (
    <div>
      {pageNumbers.map((number) => (
        <span key={number}>
          <button onClick={() => paginate(number)}>
            {number}
          </button>
        </span>
      ))}
    </div>
  );
}
