export const formatCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }

  return count.toString();
};

export function formatCoins(coins) {
  const selectedLanguage = localStorage.getItem("selectedLanguage");
  if (!coins) return "";
  if (selectedLanguage === "VI") {
    return coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return coins.toLocaleString();
}
