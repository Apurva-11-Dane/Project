import React, { useState, useEffect } from 'react';
import { Item } from '../types';
import { mockApi } from '../mockApi';
import { MapPin, Mail } from 'lucide-react';

interface AIMatchingProps {
  lostItems: Item[];
  foundItems: Item[];
}

interface Match {
  lostItem: Item;
  foundItem: Item;
  score: number;
}

const AIMatching: React.FC<AIMatchingProps> = ({ lostItems, foundItems }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const newMatches = await mockApi.getMatches(lostItems, foundItems);
        setMatches(newMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [lostItems, foundItems]);

  const handleContact = (foundItem: Item) => {
    // In a real application, this would open a messaging interface or provide contact details
    alert(`Contacting the person who found ${foundItem.name}. In a real app, this would open a secure messaging interface.`);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Potential Matches</h3>
      {matches.length > 0 ? (
        <ul className="space-y-4">
          {matches.map((match, index) => (
            <li key={index} className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-medium">Lost Item</h4>
                  <p>{match.lostItem.name}</p>
                  <p className="text-sm text-gray-500">{match.lostItem.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin size={16} className="mr-1" />
                    {match.lostItem.location}
                  </div>
                  {match.lostItem.latitude && match.lostItem.longitude && (
                    <p className="text-xs text-gray-500 mt-1">
                      GPS: {match.lostItem.latitude.toFixed(6)}, {match.lostItem.longitude.toFixed(6)}
                    </p>
                  )}
                  {match.lostItem.imageUrl && (
                    <img src={match.lostItem.imageUrl} alt="Lost item" className="mt-2 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
                <div>
                  <h4 className="text-md font-medium">Found Item</h4>
                  <p>{match.foundItem.name}</p>
                  <p className="text-sm text-gray-500">{match.foundItem.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin size={16} className="mr-1" />
                    {match.foundItem.location}
                  </div>
                  {match.foundItem.latitude && match.foundItem.longitude && (
                    <p className="text-xs text-gray-500 mt-1">
                      GPS: {match.foundItem.latitude.toFixed(6)}, {match.foundItem.longitude.toFixed(6)}
                    </p>
                  )}
                  {match.foundItem.imageUrl && (
                    <img src={match.foundItem.imageUrl} alt="Found item" className="mt-2 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm font-medium">Match Score: {(match.score * 100).toFixed(2)}%</p>
                {match.score === 1 && (
                  <button
                    onClick={() => handleContact(match.foundItem)}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    <Mail size={16} className="mr-1" />
                    Contact Finder
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No potential matches found.</p>
      )}
    </div>
  );
};

export default AIMatching;
