import useApi from '@/api'
const api = useApi()

export const generateBrandName = (nameZh, nameEn) => {
  if (nameZh && nameEn) {
    return `${nameZh}(${nameEn})`
  }
  return nameZh || nameEn || '-'
}

export function findCategoryPathById(tree, targetId, path = []) {
  if (!tree) return null

  for (const node of Array.isArray(tree) ? tree : [tree]) {
    const currentPath = [...path, node.value]

    if (node.value === targetId) {
      return currentPath
    }

    if (node.children && node.children.length) {
      const found = findCategoryPathById(node.children, targetId, currentPath)
      if (found) return found
    }
  }

  return null
}

function transformCategory(node, filterIds) {
  if (filterIds.includes(String(node.categoryId))) return null
  return {
    label: node.name,
    value: node.categoryId,
    children: Array.isArray(node.childCategoryList)
      ? node.childCategoryList.map((node) => transformCategory(node, filterIds)).filter((i) => !!i)
      : [],
  }
}

export const getAllCategory = async (filterIds = []) => {
  const tree = await api.product.getAllCategory()
  return ((tree ?? []).map((node) => transformCategory(node, filterIds)) ?? []).filter((i) => !!i)
}

export const getAllBrand = async () => {
  return ((await api.product.getAllBrand()) ?? []).map((item) => ({
    label: generateBrandName(item.nameZh, item.nameEn),
    value: item.brandId,
  }))
}
