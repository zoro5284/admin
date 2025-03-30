export const generateBrandName = (nameZh, nameEn) => {
  if (nameZh && nameEn) {
    return `${nameZh}(${nameEn})`
  }
  return nameZh || nameEn || '-'
}
