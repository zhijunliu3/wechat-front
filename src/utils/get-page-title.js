import defaultSettings from '@/config'

const title = defaultSettings.title || '拼拼猪管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
