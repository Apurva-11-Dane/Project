import React, { useState, useEffect } from 'react';
import { Search, Plus, List, MapPin, Bell } from 'lucide-react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import AIMatching from './components/AIMatching';
import AuthForm from './components/AuthForm';
import Notification from './components/Notification';
import { Item, User } from './types';
import { mockApi } from './mockApi';

function App() {
  const [lostItems, setLostItems] = useState<Item[]>([]);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [view, setView] = useState<'lost' | 'found' | 'matching'>('lost');
  const [user, setUser] = useState<User | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lostItemsData = await mockApi.getItems('lost');
        setLostItems(lostItemsData);

        const foundItemsData = await mockApi.getItems('found');
        setFoundItems(foundItemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const addItem = async (item: Omit<Item, 'id'>, type: 'lost' | 'found') => {
    try {
      const newItem = await mockApi.addItem(item, type);
      if (type === 'lost') {
        setLostItems([...lostItems, newItem]);
      } else {
        setFoundItems([...foundItems, newItem]);
      }
      showNotificationMessage(`New ${type} item added: ${newItem.name}`);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await mockApi.login(email, password);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      const newUser = await mockApi.signup(name, email, password);
      setUser(newUser);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLostItems([]);
    setFoundItems([]);
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <MapPin className="mr-2" size={24} />
          AI Lost and Found Tracker
        </h1>
        <div className="text-sm flex items-center">
          <Bell className="mr-2" size={18} />
          Welcome, {user.name} | <button onClick={handleLogout} className="ml-2 underline">Logout</button>
        </div>
      </header>
      <nav className="bg-blue-500 p-2 flex justify-center space-x-4">
        <button
          className={`flex items-center ${view === 'lost' ? 'bg-blue-700' : 'bg-blue-600'} text-white px-4 py-2 rounded`}
          onClick={() => setView('lost')}
        >
          <Search className="mr-2" size={18} /> Lost Items
        </button>
        <button
          className={`flex items-center ${view === 'found' ? 'bg-blue-700' : 'bg-blue-600'} text-white px-4 py-2 rounded`}
          onClick={() => setView('found')}
        >
          <Plus className="mr-2" size={18} /> Found Items
        </button>
        <button
          className={`flex items-center ${view === 'matching' ? 'bg-blue-700' : 'bg-blue-600'} text-white px-4 py-2 rounded`}
          onClick={() => setView('matching')}
        >
          <List className="mr-2" size={18} /> AI Matching
        </button>
      </nav>
      <main className="flex-grow p-4">
        {view === 'lost' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Report Lost Item</h2>
            <ItemForm onSubmit={(item) => addItem(item, 'lost')} userId={user.id} />
            <h2 className="text-xl font-semibold mt-8 mb-4">Lost Items</h2>
            <ItemList items={lostItems} />
          </div>
        )}
        {view === 'found' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Report Found Item</h2>
            <ItemForm onSubmit={(item) => addItem(item, 'found')} userId={user.id} />
            <h2 className="text-xl font-semibold mt-8 mb-4">Found Items</h2>
            <ItemList items={foundItems} />
          </div>
        )}
        {view === 'matching' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">AI Matching</h2>
            <AIMatching lostItems={lostItems} foundItems={foundItems} />
          </div>
        )}
      </main>
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
}

export default App;
