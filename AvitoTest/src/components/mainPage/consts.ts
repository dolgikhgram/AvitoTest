import { Space } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import type {
  categoriesType,
  statusesType,
  sortsType,
} from './types'

export const categories: categoriesType = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
]

export const statuses: statusesType = [
  { id: 0, name: 'ожидает модерации', value: 'pending' },
  { id: 1, name: 'одобрено', value: 'approved' },
  { id: 2, name: 'отклонено', value: 'rejected' },
  { id: 3, name: 'черновик', value: 'draft' },
]

export const sorts: sortsType = [
  { id: 0, name: 'По дате создания', value: 'createdAt' },
  { id: 1, name: 'По цене ', value: 'price' },
  { id: 2, name: 'По приоритету', value: 'priority' },
]

export const sortsObj: Record<'createdAt' | 'price' | 'priority', string> = {
  createdAt: 'По дате создания',
  price: 'По цене ',
  priority: 'По приоритету',
}

export const statusOptions = statuses.map(s => ({
  label: s.name,
  value: s.id,
}))

export const categoryOptions = categories.map(c => ({
  label: c.name,
  value: c.name,
}))

export const sortOptions = sorts.map(s => ({
  label: s.name,
  value: s.name,
}))

export const orderOptions = [
  {
    label: (
      <Space>
        <ArrowUpOutlined />
        <span>По возрастанию</span>
      </Space>
    ),
    value: 'asc' as const,
  },
  {
    label: (
      <Space>
        <ArrowDownOutlined />
        <span>По убыванию</span>
      </Space>
    ),
    value: 'desc' as const,
  },
]

export const PLACEHOLDERS = {
  status: 'статус',
  category: 'категория',
  priceFrom: 'от',
  priceTo: 'до',
  search: 'Поиск по названию',
  sortField: 'поле сортировки',
  sortOrder: 'Направление',
} as const

export const BUTTONS = {
  reset: 'Сбросить',
  stats: 'Статистика',
} as const

export const DEFAULT_VALUES = {
  page: 1,
  limit: 10,
  sort: 'createdAt' as const,
  order: 'desc' as const,
} as const

