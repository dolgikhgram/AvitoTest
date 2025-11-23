import { Row, Col, Card } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { StatsCardsProps } from './types'
import s from './StatsCards.module.css'

const time = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}.${secs} мин`
}

const StatsCards = ({ data }: StatsCardsProps) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <div>
            <FileTextOutlined className={s.iconOk} />
            <div>
              <div>Проверено</div>
              <div>{data?.totalReviewed || 0}</div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <div>
            <CheckCircleOutlined className={s.iconGood} />
            <div>
              <div>Одобрено</div>
              <div>
                {data?.approvedPercentage
                  ? `${data.approvedPercentage.toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <div>
            <CloseCircleOutlined className={s.iconBad} />
            <div>
              <div>Отклонено</div>
              <div>
                {data?.rejectedPercentage
                  ? `${data.rejectedPercentage.toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <div>
            <ClockCircleOutlined className={s.iconClock} />
            <div>
              <div>Ср. время</div>
              <div>
                {data?.averageReviewTime
                  ? time(data.averageReviewTime)
                  : '0 мин'}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default StatsCards
