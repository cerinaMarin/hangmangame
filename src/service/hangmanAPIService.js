const axios = require("axios");

export const fetchText = async () => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    return response.data;
  } catch (error) {
    return "Something went wrong.";
  }
};

export const getScores = async () => {
  try {
    const response = await axios.get(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
    );
    return response.data;
  } catch (error) {
    return "Something went wrong.";
  }
};

export const postScore = async (
  quoteId,
  length,
  uniqueCharacters,
  userName,
  errors,
  duration
) => {
  try {
    const response = await axios.post(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      {
        quoteId: quoteId,
        length: length,
        uniqueCharacters: uniqueCharacters,
        userName: userName,
        errors: errors,
        duration: duration,
      }
    );
    return response.data;
  } catch (error) {
    return "Something went wrong.";
  }
};
