import { Typography, Radio } from 'antd'
import s from './Period.module.css'
import type { StatsPeriod } from '../../../types'

type PeriodProps = {
  value: StatsPeriod
  onChange: (value: StatsPeriod) => void
}

const Period = ({ value, onChange }: PeriodProps) => {
  return (
    <div className={s.periodBox}>
      <Typography.Text strong>Период: </Typography.Text>
      <Radio.Group
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.radio}
      >
        <Radio.Button value="today">Сегодня</Radio.Button>
        <Radio.Button value="week">7д</Radio.Button>
        <Radio.Button value="month">30д</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default Period

