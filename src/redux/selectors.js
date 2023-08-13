export const contacts = state => {
  //   console.log(state);
  return state.contacts.contacts;
};
export const favouriteContacts = state => state.contacts.favouriteContacts;

export const getStoreFilter = state => {
  // console.log('state: ', state);

  return state.filter.filter;
};

export const getActiveContactId = state => {
  // console.log('state: ', state);

  return state.contacts.activeContactId;
};
export const getIsLoading = state => {
  // console.log('state: ', state);

  return state.contacts.isLoading;
};

export const getError = state => state.contacts.error;

// AUTH//

export const getUserLoading = state => state.auth.isLoading;
export const getAuthError = state => state.auth.error;
export const getToken = state => state.auth.token;
export const getUserData = state => state.auth.userData;
export const getIsAuthorizated = state => state.auth.isAuthorizated;
