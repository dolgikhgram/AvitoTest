import { Card, Typography, Space, Tag } from 'antd'
import type { ModerationHistoryProps } from './types'
import s from './ModerationHistory.module.css'

const actionObj = {
  approved: {
    action: 'Одобрено',
    className: s.ok,
  },
  rejected: {
    action: 'Отклонено',
    className: s.bad,
  },
  requestChanges: {
    action: 'Доработка',
    className: s.fix,
  },
}

const ModerationHistory = ({ history }: ModerationHistoryProps) => {
  return (
    <Card>
      <Typography.Title level={3}>История модерации</Typography.Title>
      {history && history.length > 0 ? (
        <Space
          direction="vertical"
          size={'middle'}
          className={s.list}
        >
          {history.map(historyItem => (
            <div key={historyItem.id}>
              <Space direction="vertical" size={'small'}>
                <Typography.Text>
                  <strong>Модератор:</strong> {historyItem.moderatorName}
                </Typography.Text>
                <Typography.Text>
                  <strong>Дата и время:</strong>{' '}
                  {new Date(historyItem.timestamp).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography.Text>
                <div>
                  {(() => {
                    const action = actionObj[historyItem.action]
                    return (
                      <Tag className={action.className}>
                        {action.action}
                      </Tag>
                    )
                  })()}
                </div>
                {historyItem.reason && (
                  <Typography.Text>
                    <strong>Причина:</strong> {historyItem.reason}
                  </Typography.Text>
                )}
                {historyItem.comment && (
                  <Typography.Text>
                    <strong>Комментарий:</strong> {historyItem.comment}
                  </Typography.Text>
                )}
              </Space>
            </div>
          ))}
        </Space>
      ) : (
        <Typography.Text type="secondary">
          История модерации отсутствует
        </Typography.Text>
      )}
    </Card>
  )
}

export default ModerationHistory

