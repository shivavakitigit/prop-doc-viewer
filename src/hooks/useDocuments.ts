
import { useState } from 'react';
import { Document } from '@/pages/Index';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';

export const useDocuments = (propertyId: string) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadDocuments = async (files: File[]): Promise<Document[]> => {
    try {
      setUploading(true);
      const newDocuments = await mockApi.uploadDocuments(propertyId, files);
      toast({
        title: "Success",
        description: `${files.length} document(s) uploaded successfully`,
      });
      return newDocuments;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to upload documents",
        variant: "destructive",
      });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (documentId: string): Promise<boolean> => {
    try {
      setDeleting(documentId);
      const success = await mockApi.deleteDocument(documentId);
      if (success) {
        toast({
          title: "Success",
          description: "Document deleted successfully",
        });
      }
      return success;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
      throw err;
    } finally {
      setDeleting(null);
    }
  };

  return {
    uploading,
    deleting,
    uploadDocuments,
    deleteDocument
  };
};
