
import { useState } from "react";
import { X, Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Document as PDFDocument, Page, pdfjs } from "react-pdf";
import { Document } from "@/pages/Index";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

export const DocumentViewer = ({ document, onClose }: DocumentViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.fileName;
    link.click();
  };

  const isPDF = document.fileType.includes('pdf');
  const isImage = document.fileType.includes('image');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold truncate pr-4">
            {document.fileName}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isPDF && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setScale(prev => Math.max(0.5, prev - 0.2))}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setScale(prev => Math.min(2.0, prev + 0.2))}
                  disabled={scale >= 2.0}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-[70vh] overflow-auto bg-gray-100 flex justify-center">
            {isPDF ? (
              <div className="p-4">
                <PDFDocument
                  file={document.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center h-96">
                      <div className="text-gray-500">Loading PDF...</div>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center h-96">
                      <div className="text-red-500">Failed to load PDF</div>
                    </div>
                  }
                >
                  <Page 
                    pageNumber={pageNumber} 
                    scale={scale}
                    loading={
                      <div className="flex items-center justify-center h-96">
                        <div className="text-gray-500">Loading page...</div>
                      </div>
                    }
                  />
                </PDFDocument>
                
                {numPages > 1 && (
                  <div className="flex items-center justify-center space-x-4 mt-4 pb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                      disabled={pageNumber <= 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {pageNumber} of {numPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                      disabled={pageNumber >= numPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : isImage ? (
              <div className="p-4">
                <img
                  src={document.fileUrl}
                  alt={document.fileName}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  style={{ maxHeight: '60vh' }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">Preview not available for this file type</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
