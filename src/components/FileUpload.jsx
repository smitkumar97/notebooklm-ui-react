import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../services/pdf.service';

const FileUpload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setError(null);
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF file only.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert('Please upload a PDF file only.');
        }
    };

    const handleUpload = async () => {
        if (file && !isLoading) {
            try {
                setIsLoading(true);
                setError(null);

                const response = await uploadFile(file);
                navigate(`/document/${response?.data?.docId}`);
            } catch (err) {
                console.error('Upload error:', err);
                setError(err.message || 'Failed to upload file');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const resetState = () => {
        setFile(null);
        setError(null);
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-center">NotebookLM</h1>
                <p className="text-gray-400 mb-8 text-center">Upload a PDF to get started</p>
                {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-blue-500 hover:bg-gray-700 ${isLoading ? 'border-gray-700 hover:border-gray-600 cursor-not-allowed pointer-events-none' : ''}  ${isDragging ? 'border-blue-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <svg
                            className={`w-12 h-12 ${isDragging ? 'text-blue-400' : 'text-gray-500'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>

                        <p className="text-sm text-gray-400">
                            {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here or click to browse'}
                        </p>
                    </div>
                </div>

                {file && (
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <svg
                                className="w-6 h-6 text-red-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="truncate text-gray-300">{file.name}</span>
                        </div>
                        <button
                            onClick={() => resetState()}
                            disabled={!file && isLoading}
                            className={`text-gray-400 hover:text-gray-200 ${file && !isLoading ? '' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file && isLoading}
                    className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${file && !isLoading
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 cursor-not-allowed'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Upload & Process'
                    )}
                </button>
            </div>
        </div>
    );
};

export default FileUpload;