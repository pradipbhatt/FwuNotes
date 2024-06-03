import React from "react";

function Cards({ item }) {
  const handleReadNowClick = () => {
    window.location.href = item.pdfUrl;
  };

  return (
    <div className="mt-4 my-3 p-3 w-full">
      <div className="card w-full h-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-primary w-full ">{item.Category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.Price}</div>
            <div onClick={handleReadNowClick}>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-full border-2 border-blue-500 flex items-center gap-2">
                <span className="text-xs">Read Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
