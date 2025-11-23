import { Typography, Table } from 'antd'
import type { DescriptionProps } from './types'
import { columns } from './consts'
import s from './Description.module.css'

const Description = ({ description, seller, chars }: DescriptionProps) => {
  const getYearsOnSite = () => {
    const registeredDate = new Date(seller.registeredAt)
    const now = new Date()
    const years = now.getFullYear() - registeredDate.getFullYear()
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`
  }

  const data = Object.keys(chars).map(key => {
    return {
      key: key,
      name: key,
      value: chars[key],
    }
  })

  return (
    <div className={s.desc}>
      <Typography.Title level={3}>Полное описание</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>

      {data.length > 0 && (
        <div>
          <Typography.Title level={3}>Характеристики</Typography.Title>
          <Table dataSource={data} columns={columns} pagination={false} />
        </div>
      )}

      <div className={s.seller}>
        <Typography.Text>
          <strong>Продавец:</strong> {seller.name} | рейтинг: {seller.rating}
        </Typography.Text>
        <br />
        <Typography.Text>
          {seller.totalAds} объявлений | На сайте: {getYearsOnSite()}
        </Typography.Text>
      </div>

    </div>
  )
}

export default Description

