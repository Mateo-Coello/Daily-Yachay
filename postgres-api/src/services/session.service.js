import config from 'config';
import axios from 'axios';
import qs from 'qs';

export const getGoogleOauthToken = async ({ code }) => {
  const rootURl = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: config.get('googleClientId'),
    client_secret: config.get('googleClientSecret'),
    redirect_uri: config.get('googleOauthRedirect'),
    grant_type: 'authorization_code',
  };
  try {
    const { data } = await axios.post(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data;
  } catch (err) {
    console.log('Failed to fetch Google Oauth Tokens');
    throw new Error(err);
  }
};

export async function getGoogleUser({ id_token, access_token }) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
