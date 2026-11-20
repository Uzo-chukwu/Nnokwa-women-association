export const themeStorageKey = "nnokwa-theme";
export const darkThemeQuery = "(prefers-color-scheme: dark)";

export const restoreThemeScript = `
  document.documentElement.toggleAttribute(
    "data-system-dark",
    matchMedia(${JSON.stringify(darkThemeQuery)}).matches
  );
  try {
    const theme = localStorage.getItem(${JSON.stringify(themeStorageKey)});
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch {}
`;
