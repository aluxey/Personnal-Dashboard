import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Point to your backend

export const fetchMessage = async () => {
  try {
    const response = await axios.get(`${API_URL}/message`);
    return response.data;
  } catch (error) {
    console.error("Error fetching message from backend", error);
    return { message: "Error" };
  }
};
