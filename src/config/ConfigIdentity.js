import { UserManager } from 'oidc-client';

const config = {
  authority: process.env.REACT_APP_DIS_URL_BASE,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_F_URL_BASE + '/callback',
  client_secret: process.env.REACT_APP_CLIENT_INTERACTIVE_SECRET,
  response_type: 'code',
  scope: process.env.REACT_APP_DIS_GRAPH_SCOPES,
  post_logout_redirect_uri: process.env.REACT_APP_F_URL_BASE + '/Home',
  end_session_endpoint: process.env.REACT_APP_DIS_URL_BASE + '/connect/endsession'
};

const userManager = new UserManager(config);

async function getAuthenticatedUser() {
  try {
    const user = await userManager.getUser();
    return user;
  } catch (error) {
    console.error('Error obteniendo usuario autenticado:', error);
    window.location.replace('/');
  }
}

export default userManager;
export { getAuthenticatedUser };
