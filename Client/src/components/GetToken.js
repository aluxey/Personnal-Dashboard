import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Use environment variables for clientId and clientSecret
const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
const clientSecret = process.env.REACT_APP_TWITCH_SECRET;
const redirectUri = 'https://localhost:3000/twitch-auth';

// Function to initiate OAuth authorization
const authorizeTwitch = () => {
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:follows`;
    window.location.href = authUrl;
};

// Function to exchange the authorization code for an access token
const getAccessToken = async (code) => {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri, // Make sure this is the same as in the authorize step
            },
        });

        const { access_token } = response.data;
        localStorage.setItem('twitch_access_token', access_token);
        return access_token;
    } catch (error) {
        console.error("Error getting access token:", error.response?.data || error.message);
    }
};



// TwitchAuthHandler component: handles the OAuth callback
const TwitchAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');

        console.log("Authorization code:", code); // Check if the code is correctly extracted

        if (code) {
            getAccessToken(code).then(() => {
                navigate('/twitch-authed'); // Redirect after authentication
            });
        } else {
            console.error("No authorization code found in URL");
        }
    }, [navigate]);

    return <div>Handling Twitch Authentication...</div>;
};

// TwitchLogin component: renders the button to initiate login
const TwitchLogin = () => {
    return (
        <div>
            <button onClick={authorizeTwitch}>Login with Twitch</button>
        </div>
    );
};

// Export the components properly
export { TwitchAuthHandler, TwitchLogin };
