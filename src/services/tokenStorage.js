let accessToken = null;

export const tokenStorage = {
  getToken() {
    return accessToken;
  },

  setToken(token) {
    accessToken = token;
  },

  clearToken() {
    accessToken = null;
  },
};
