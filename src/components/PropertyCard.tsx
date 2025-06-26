
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, FileText } from "lucide-react";
import { Property } from "@/pages/Index";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard = ({ property, onSelect }: PropertyCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group"
      onClick={() => onSelect(property)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-blue-600 text-white">
            {property.documents.length} docs
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">{property.address}</p>
        </div>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-600">{property.price}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span>{property.squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <FileText className="h-4 w-4 mr-1" />
              <span>{property.documents.length} documents</span>
            </div>
            <span className="text-sm text-blue-600 font-medium">View Details →</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
