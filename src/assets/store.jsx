async function sendRequest(endpoint, method = 'GET', body = null, headers = {}) {
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method,
            body,
            headers,
            credentials : "include"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error during fetch:", err);
        return { status: "error", message: err.message };
    }
}

export default sendRequest;