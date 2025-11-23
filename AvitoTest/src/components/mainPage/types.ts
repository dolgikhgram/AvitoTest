import type { AdStatus } from '../../types'

export type CategoryType = {
  id: number
  name: string
}

export type categoriesType = Array<CategoryType>

export type StatusType = {
  id: number
  name: string
  value: AdStatus
}

export type sortType = {
  id: number
  name: string
  value: 'createdAt' | 'price' | 'priority'
}

export type sortsType = Array<sortType>

export type statusesType = Array<StatusType>

