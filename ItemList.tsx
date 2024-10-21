import React from 'react';
import { Item } from '../types';
import { MapPin, User, Mail, Phone } from 'lucide-react';

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(item.date).toLocaleString()}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.description}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {item.location}
                  </div>
                  {item.latitude && item.longitude && (
                    <div className="mt-1 text-xs text-gray-500">
                      GPS: {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
                    </div>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Founder Details</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {item.founderName && (
                    <div className="flex items-center mb-1">
                      <User size={16} className="mr-2 text-gray-400" />
                      {item.founderName}
                    </div>
                  )}
                  {item.founderContact && (
                    <div className="flex items-center mb-1">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {item.founderContact}
                    </div>
                  )}
                  {item.founderPhone && (
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {item.founderPhone}
                    </div>
                  )}
                </dd>
              </div>
              {item.imageUrl && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Image</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <img src={item.imageUrl} alt={item.name} className="max-w-full h-auto rounded-lg" />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
