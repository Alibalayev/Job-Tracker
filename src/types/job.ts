export interface Job {
  id: string;
  company: string;        
  position: string;       
  status: 'applied' | 'interview' | 'offer' | 'rejected'; 
  salary?: string;        
  url?: string;           
  notes?: string;         
  appliedDate: string;    
  createdAt: string;
}