import { UserManager } from 'oidc-client';

const config = {
  authority: 'https://cundicode-identity-server.azurewebsites.net',
  client_id: 'interactive',
  redirect_uri: 'https://cundicode-81412.web.app/callback',
  client_secret: 'secret',
  response_type: 'code',
  scope: 'ms_general.read ms_practice.read ms_practice.write ms_learn.read openid profile email',
  post_logout_redirect_uri: 'https://cundicode-81412.web.app/Home',
  end_session_endpoint: 'https://cundicode-identity-server.azurewebsites.net/connect/endsession'
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
