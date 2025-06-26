
import { useState, useEffect } from 'react';
import { Property } from '@/pages/Index';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getProperties();
      setProperties(data);
    } catch (err) {
      setError('Failed to fetch properties');
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'documents'>) => {
    try {
      const newProperty = await mockApi.createProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
      toast({
        title: "Success",
        description: "Property created successfully",
      });
      return newProperty;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create property",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const updatedProperty = await mockApi.updateProperty(id, updates);
      if (updatedProperty) {
        setProperties(prev => 
          prev.map(p => p.id === id ? updatedProperty : p)
        );
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
      }
      return updatedProperty;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const success = await mockApi.deleteProperty(id);
      if (success) {
        setProperties(prev => prev.filter(p => p.id !== id));
        toast({
          title: "Success",
          description: "Property deleted successfully",
        });
      }
      return success;
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty
  };
};
