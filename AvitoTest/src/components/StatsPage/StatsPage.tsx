import { Typography, Row, Col, Card, Button } from 'antd'
import { Column, Pie } from '@ant-design/charts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSummaryStats, useActivityChart, useDecisionsChart } from '../../api'
import type { StatsPeriod } from '../../types'
import Period from './Period/Period'
import StatsCards from './StatsCards/StatsCards'

const StatsPage = () => {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<StatsPeriod>('week')

  const { data: summary } = useSummaryStats({ period })
  const { data: activity, isLoading: activityLoading } = useActivityChart({
    period,
  })
  const { data: decisions, isLoading: decisionsLoading } = useDecisionsChart({
    period,
  })

  const data = activity || []
  const chart = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
    }),
    value: item.approved + item.rejected + item.requestChanges,
  }))

  const items = decisions
    ? [
        { type: 'Одобрено', value: decisions.approved },
        { type: 'Отклонено', value: decisions.rejected },
        { type: 'Доработка', value: decisions.requestChanges },
      ].filter(item => item.value > 0)
    : []

  const back = () => {
    navigate('/list')
  }

  return (
    <div>
      <Button onClick={back}>На главную</Button>
      <Period value={period} onChange={setPeriod} />
      <StatsCards data={summary} />

      <Row gutter={16}>
        <Col xs={24}>
          <Card>
            <Typography.Title level={4}>График активности</Typography.Title>
            {activityLoading ? (
              <div>Загрузка...</div>
            ) : chart.length === 0 ? (
              <div>График не загрузился</div>
            ) : (
              <Column
                data={chart}
                xField="date"
                yField="value"
                color={['#CCFF00']}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card>
            <Typography.Title level={4}>Распределение решений</Typography.Title>
            {decisionsLoading ? (
              <div>Загрузка...</div>
            ) : items.length === 0 ? (
              <div>График не загрузился</div>
            ) : (
              <Pie
                data={items}
                angleField="value"
                colorField="type"
                color={['#52c41a', '#ff4d4f', '#faad14']}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StatsPage
