let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'cs4500-sp19-client-react-cccp.herokuapp.com') {
    backendHost = 'https://https://cs4500-sp19-cccp.herokuapp.com';
} else if (hostname === 'localhost') {
    backendHost = `http://${hostname}:8080`;
} else {
    // can change this later if need be
    backendHost = `http://${hostname}:8080`;
}

export const API_ROOT = `${backendHost}`;
