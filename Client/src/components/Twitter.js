import React, { useState, useEffect } from "react";
import axios from "axios";

const TwitterTimeline = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const token = process.env.REACT_APP_TWITTER_BEARER_TOKEN;
        const response = await axios.get(
          "https://api.twitter.com/2/users/:id/following", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTweets(response.data.data);
      } catch (error) {
        console.error("Error fetching tweets", error);
      }
    };
    fetchTweets();
  }, []);

  return (
    <div>
      <h2>Recent Tweets</h2>
      {tweets.length > 0 ? (
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet.id}>{tweet.text}</li>
          ))}
        </ul>
      ) : (
        <div>Loading tweets...</div>
      )}
    </div>
  );
};

export default TwitterTimeline;
