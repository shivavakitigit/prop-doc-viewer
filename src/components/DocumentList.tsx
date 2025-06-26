
import { FileText, Image, Download, Eye, Calendar, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "@/pages/Index";

interface DocumentListProps {
  documents: Document[];
  onDocumentSelect: (document: Document) => void;
  onDocumentDelete?: (documentId: string) => void;
  deletingId?: string | null;
}

export const DocumentList = ({ 
  documents, 
  onDocumentSelect, 
  onDocumentDelete,
  deletingId 
}: DocumentListProps) => {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="h-5 w-5 text-red-600" />;
    if (fileType.includes('image')) return <Image className="h-5 w-5 text-green-600" />;
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const getFileTypeBadge = (fileType: string) => {
    if (fileType.includes('pdf')) return <Badge variant="destructive">PDF</Badge>;
    if (fileType.includes('jpeg') || fileType.includes('jpg')) return <Badge className="bg-green-600">JPEG</Badge>;
    if (fileType.includes('png')) return <Badge className="bg-purple-600">PNG</Badge>;
    return <Badge variant="secondary">Unknown</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
        <p className="text-gray-500">Upload your first document using the upload tab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                {getFileIcon(document.fileType)}
                {getFileTypeBadge(document.fileType)}
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2 truncate" title={document.fileName}>
                {document.fileName}
              </h4>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(document.uploadDate)}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDocumentSelect(document)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = window.document.createElement('a');
                    link.href = document.fileUrl;
                    link.download = document.fileName;
                    link.click();
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
                {onDocumentDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDocumentDelete(document.id)}
                    disabled={deletingId === document.id}
                    className="text-red-600 hover:text-red-700"
                  >
                    {deletingId === document.id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
