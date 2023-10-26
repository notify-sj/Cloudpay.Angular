export const pluralize = (val, word, plural = word + "s") => {
  const _pluralize = (num, word, plural = word + "s") =>
    [1, -1].includes(Number(num)) ? word : plural;
  if (typeof val === "object")
    return (num, word) => _pluralize(num, word, val[word]);
  return _pluralize(val, word, plural);
};

export const findMenuItemByPath = (
  menuItems,
  targetPath,
  findNested = true
) => {
  const recursiveFind = (items) => {
    for (const menuItem of items) {
      if (
        menuItem.path.length === targetPath.length &&
        menuItem.path.every(
          (pathSegment, index) => pathSegment === targetPath[index]
        )
      ) {
        return menuItem; // Found a match
      }

      if (findNested && menuItem.children && menuItem.children.length > 0) {
        const foundInChildren = recursiveFind(menuItem.children);
        if (foundInChildren) {
          return foundInChildren; // Found a match in the children
        }
      }
    }

    return undefined; // No match found
  };

  return recursiveFind(menuItems);
};

export const getImage = (image: string) => `data:image/png;base64,${image}`;
