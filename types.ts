export interface Item {
  id: string;
  itemName: string;
  description: string;
  lostDate: string;
  lostTime: string;
  lostLocation: string;
  imageUrl?: string;
  userId: string;
  latitude?: number;
  longitude?: number;
  founderName?: string;
  founderContact?: string;
  founderPhone?: string;
  lostPersonName?: string;
  lostPersonContact?: string;
  lostPersonPhone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
