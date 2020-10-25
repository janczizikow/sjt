function getFileExtension(fileName) {
  const FILE_EXTENSION_PATTERN = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gim;
  const match = fileName.match(FILE_EXTENSION_PATTERN);
  if (!match || !match.length) return null;

  return match[0];
}

module.exports = { getFileExtension };
