export interface UserResource {
  id:       number;
  fullName: string;
  email:    string;
  phone:    string;
  role:     string;
  plan:     string;
}

export interface AuthResponse {
  token: string;
  user:  UserResource;
}
