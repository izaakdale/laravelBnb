export function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") == 'true';
}

export function utilLogin() {
    localStorage.setItem("isLoggedIn", true);
}

export function utilLogout() {
    localStorage.setItem("isLoggedIn", false);
}