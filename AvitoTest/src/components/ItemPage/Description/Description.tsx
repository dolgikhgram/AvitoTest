import { Typography } from 'antd'
import type { Seller } from '../../../types'
import s from './Description.module.css'

type DescriptionProps = {
  description: string
  seller: Seller
}

const Description = ({ description, seller }: DescriptionProps) => {
  const getYearsOnSite = () => {
    const registeredDate = new Date(seller.registeredAt)
    const now = new Date()
    const years = now.getFullYear() - registeredDate.getFullYear()
    return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`
  }

  return (
    <div className={s.desc}>
      <Typography.Title level={3}>Полное описание</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>

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

