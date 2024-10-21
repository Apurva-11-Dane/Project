import { Item, User } from './types';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Apurva Dane', email: 'apurvadane@gmail.com' },
  { id: '2', name: 'Pranavi Wankhade', email: 'pranavi.g.wankhade@gmail.com' },
{ id: '3', name: 'Neha Rathod', email: 'neharathod@gmail.com' },
];

export const mockApi = {
  login: (email: string, password: string): Promise<User> => {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject(new Error('Invalid credentials'));
  },

  signup: (name: string, email: string, password: string): Promise<User> => {
    const newUser = { id: (MOCK_USERS.length + 1).toString(), name, email };
    MOCK_USERS.push(newUser);
    return Promise.resolve(newUser);
  },

  getUser: (): Promise<User> => {
    return Promise.resolve(MOCK_USERS[0]);
  },

  getItems: (type: 'lost' | 'found'): Promise<Item[]> => {
    const items = JSON.parse(localStorage.getItem(`${type}Items`) || '[]');
    return Promise.resolve(items);
  },

  addItem: (item: Omit<Item, 'id'>, type: 'lost' | 'found'): Promise<Item> => {
    const items = JSON.parse(localStorage.getItem(`${type}Items`) || '[]');
    const newItem = { ...item, id: Date.now().toString() };
    items.push(newItem);
    localStorage.setItem(`${type}Items`, JSON.stringify(items));
    return Promise.resolve(newItem);
  },

  getMatches: (lostItems: Item[], foundItems: Item[]): Promise<{ lostItem: Item; foundItem: Item; score: number }[]> => {
    const matches = lostItems.flatMap(lostItem =>
      foundItems.map(foundItem => {
        let score = 0;

        // Increase score for name similarity
        if (lostItem.name.toLowerCase().includes(foundItem.name.toLowerCase()) ||
            foundItem.name.toLowerCase().includes(lostItem.name.toLowerCase())) {
          score += 0.5;
        }

        // Increase score for description similarity
        if (lostItem.description.toLowerCase().includes(foundItem.description.toLowerCase()) ||
            foundItem.description.toLowerCase().includes(lostItem.description.toLowerCase())) {
          score += 0.3;
        }

        // Increase score for location similarity
        if (lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
          score += 0.2;
        }

        return { lostItem, foundItem, score: Math.min(score, 1) };
      })
    ).sort((a, b) => b.score - a.score).slice(0, 5); // Top 5 matches

    return Promise.resolve(matches);
  }
};
