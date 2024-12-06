export const testCall = async () => {
    const request = {
        type: "hnaRead",
    }

    const value = await makeRequestToBackend(request);

    console.log(value);

    return value;
}

async function makeRequestToBackend(payload) {
    const response = await fetch("http://localhost:8081/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}