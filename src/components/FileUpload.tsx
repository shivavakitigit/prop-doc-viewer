
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Image } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: true
  });

  return (
    <div className="space-y-6">
      <Card 
        {...getRootProps()} 
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          
          {isDragActive ? (
            <div>
              <p className="text-lg font-medium text-blue-600">Drop files here...</p>
              <p className="text-sm text-gray-500">Release to upload</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, JPEG, and PNG files
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
          <FileText className="h-6 w-6 text-red-600" />
          <div>
            <p className="font-medium text-gray-900">PDF Documents</p>
            <p className="text-sm text-gray-500">Contracts, reports, plans</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
          <Image className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">JPEG Images</p>
            <p className="text-sm text-gray-500">Photos, inspections</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
          <FileText className="h-6 w-6 text-purple-600" />
          <div>
            <p className="font-medium text-gray-900">PNG Images</p>
            <p className="text-sm text-gray-500">Diagrams, screenshots</p>
          </div>
        </div>
      </div>
    </div>
  );
};
