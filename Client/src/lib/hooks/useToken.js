// create a function, then go to cookie store, then extract token with cb, return it
const useToken = () => {
  const cookie = document.cookie.split(";");
  const tokenCookie = cookie.find((row) => row.trim().startsWith("token="));
  if (!tokenCookie) {
    console.log("No token in graphql");
    return null;
  }

  const token = tokenCookie.trim().split("=")[1];
  return token;
};

export default useToken;
