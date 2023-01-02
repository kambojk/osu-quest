import fetch from 'node-fetch';

let token = null;

async function getToken() {
  if (token != null && token.expires > Date.now() + 10000) {
    return token.access_token;
  }
  const response = await fetch("https://osu.ppy.sh/oauth/token", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "grant_type": "client_credentials",
      "client_id": process.env.OSU_CLIENT_ID,
      "client_secret": process.env.OSU_CLIENT_SECRET,
      "scope": "public"
    })
  })

  token = await response.json();

  token.expires = Date.now() + token.expires_in * 1000;
  return token.access_token;
  
}

module.exports = {getToken};