/**
 * This is a sample script for VINCERE API using Google Apps Script.
 * API Authentication Flow
 * 
 * API Docs:https://api.vincere.io/#section/API-Terms-Glossary
 * 
 * 1.Get the authorization code to get the token
 */
const getAuthUrl = () => {
  // set VINCERE's client ID
  const clientId = 'SET CLIENT ID HERE'

  // set callback URL
  const callbackUrl = 'https://localhost.test/';

  // create authorization URL
  const authUrl = 'https://id.vincere.io/oauth2/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + callbackUrl + '&state=1234';

  // send HTTP GET request
  try {
    const authResponse = UrlFetchApp.fetch(authUrl, {
      'muteHttpExceptions': true,
      'followRedirects': false
    });

    // get url from location prop in header and access the url
    const location = authResponse.getHeaders()['Location'];
    Logger.log(location)

  } catch (e) {
    // 例外エラー処理
    Logger.log('Error:')
    Logger.log(e)
  }
}

/**
 * 2. get token
 */
const getToken = () => {
  // set code=xxx from redirect url that you got after you log in the url from getAuthCode()
  const authCode = 'SET CODE HERE'

  // set VINCERE's client ID
  const clientId = 'SET CLIENT ID HERE'

  // url to get token using auth code
  const tokenUrl = 'https://id.vincere.io/oauth2/token';

  // HTTP POST request
  const payload = {
    'client_id': clientId,
    'code': authCode,
    'grant_type': 'authorization_code'
  };

  const options = {
    'method': 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': payload
  };

  // send HTTP POST request
  try {
    const tokenResponse = UrlFetchApp.fetch(tokenUrl, options);
    const tokenStatus = tokenResponse.getResponseCode();
    if (tokenStatus === 200) {
      Logger.log('Token refreshed successfully');
    } else {
      Logger.log('Failed to refresh token');
      return;
    }

    const tokenContent = JSON.parse(tokenResponse.getContentText());
    const accessToken = tokenContent['access_token'];
    const idToken = tokenContent['id_token'];
    const refreshToken = tokenContent['refresh_token'];


    Logger.log('save accessToken:', accessToken)
    Logger.log('save idToken:', idToken)
    Logger.log('save refreshToken:', refreshToken)

  } catch (e) {
    // error handling
    Logger.log('Error:')
    Logger.log(e)
  }
}

/**
 * refresh token if id token is expired 
 * id token is valid for 1 hour
 */
const refreshToken = () => {
  // set VINCERE's client ID
  const clientId = 'SET CLIENT ID HERE'

  // set refresh token
  const refreshToken = 'SET REFRESH TOKEN HERE'

  // url to refresh token
  const tokenUrl = 'https://id.vincere.io/oauth2/token';

  // HTTP POSTリクエストを送る 
  const payload = {
    'client_id': clientId,
    'grant_type': 'refresh_token',
    'refresh_token': refreshToken,
  };

  const options = {
    'method': 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': payload
  };

  // send HTTP POST request
  try {
    const tokenResponse = UrlFetchApp.fetch(tokenUrl, options);
    const tokenStatus = tokenResponse.getResponseCode();
    if (tokenStatus === 200) {
      Logger.log('Token refreshed successfully');
    } else {
      Logger.log('Failed to refresh token');
      return;
    }

    const tokenContent = JSON.parse(tokenResponse.getContentText());
    const accessToken = tokenContent['access_token'];
    const idToken = tokenContent['id_token'];


    Logger.log('save accessToken:', accessToken)
    Logger.log('save idToken:', idToken)

  } catch (e) {
    Logger.log('Error:')
    Logger.log(e)
  }
}

/**
 * 3. call API
 * 
 * get candidate data from VINCERE
 */
const callAPI = () => {
  // set idToken
  idToken = 'SET ID TOKEN HERE'

  // set apiKey
  const apiKey = 'SET API KEY HERE'

  // set your api url and candidate id 
  // example: https://example.vincere.io/api/v2/candidate/1234
  const apiUrl = 'SET API URL HERE'

  // send HTTP GET requests
  try {
    const response = UrlFetchApp.fetch(apiUrl, {
      'headers': {
        'id-token': idToken,
        'x-api-key': apiKey,
        // 'content-type': application/json, // if you use post or put, need to set this
      }
    })
    
    // get response text
    const responseText = response.getContentText();
    const responseJson = JSON.parse(responseText);
    Logger.log(responseJson);

    const responseStatus = response.getResponseCode();
    Logger.log(responseStatus);
    if (responseStatus === 200) {
      Logger.log('Webhook created successfully');
    } else {
      Logger.log('Failed to create webhook');
    }

  } catch (e) {
    Logger.log('Error:')
    Logger.log(e)
  }
}

/**
 * if you want to protect infomation like apiKey and clientId, use PropertiesService
 * 
 * example:
 * const apiKey = getPropertiesService('API_KEY');
 */
// const getPropertiesService = (propertyName) => {
//   const propertyValue = PropertiesService.getScriptProperties()
//     .getProperty(propertyName);
//   if (!propertyValue) {
//     throw new Error(`Error: ${propertyName} is not defined.`);
//   }
//   return propertyValue;
// };