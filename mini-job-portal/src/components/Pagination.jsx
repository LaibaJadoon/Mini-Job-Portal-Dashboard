import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null; // Hide if only one page

  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handlePrev = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);

  const startPage = Math.max(1, currentPage - 1);
  const pagesToShow = Array.from({ length: 3 }, (_, i) => startPage + i).filter(
    (page) => page <= totalPages
  );

  return (
    <div className="mt-8 flex flex-wrap justify-center items-center gap-1 sm:gap-2">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#064420] text-white rounded disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#064420] text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded border ${
            currentPage === page
              ? "bg-[#064420] text-white border-[#064420]"
              : "border-[#064420] text-[#064420] bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#064420] text-white rounded disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#064420] text-white rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}
