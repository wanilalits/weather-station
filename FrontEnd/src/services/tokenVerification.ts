export interface TokenPayload {
  loginToken: string ;
}

export const tokenVerification = async (payload: TokenPayload) => {
const API_ROOT = import.meta.env.VITE_API_ROOT;
  const response = await fetch(`${API_ROOT}/profileview`, 
    {
    method: "GET",
    headers: {Authorization: `Bearer ${payload.loginToken}` },
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }
};