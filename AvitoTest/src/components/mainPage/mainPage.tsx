import { useNavigate } from 'react-router-dom'
import { useAds } from '../../api'
import {
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
import { SearchOutlined } from '@ant-design/icons'
import {
  categories,
  statuses,
  sorts,
  sortsObj,
  statusOptions,
  categoryOptions,
  sortOptions,
  orderOptions,
  PLACEHOLDERS,
  BUTTONS,
  DEFAULT_VALUES,
} from './consts'

const MainPage = () => {
  const [status, setStatus] = useState<number[]>([])
  const [cat, setCat] = useState<number | undefined>(
    undefined
  )
  const [min, setMin] = useState<number | undefined>(undefined)
  const [max, setMax] = useState<number | undefined>(undefined)
  const [text, setText] = useState<string>('')
  const [page, setPage] = useState<number>(DEFAULT_VALUES.page)
  const [sort, setSort] = useState<'createdAt' | 'price' | 'priority'>(
    DEFAULT_VALUES.sort
  )
  const [order, setOrder] = useState<'asc' | 'desc'>(DEFAULT_VALUES.order)
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
    limit: DEFAULT_VALUES.limit,
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
              placeholder={PLACEHOLDERS.status}
              mode="multiple"
              value={status}
              options={statusOptions}
              onChange={changeStatus}
            />
            <Select
              className={s.select}
              placeholder={PLACEHOLDERS.category}
              value={
                cat !== undefined
                  ? categories[cat].name
                  : undefined
              }
              options={categoryOptions}
              onChange={changeCat}
            />
            <Space>
              <div>цена :</div>
              <InputNumber
                placeholder={PLACEHOLDERS.priceFrom}
                value={min}
                onChange={changeMin}
              />
              <div>-</div>
              <InputNumber
                placeholder={PLACEHOLDERS.priceTo}
                value={max}
                onChange={changeMax}
              />
            </Space>
            <Input
              placeholder={PLACEHOLDERS.search}
              prefix={<SearchOutlined />}
              value={text}
              allowClear
              onChange={changeSearch}
            />
            <Space>
              <span>Сортировать :</span>
              <Select
                placeholder={PLACEHOLDERS.sortField}
                value={sortsObj[sort]}
                options={sortOptions}
                onChange={sortChange}
              />
              <Select
                placeholder={PLACEHOLDERS.sortOrder}
                value={order}
                options={orderOptions}
                onChange={changeOrder}
              />
            </Space>
            <Button type={'primary'} onClick={reset}>
              {BUTTONS.reset}
            </Button>
            <Button type={'default'} onClick={() => navigate('/stats')}>
              {BUTTONS.stats}
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
