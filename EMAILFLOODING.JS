const axios = require('axios');
let count = 0;

const Call = async () => {
    let data = '';
    count++;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:20000/api/SSLVerify?domain=github.com',
        headers: {
            'Origin': 'https://securitytool-front.handsintechnology.in',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxZWRjZGNjYjUxYTcwODk3OTcyZiIsImFwcGlkIjoiOGRhZTZlZTktYWQ4MS00MTdhLTkzYTAtZjYwYTdlOWU1NzBjIiwiaWF0IjoxNzExNTQ1ODQ0LCJleHAiOjE3NDMwODE4NDR9.es72WwurMQcVLcsXf7aO8RbLFTCBMsYBDQysWP1i92I'
        },
        data: data
    };

    let response = await axios.request(config)
        .then((response) => {
            return response.status;
        })
        .catch((error) => {
            return error?.response?.status || error.message;
        });
    console.log("Status Code:", response, "Count:", count);
};


const run = async () => {
    for (let i = 0; i < 500; i++) {
        await Call();
    }
};

run();
