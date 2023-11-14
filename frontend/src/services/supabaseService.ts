import axios from 'axios';

const userServiceUrl = `http://${import.meta.env.VITE_APP_SUPABASE_HOST}:${
  import.meta.env.VITE_APP_SUPABASE_PORT
}/user`;

export const updatePassword = async (
  userId: string,
  newPassword: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${userServiceUrl}/update-password`,
      {
        userId,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const deleteUserAccount = async (userId: string, token: string) => {
  try {
    const response = await axios.post(
      `${userServiceUrl}/delete-user`,
      {
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
