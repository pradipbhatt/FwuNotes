import React from "react";

const UploadedList = ({ allImage, showPdf }) => {
  return (
    <div className="uploaded">
      <h4>Uploaded PDFs:</h4>
      <div className="output-div">
        {allImage == null
          ? "No PDFs uploaded"
          : allImage.map((data) => (
              <div key={data.id} className="inner-div">
                <h6>Title: {data.title}</h6>
                <button onClick={() => showPdf(data.pdf)}>
                  Show PDF
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UploadedList;
