
import { useState } from "react";
import { ArrowLeft, Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property, Document } from "@/pages/Index";
import { FileUpload } from "./FileUpload";
import { DocumentList } from "./DocumentList";
import { DocumentViewer } from "./DocumentViewer";
import { LoadingSpinner } from "./LoadingSpinner";
import { useDocuments } from "@/hooks/useDocuments";

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onDocumentsUpdate: (propertyId: string, documents: Document[]) => void;
}

export const PropertyDetail = ({ property, onBack, onDocumentsUpdate }: PropertyDetailProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const { uploading, deleting, uploadDocuments, deleteDocument } = useDocuments(property.id);

  const handleFileUpload = async (files: File[]) => {
    try {
      const newDocuments = await uploadDocuments(files);
      const updatedDocuments = [...property.documents, ...newDocuments];
      onDocumentsUpdate(property.id, updatedDocuments);
    } catch (err) {
      console.error('Failed to upload documents:', err);
    }
  };

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDocumentClose = () => {
    setSelectedDocument(null);
  };

  const handleDocumentDelete = async (documentId: string) => {
    try {
      const success = await deleteDocument(documentId);
      if (success) {
        const updatedDocuments = property.documents.filter(doc => doc.id !== documentId);
        onDocumentsUpdate(property.id, updatedDocuments);
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <p className="text-gray-600">{property.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{property.price}</p>
              <p className="text-sm text-gray-500">
                {property.bedrooms} bed • {property.bathrooms} bath • {property.squareFeet.toLocaleString()} sq ft
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Image */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Property Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold">{property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-semibold">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-semibold">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Square Feet</span>
                  <span className="font-semibold">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents</span>
                  <span className="font-semibold">{property.documents.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Property Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </TabsTrigger>
                  <TabsTrigger value="view" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents ({property.documents.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-6">
                  {uploading ? (
                    <LoadingSpinner text="Uploading documents..." />
                  ) : (
                    <FileUpload onFileUpload={handleFileUpload} />
                  )}
                </TabsContent>
                
                <TabsContent value="view" className="mt-6">
                  <DocumentList 
                    documents={property.documents}
                    onDocumentSelect={handleDocumentSelect}
                    onDocumentDelete={handleDocumentDelete}
                    deletingId={deleting}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={handleDocumentClose}
        />
      )}
    </div>
  );
};
