import { firebase, getProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const startLogin = providerName => {
  const provider = getProvider(providerName);
  return () => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .catch(({ code = "", credential, email }) => {
        if (code === "auth/account-exists-with-different-credential") {
          return firebase
            .auth()
            .fetchSignInMethodsForEmail(email)
            .then(methods => {
              return {
                currProvider: getProvider(methods[0]),
                credential,
                code
              };
            });
        }
      });
  };
};

export const authenticateWithNewAccount = (currProvider, credential) => {
  firebase
    .auth()
    .signInWithPopup(currProvider)
    .then(result => {
      result.user.linkAndRetrieveDataWithCredential(credential);
    });
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
