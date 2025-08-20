import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const PDFViewer = ({ documentUrl, pageNumber, setPageNumber }) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="w-1/2 border-l border-gray-700 bg-gray-800 flex flex-col">
            {/* <div className="p-2 text-center border-b border-gray-700 bg-gray-800">
                <h6 className="font-medium">Document Viewer</h6>
            </div> */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-900">
                {documentUrl ? (
                    <div>
                        <Document
                            file={documentUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={console.error}
                            className="pdf-document"
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        {numPages && (
                            <div className='flex justify-center mt-6'>
                                <button className="btn-primary" onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))}>
                                    Previous Page
                                </button>
                                <p className='text-center mx-3 flex items-center'>
                                    Page {pageNumber} of {numPages}
                                </p>
                                <button className="btn-primary" onClick={() => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages))}>
                                    Next Page
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                        <p>PDF viewer will be displayed here</p>
                        <p className="text-sm mt-2">No PDF url found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PDFViewer


