
import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDetail } from "@/components/PropertyDetail";
import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Condo",
    address: "123 Main St, Seattle, WA 98101",
    price: "$750,000",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    documents: []
  },
  {
    id: "2", 
    title: "Luxury Waterfront Villa",
    address: "456 Ocean Ave, Miami, FL 33139",
    price: "$1,250,000",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
    documents: []
  },
  {
    id: "3",
    title: "Suburban Family Home",
    address: "789 Oak Street, Austin, TX 78701",
    price: "$425,000",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=300&fit=crop",
    documents: []
  }
];

const Index = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  const updatePropertyDocuments = (propertyId: string, documents: Document[]) => {
    setProperties(prev => prev.map(prop => 
      prop.id === propertyId 
        ? { ...prop, documents }
        : prop
    ));
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
                <p className="text-gray-600">Asset Document Management</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property Portfolio</h2>
          <p className="text-gray-600">Manage your real estate assets and documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={handlePropertySelect}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
