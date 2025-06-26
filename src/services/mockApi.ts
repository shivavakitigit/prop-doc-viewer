
// Mock API service to simulate backend operations
import { Property, Document } from "@/pages/Index";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database
let mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Condo",
    address: "123 Main St, Seattle, WA 98101",
    price: "$750,000",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    documents: [
      {
        id: "doc1",
        fileName: "Property_Deed.pdf",
        fileType: "application/pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        uploadDate: "2024-01-15T10:30:00Z",
        propertyId: "1"
      },
      {
        id: "doc2",
        fileName: "Floor_Plan.png",
        fileType: "image/png",
        fileUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        uploadDate: "2024-01-16T14:20:00Z",
        propertyId: "1"
      }
    ]
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
    documents: [
      {
        id: "doc3",
        fileName: "Inspection_Report.pdf",
        fileType: "application/pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        uploadDate: "2024-01-20T09:15:00Z",
        propertyId: "2"
      },
      {
        id: "doc4",
        fileName: "Exterior_View.jpg",
        fileType: "image/jpeg",
        fileUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        uploadDate: "2024-01-21T16:45:00Z",
        propertyId: "2"
      },
      {
        id: "doc5",
        fileName: "Contract_Agreement.pdf",
        fileType: "application/pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        uploadDate: "2024-01-22T11:30:00Z",
        propertyId: "2"
      }
    ]
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
    documents: [
      {
        id: "doc6",
        fileName: "Property_Appraisal.pdf",
        fileType: "application/pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        uploadDate: "2024-01-25T13:20:00Z",
        propertyId: "3"
      }
    ]
  },
  {
    id: "4",
    title: "Historic Brownstone",
    address: "321 Heritage Lane, Boston, MA 02101",
    price: "$895,000",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2200,
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=400&h=300&fit=crop",
    documents: []
  },
  {
    id: "5",
    title: "Mountain View Cabin",
    address: "555 Pine Ridge Rd, Aspen, CO 81611",
    price: "$650,000",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    documents: [
      {
        id: "doc7",
        fileName: "Land_Survey.pdf",
        fileType: "application/pdf",
        fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        uploadDate: "2024-02-01T08:45:00Z",
        propertyId: "5"
      },
      {
        id: "doc8",
        fileName: "Mountain_View.jpg",
        fileType: "image/jpeg",
        fileUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        uploadDate: "2024-02-02T12:15:00Z",
        propertyId: "5"
      }
    ]
  }
];

// Mock API functions
export const mockApi = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    await delay(800);
    return [...mockProperties];
  },

  // Get single property by ID
  getProperty: async (id: string): Promise<Property | null> => {
    await delay(500);
    return mockProperties.find(p => p.id === id) || null;
  },

  // Create new property
  createProperty: async (propertyData: Omit<Property, 'id' | 'documents'>): Promise<Property> => {
    await delay(1000);
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      documents: []
    };
    mockProperties.push(newProperty);
    return newProperty;
  },

  // Update property
  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    await delay(800);
    const index = mockProperties.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockProperties[index] = { ...mockProperties[index], ...updates };
    return mockProperties[index];
  },

  // Delete property
  deleteProperty: async (id: string): Promise<boolean> => {
    await delay(600);
    const index = mockProperties.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockProperties.splice(index, 1);
    return true;
  },

  // Upload documents
  uploadDocuments: async (propertyId: string, files: File[]): Promise<Document[]> => {
    await delay(1500);
    
    const newDocuments: Document[] = files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      fileName: file.name,
      fileType: file.type,
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      propertyId
    }));

    const propertyIndex = mockProperties.findIndex(p => p.id === propertyId);
    if (propertyIndex !== -1) {
      mockProperties[propertyIndex].documents = [
        ...mockProperties[propertyIndex].documents,
        ...newDocuments
      ];
    }

    return newDocuments;
  },

  // Get documents for a property
  getDocuments: async (propertyId: string): Promise<Document[]> => {
    await delay(400);
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.documents || [];
  },

  // Delete document
  deleteDocument: async (documentId: string): Promise<boolean> => {
    await delay(500);
    
    for (const property of mockProperties) {
      const docIndex = property.documents.findIndex(doc => doc.id === documentId);
      if (docIndex !== -1) {
        property.documents.splice(docIndex, 1);
        return true;
      }
    }
    return false;
  }
};

// Export for use in components
export default mockApi;
