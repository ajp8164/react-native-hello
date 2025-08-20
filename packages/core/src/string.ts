/**
 * Return a short string with an ellipsis.
 * @param text - the string to trim
 * @param length - the maximum length of the string (not including the ellipsis length)
 * @param endLength - the number of characters to place after the ellipsis
 * @returns the formatted string
 */
const ellipsis = (text: string, length: number, endLength?: number) => {
  if (!endLength && text && text.length > length) {
    return text.substring(0, length) + '...';
  } else if (endLength && text && text.length > length) {
    return (
      text.substring(0, length) +
      '...' +
      text.substring(text.length - endLength, text.length)
    );
  } else {
    return text;
  }
};

export { ellipsis };
