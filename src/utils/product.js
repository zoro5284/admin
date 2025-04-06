import useApi from '@/api'
const api = useApi()

function transformCategory(node) {
  return {
    label: node.categoryId,
    value: node.name,
    children: Array.isArray(node.childCategoryList) ? node.childCategoryList.map(transform) : [],
  }
}

export const generateBrandName = (nameZh, nameEn) => {
  if (nameZh && nameEn) {
    return `${nameZh}(${nameEn})`
  }
  return nameZh || nameEn || '-'
}

export function findCategoryPathById(tree, targetId, path = []) {
  if (!tree) return null

  for (const node of Array.isArray(tree) ? tree : [tree]) {
    const currentPath = [...path, node.label]

    if (node.label === targetId) {
      return currentPath
    }

    if (node.children && node.children.length) {
      const found = findCategoryPathById(node.children, targetId, currentPath)
      if (found) return found
    }
  }

  return null
}

export const getAllCategory = async () => {
  const tree = await api.getAllCategory()
  return transformCategory(tree) ?? []
}

export const getAllBrand = async () => {
  return await api.getAllBrand().map((item) => ({
    label: generateBrandName(item.nameZh, item.nameEn),
    value: item.brandId,
  }))
}
