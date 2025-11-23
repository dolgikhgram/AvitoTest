import type { ColumnsType } from 'antd/es/table'

type TableData = {
  key: string
  name: string
  value: string
}

export const columns: ColumnsType<TableData> = [
  {
    title: 'Характеристика',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value',
  },
]

