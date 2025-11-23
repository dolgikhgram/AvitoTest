import { useNavigate } from 'react-router-dom'
import { useAds } from '../../api'
import {
  Alert,
  Button,
  Col,
  Empty,
  Input,
  InputNumber,
  Layout,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
} from 'antd'
import { useCallback, useState } from 'react'
import type { Advertisement, AdStatus } from '../../types'
import CardAd from './Card/Card'
import s from './mainPage.module.css'
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
type CategoryType = {
  id: number
  name: string
}

type categoriesType = Array<CategoryType>

type StatusType = {
  id: number
  name: string
  value: AdStatus
}

type sortType = {
  id: number
  name: string
  value: 'createdAt' | 'price' | 'priority'
}

type sortsType = Array<sortType>

type statusesType = Array<StatusType>
const categories: categoriesType = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
]

const statuses: statusesType = [
  { id: 0, name: 'ожидает модерации', value: 'pending' },
  { id: 1, name: 'одобрено', value: 'approved' },
  { id: 2, name: 'отклонено', value: 'rejected' },
  { id: 3, name: 'черновик', value: 'draft' },
]

const sorts: sortsType = [
  { id: 0, name: 'По дате создания', value: 'createdAt' },
  { id: 1, name: 'По цене ', value: 'price' },
  { id: 2, name: 'По приоритету', value: 'priority' },
]

const sortsObj: Record<'createdAt' | 'price' | 'priority', string> = {
  createdAt: 'По дате создания',
  price: 'По цене ',
  priority: 'По приоритету',
}

const MainPage = () => {
  const [status, setStatus] = useState<number[]>([])
  const [cat, setCat] = useState<number | undefined>(
    undefined
  )
  const [min, setMin] = useState<number | undefined>(undefined)
  const [max, setMax] = useState<number | undefined>(undefined)
  const [text, setText] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<'createdAt' | 'price' | 'priority'>(
    'createdAt'
  )
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const changeMin = (value: number | null) => {
    setMin(value ?? 0)
  }
  const changeMax = (value: number | null) => {
    setMax(value ?? 0)
  }
  const changeCat = (value: string | null) => {
    const foundCategory = categories.find(c => c.name === value)
    setCat(foundCategory ? foundCategory.id : undefined)
  }
  const changeStatus = (value: number[]) => {
    setStatus(value)
  }
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const reset = () => {
    setStatus([])
    setCat(undefined)
    setMin(undefined)
    setMax(undefined)
    setText('')
  }
  const changePage = (page: number) => {
    setPage(page)
  }
  const sortChange = (val: string) => {
    // Преобразуем текст обратно в значение для API
    const foundSort = sorts.find(s => s.name === val)
    if (foundSort && foundSort.value) {
      setSort(foundSort.value)
      setPage(1)
    }
  }
  const navigate = useNavigate()
  const statusValues = status.length > 0
    ? status.map(id => statuses.find(s => s.id === id)?.value).filter(Boolean) as AdStatus[]
    : undefined

  const { data, isLoading, error } = useAds({
    page: page,
    limit: 10,
    status: statusValues,
    categoryId: cat,
    minPrice: min,
    maxPrice: max,
    search: text || undefined,
    sortBy: sort,
    sortOrder: order,
  })
  const click = useCallback(
    (id: number) => {
      navigate(`/item/${id}`)
    },
    [navigate]
  )
  const changeOrder = (val: 'asc' | 'desc') => {
    setOrder(val)
  }
  return (
    <Layout>
      <Layout.Content className={s.content}>
        <div>
          <Space wrap size={'middle'}>
            <Select
              className={s.select}
              placeholder="статус"
              mode="multiple"
              value={status}
              options={statuses.map(s => {
                return {
                  label: s.name,
                  value: s.id,
                }
              })}
              onChange={changeStatus}
            />
            <Select
              className={s.select}
              placeholder="категория"
              value={
                cat !== undefined
                  ? categories[cat].name
                  : undefined
              }
              options={categories.map(c => {
                return {
                  label: c.name,
                  value: c.name,
                }
              })}
              onChange={changeCat}
            />
            <Space>
              <div>цена :</div>
              <InputNumber
                placeholder="от"
                value={min}
                onChange={changeMin}
              />
              <div>-</div>
              <InputNumber
                placeholder="до"
                value={max}
                onChange={changeMax}
              />
            </Space>
            <Input
              placeholder={'Поиск по названию'}
              prefix={<SearchOutlined />}
              value={text}
              allowClear
              onChange={changeSearch}
            />
            <Space>
              <span>Сортировать :</span>
              <Select
                placeholder="поле сортировки"
                value={sortsObj[sort]}
                options={sorts.map(s => {
                  return {
                    label: s.name,
                    value: s.name,
                  }
                })}
                onChange={sortChange}
              />
              <Select
                placeholder="Направление"
                value={order}
                options={[
                  {
                    label: (
                      <Space>
                        <ArrowUpOutlined />
                        <span>По возрастанию</span>
                      </Space>
                    ),
                    value: 'asc',
                  },
                  {
                    label: (
                      <Space>
                        <ArrowDownOutlined />
                        <span>По убыванию</span>
                      </Space>
                    ),
                    value: 'desc',
                  },
                ]}
                onChange={changeOrder}
              />
            </Space>
            <Button type={'primary'} onClick={reset}>
              Сбросить
            </Button>
            <Button type={'default'} onClick={() => navigate('/stats')}>
              Статистика
            </Button>
          </Space>
        </div>
        {isLoading && (
          <div>
            <Spin size={'large'} />
          </div>
        )}
        {error && <div>Ошибка загрузки</div>}
        {data && !isLoading && (
          <>
            {!data.ads || data.ads.length === 0 ? (
              <Empty description="Нет объявлений" />
            ) : (
              <Row gutter={[16, 16]}>
                {data.ads.map((ad: Advertisement) => (
                  <Col xs={24} sm={24} md={8} lg={6} key={ad.id}>
                    <CardAd ad={ad} onClick={() => click(ad.id)} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
        <div className={s.pages}>
          <Pagination
            current={page}
            total={data?.pagination.totalItems}
            showSizeChanger={false}
            onChange={changePage}
          />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default MainPage
