export const trucate = (s = '', maxLength = 19) =>
  s.length > maxLength ? s.substring(0, maxLength) + ' ...' : s
