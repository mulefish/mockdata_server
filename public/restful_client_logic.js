async function sendGet(url)     {
    const response = await fetch(url);
    const data = await response.json()
    return data;
}

async function sendPost(url, opts)     {
    const response = await fetch(url,{      
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(opts) // body data type must match "Content-Type" header
    });
    const data = await response.json()
    return data;
}



function doGet() { 
    const url = 'http://localhost:3030/getEntriesCount'
    sendGet(url).then(data => {
        alert( JSON.stringify(data)); 
    }); 
}

function doPost() { 
    const url = 'http://localhost:3030/getPaginatedEntries'
    let opts = {"bottom":"water"}
     sendPost(url, opts).then(data => {
        alert( JSON.stringify(data)); 
    }); 
}



