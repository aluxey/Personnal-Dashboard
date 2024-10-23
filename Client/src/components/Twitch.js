import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to fetch followed channels
const fetchFollowedChannels = async () => {
    const accessToken = localStorage.getItem('twitch_access_token');
    if (!accessToken) {
        console.error('Access token is missing');
        return [];
    }

    try {
        const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;

        // Fetch authenticated user's profile to get user_id
        const profileResponse = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': clientId,
            },
        });

        const userId = profileResponse.data.data[0].id;
        console.log("User ID:", userId); // Log the user ID

        // Fetch the list of followed channels
        const response = await axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-Id': clientId,
            },
        });

        console.log("Followed channels:", response.data.data); // Log the followed channels
        return response.data.data; // List of followed channels
    } catch (error) {
        console.error('Error fetching followed channels:', error);
        return [];
    }
};

// Function to fetch live channels
const fetchLiveChannels = async (followedChannels) => {
    const accessToken = localStorage.getItem('twitch_access_token');
    if (!accessToken) {
        console.error('Access token is missing');
        return [];
    }

    const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const followedIds = followedChannels.map(channel => channel.to_id);
    console.log("Followed IDs:", followedIds); // Log the followed channel IDs

    try {
        const response = await axios.get(
            `https://api.twitch.tv/helix/streams?user_id=${followedIds.join('&user_id=')}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': clientId,
                },
            }
        );

        console.log("Live channels:", response.data.data); // Log live channels
        return response.data.data; // List of live channels
    } catch (error) {
        console.error('Error fetching live channels:', error);
        return [];
    }
};

const TwitchLiveWidget = () => {
    const [liveChannels, setLiveChannels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLiveTwitchChannels = async () => {
            try {
                const accessToken = localStorage.getItem('twitch_access_token');
                if (!accessToken) {
                    console.error('No access token found');
                    return;
                }

                const followedChannels = await fetchFollowedChannels();
                if (followedChannels.length > 0) {
                    const liveChannels = await fetchLiveChannels(followedChannels);
                    setLiveChannels(liveChannels);
                } else {
                    console.log("No followed channels found");
                }
            } catch (error) {
                console.error('Error fetching live channels:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLiveTwitchChannels();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (liveChannels.length === 0) return <div>No live channels found</div>;

    return (
        <div>
            <h2>Live Twitch Channels You Follow</h2>
            <ul>
                {liveChannels.map(channel => (
                    <li key={channel.id}>
                        <a href={`https://www.twitch.tv/${channel.user_name}`} target="_blank" rel="noopener noreferrer">
                            {channel.user_name} - {channel.viewer_count} viewers
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TwitchLiveWidget;
