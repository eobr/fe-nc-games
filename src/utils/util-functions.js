export const formatCategory = (category) => {
    return (category.charAt(0).toUpperCase() + category.slice(1)).replaceAll("-", " ");
  }