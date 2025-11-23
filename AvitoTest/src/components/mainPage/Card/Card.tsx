import React from 'react'
import s from './Card.module.css'
import type { Advertisement } from '../../../types'
import { Button, Flex, Image, Tag, Typography } from 'antd'
import { Card } from 'antd'

type CardPropsType = {
  ad: Advertisement
  onClick?: () => void
}

const { Title, Text } = Typography

const statusObj = {
  pending: {
    status: 'ожидает модерации',
    className: s.statusWait,
  },
  approved: {
    status: 'одобрено',
    className: s.statusOk,
  },
  rejected: {
    status: 'отклонено',
    className: s.statusBad,
  },
  draft: {
    status: 'черновик',
    className: s.statusNew,
  },
}

const CardAd: React.FC<CardPropsType> = ({ ad, onClick }) => {
  const status = statusObj[ad.status]

  return (
    <Card>
      <Flex gap={15} align={'center'}>
        <Image width={120} height={120} src={ad.images[0]} preview={false} />
        <Flex vertical gap={5}>
          <Title level={4}>{ad.title}</Title>
          <Flex gap={8} align="center">
            <Tag className={status.className}>{status.status}</Tag>
            {ad.priority === 'urgent' && (
              <Tag className={s.priorityUrgent}>Срочный</Tag>
            )}
            {ad.priority === 'normal' && (
              <Tag className={s.priorityNormal}>Обычный</Tag>
            )}
          </Flex>
          <Flex gap={8} align="center">
            <Text strong>{ad.price.toLocaleString('ru-RU')} ₽</Text>
          </Flex>
          <Text>
            {ad.category} • {new Date(ad.createdAt).toLocaleDateString('ru-RU')}
          </Text>
        </Flex>
      </Flex>
      <Button type={'primary'} onClick={onClick} className={s.btn}>
        Открыть
      </Button>
    </Card>
  )
}

export default CardAd
