import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllDocuments, getPdfUrl } from '../services/pdf.service';
import PDFViewer from './PDFViewer';
import ChatInterface from './ChatInterface';

const Layout = () => {
    const { id } = useParams();

    const [document, setDocument] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getPdfUrl(id);
                setDocument(response?.data?.data);
            } catch (error) {
                setDocument(null);
                console.error(error);
            }
        };
        fetchDocument();
    }, [id])

    useEffect(() => {
        if (documentList.length === 0) {
            const fetchAllDocuments = async () => {
                try {
                    const response = await getAllDocuments();
                    setDocumentList(response?.data?.data);
                } catch (error) {
                    console.error(error);
                }
            }

            fetchAllDocuments();
        }
    }, [])


    if (!document) return <>No document found</>
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <header className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
                <h1 className="text-lg font-semibold">{document?.name || 'Document'}</h1>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 cursor-pointer`}
                >
                    <Link
                        to="/"
                        className="text-md font-bold tracking-tight"
                    >
                        New Upload
                    </Link>

                </button>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Chat Interface - Right Panel */}
                <ChatInterface suggestedQuestions={document.questions} docId={id} setPageNumber={setPageNumber} />

                {/* PDF Viewer - Left Panel */}
                <PDFViewer documentUrl={document?.publicURL} pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
        </div>
    );
};

export default Layout;