import { UserData } from './UserData';
export interface TicketData {
  id: number; 
  name: string; 
  description: string; 
  status: 'Todo' | 'In Progress' | 'Done'; 
  assignedUserId: number; 
  assignedUser?: UserData | null; 
  createdAt?: string;
  updatedAt?: string;
}
