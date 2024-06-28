import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker path for PDF.js
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

        if (window.innerWidth > 1024) {
          setScale(2); // Large devices
        } else if (window.innerWidth > 768) {
          setScale(1.1); // Tablets
        } else {
          setScale(0.7); // Mobile devices
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pdf-container h-full p-1 sm:p-6 lg:p-20 flex flex-col items-center justify-start overflow-y-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Inline styles for hiding scrollbar
    >
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-1">
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
