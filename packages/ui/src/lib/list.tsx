// Return the correct list position array for the specified index.
export const listItemPosition = (
  index: number,
  listLength: number,
  expanded?: boolean,
): ('first' | 'last' | undefined)[] => {
  if (expanded === undefined) {
    if (listLength === 1) {
      return ['first', 'last'];
    }
    if (index === 0) {
      return ['first'];
    }
    if (index === listLength - 1) {
      return ['last'];
    }
  } else {
    if (listLength === 1) {
      return expanded ? ['first'] : ['first', 'last'];
    }
    if (index === 0) {
      return expanded ? [] : ['first'];
    }
    if (index === listLength - 1) {
      return expanded ? [] : ['last'];
    }
  }
  return [];
};
