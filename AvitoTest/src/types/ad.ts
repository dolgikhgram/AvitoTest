// Типы для продавца
export type Seller = {
  id: number
  name: string
  rating: string
  totalAds: number
  registeredAt: string
}

// Типы для истории модерации
export type ModerationAction = 'approved' | 'rejected' | 'requestChanges'

export type ModerationHistory = {
  id: number
  moderatorId: number
  moderatorName: string
  action: ModerationAction
  reason: string | null
  comment: string
  timestamp: string
}

// Типы для объявлений
export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft'
export type AdPriority = 'normal' | 'urgent'

export type Advertisement = {
  id: number
  title: string
  description: string
  price: number
  category: string
  categoryId: number
  status: AdStatus
  priority: AdPriority
  createdAt: string
  updatedAt: string
  images: string[]
  seller: Seller
  characteristics: Record<string, string>
  moderationHistory: ModerationHistory[]
}

// Тип для пагинации
export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

// Тип для ответа API списка объявлений
export type AdsResponse = {
  ads: Advertisement[]
  pagination: Pagination
}

// Типы для параметров запросов
export type GetAdsParams = {
  page?: number
  limit?: number
  status?: AdStatus | AdStatus[]
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'createdAt' | 'price' | 'priority'
  sortOrder?: 'asc' | 'desc'
}

export type RejectAdParams = {
  reason:
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое'
  comment?: string
}

export type RequestChangesParams = {
  reason:
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое'
  comment?: string
}
