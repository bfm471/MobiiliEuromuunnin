export const handleFetch = (from, amount) => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://api.apilayer.com/exchangerates_data/latest`
    const myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    return fetch(`${url}`, requestOptions)
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in fetch:", response.status, response.statusText)
        }
        return response.json()
    })
}