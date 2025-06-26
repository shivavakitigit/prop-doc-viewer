
import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDetail } from "@/components/PropertyDetail";
import { PropertyForm } from "@/components/PropertyForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Plus, Building2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";

export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  image: string;
  documents: Document[];
}

export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadDate: string;
  propertyId: string;
}

const Index = () => {
  const {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty
  } = useProperties();
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  const handleCreateProperty = async (propertyData: Omit<Property, 'id' | 'documents'>) => {
    try {
      setIsCreating(true);
      await createProperty(propertyData);
      setShowPropertyForm(false);
    } catch (err) {
      console.error('Failed to create property:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const updatePropertyDocuments = (propertyId: string, documents: Document[]) => {
    updateProperty(propertyId, { documents });
    if (selectedProperty?.id === propertyId) {
      setSelectedProperty(prev => prev ? { ...prev, documents } : null);
    }
  };

  if (selectedProperty) {
    return (
      <PropertyDetail 
        property={selectedProperty} 
        onBack={handleBackToList}
        onDocumentsUpdate={updatePropertyDocuments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">RealEstate Pro</h1>
                <p className="text-gray-600">Asset Document Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={fetchProperties}
                className="hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={() => setShowPropertyForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Property Portfolio ({properties.length})
          </h2>
          <p className="text-gray-600">
            Manage your real estate assets and documents with our MERN stack application
          </p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading properties..." />
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <Building2 className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-medium">Error loading properties</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button onClick={fetchProperties} variant="outline">
              Try Again
            </Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first property.</p>
            <Button onClick={() => setShowPropertyForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={handlePropertySelect}
              />
            ))}
          </div>
        )}
      </main>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <PropertyForm
          onSubmit={handleCreateProperty}
          onCancel={() => setShowPropertyForm(false)}
          loading={isCreating}
        />
      )}
    </div>
  );
};

export default Index;
