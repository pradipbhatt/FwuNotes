import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfComp = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / (window.innerWidth > 1024 ? 1200 : 900)); // Adjust scale based on screen width
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pdf-container h-full p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-start overflow-y-auto"
    >
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-4">
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={scale}
              className="mx-auto"
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfComp;
