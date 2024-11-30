export interface User {
  _id: string;
  name: string;
  email: string;
  department: string;
}

export interface Kudo {
  _id: string;
  sender: User;
  receiver: User;
  message: string;
  category: "Helpful" | "Teamwork" | "Innovation" | "Leadership";
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
