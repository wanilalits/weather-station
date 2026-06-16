export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  body: string;
  token: string;
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  console.log("3. authService: calling login API", payload);
  const API_ROOT = import.meta.env.VITE_API_ROOT;

  //const response = await fetch(`${API_ROOT}/login`, 
  const response = await fetch(`https://weather-station-ch7x.onrender.com/login`, 
    {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(payload),
  });
 // console.log("3.1. authService: raw response", response);

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log("3.1. authService: login API response", data);
  //again move to saga
  return data;
};