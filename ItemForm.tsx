import React, { useState, useEffect } from 'react';
import { Item, Location } from '../types';

interface ItemFormProps {
  onSubmit: (item: Omit<Item, 'id'>) => void;
  userId: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [founderName, setFounderName] = useState('');
  const [founderContact, setFounderContact] = useState('');
  const [founderPhone, setFounderPhone] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<Item, 'id'> = {
      name,
      description,
      location,
      date: new Date().toISOString(),
      userId,
      imageUrl: image ? URL.createObjectURL(image) : undefined,
      latitude: currentLocation?.latitude,
      longitude: currentLocation?.longitude,
      founderName,
      founderContact,
      founderPhone,
    };
    onSubmit(newItem);
    setName('');
    setDescription('');
    setLocation('');
    setImage(null);
    setFounderName('');
    setFounderContact('');
    setFounderPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={3}
        ></textarea>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label htmlFor="founderName" className="block text-sm font-medium text-gray-700">
          Founder Name
        </label>
        <input
          type="text"
          id="founderName"
          value={founderName}
          onChange={(e) => setFounderName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="founderContact" className="block text-sm font-medium text-gray-700">
          Founder Contact
        </label>
        <input
          type="text"
          id="founderContact"
          value={founderContact}
          onChange={(e) => setFounderContact(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="founderPhone" className="block text-sm font-medium text-gray-700">
          Founder Phone
        </label>
        <input
          type="tel"
          id="founderPhone"
          value={founderPhone}
          onChange={(e) => setFounderPhone(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      {currentLocation && (
        <div className="text-sm text-gray-600">
          Current Location: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
        </div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ItemForm;
