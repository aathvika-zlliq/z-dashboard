// export function setToken(value) {
//     if (value) {
//         window.localStorage.setItem('token', value);
//     }
// }

export function setToken(value) {
  if (value) {
    window.localStorage.setItem("token", value);
  } else {
    console.error("Invalid value provided to setToken:", value);
  }
}

export function isToken() {
  const token = window.localStorage.getItem("token");
  return !!token;
}

export function getUserToken() {
  return window.localStorage.getItem("token");
  // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJvZGFwaS53dGZtZWRpYS5pby9hcGkvdjEvbG9naW4iLCJpYXQiOjE3NDg2Nzc3MDgsImV4cCI6MTc1Mzg2MTcwOCwibmJmIjoxNzQ4Njc3NzA4LCJqdGkiOiJpalgydlNmWVBFTmYwaGo0Iiwic3ViIjoiMzg5MzA3NDAiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.o5kQyspgWipwP71SDldEhVv179L3a3iTHZVBG4Ng7zM";
}

export function clearLocalStorage() {
  window.localStorage.clear();
}

export function removeItem(key) {
  window.localStorage.removeItem(key);
}

export function getLocalStorageValue(key) {
  return window.localStorage.getItem(key);
}

export function setLocalStorageValue(key, value) {
  window.localStorage.setItem(key, value);
}
