export interface SignInRequest {
  email:    string;
  password: string;
}

export interface SignUpRequest {
  fullName: string;
  email:    string;
  phone:    string;
  password: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone:    string;
}
