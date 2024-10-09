
export default function verifyDarkMode(darkMode, setDarkMode) {
    if (darkMode) {
        window.document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
    }
    else if (darkMode === false) {
        window.document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
    }
    else {
        setDarkMode(localStorage.getItem("darkMode") === "true");
    }
}
