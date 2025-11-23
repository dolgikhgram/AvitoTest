import s from './itemPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useAd,
  useApproveAd,
  useRejectAd,
  useRequestChanges,
  useAds,
} from '../../api'
import {
  Alert,
  Button,
  Col,
  Layout,
  Row,
  Spin,
  Space,
  Modal,
  Radio,
  Input,
  Typography,
} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { useState, useMemo } from 'react'
import Gallery from './Gallery/Gallery'
import ModerationHistory from './ModerationHistory/ModerationHistory'
import Description from './Description/Description'

const ItemPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: ad, isLoading, error } = useAd(Number(id))
  const { data: adsData } = useAds({ limit: 1000 })

  const [show, setShow] = useState(true)

  const [open, setOpen] = useState(false)
  const [type, setType] = useState<'reject' | 'requestChanges'>('reject')
  const [reason, setReason] = useState<
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое'
  >('Запрещенный товар')
  const [other, setOther] = useState('')
  const [text, setText] = useState('')

  const adId = Number(id)
  const approveMutation = useApproveAd(adId)
  const rejectMutation = useRejectAd(adId)
  const requestChangesMutation = useRequestChanges(adId)

  const handleApprove = () => {
    approveMutation.mutate(undefined, {
      onSuccess: () => {
        setShow(false)
      },
    })
  }

  const handleReject = () => {
    setType('reject')
    setOpen(true)
  }

  const handleFix = () => {
    setType('requestChanges')
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
    setReason('Запрещенный товар')
    setOther('')
    setText('')
  }

  const handleSubmit = () => {
    if (reason === 'Другое' && !other.trim()) {
      return
    }

    const finalReason = reason === 'Другое' ? other : reason

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      reason: finalReason,
      comment: text.trim() || undefined,
    }

    if (type === 'reject') {
      rejectMutation.mutate(params, {
        onSuccess: () => {
          setOpen(false)
          setReason('Запрещенный товар')
          setOther('')
          setText('')
          setShow(false)
        },
      })
    } else {
      requestChangesMutation.mutate(params, {
        onSuccess: () => {
          setOpen(false)
          setReason('Запрещенный товар')
          setOther('')
          setText('')
          setShow(false)
        },
      })
    }
  }

  const list = useMemo(() => adsData?.ads || [], [adsData?.ads])
  const index = useMemo(() => {
    return list.findIndex(adItem => adItem.id === adId)
  }, [list, adId])

  const prevId = index > 0 ? list[index - 1]?.id : null
  const nextId = index < list.length - 1 ? list[index + 1]?.id : null

  const handleBack = () => {
    navigate('/list')
  }

  const handlePrev = () => {
    if (prevId) {
      navigate(`/item/${prevId}`)
    }
  }

  const handleNext = () => {
    if (nextId) {
      navigate(`/item/${nextId}`)
    }
  }

  return (
    <Layout>
      <Layout.Content className={s.box}>
        {isLoading && (
          <div>
            <Spin />
          </div>
        )}
        {error && (
          <Alert
            message="Ошибка загрузки"
            description={error.message}
            type="error"
          />
        )}
        {ad && !isLoading && (
          <>
            <Row gutter={15} align="top">
              <Col xs={24} md={12}>
                <Gallery images={ad.images} />
              </Col>

              <Col xs={24} md={12}>
                <ModerationHistory history={ad.moderationHistory} />
              </Col>
            </Row>

            <Description
              description={ad.description}
              seller={ad.seller}
              chars={ad.characteristics}
            />

            {show && (
              <div className={s.actions}>
                <Space size="middle">
                  <Button
                    className={s.btnOk}
                    icon={<CheckOutlined />}
                    onClick={handleApprove}
                    loading={approveMutation.isPending}
                  >
                    Одобрить
                  </Button>
                  <Button
                    className={s.btnBad}
                    icon={<CloseOutlined />}
                    onClick={handleReject}
                  >
                    Отклонить
                  </Button>
                  <Button
                    className={s.btnFix}
                    icon={<ReloadOutlined />}
                    onClick={handleFix}
                  >
                    Доработка
                  </Button>
                </Space>
              </div>
            )}

            <Modal
              title="Отклонение"
              open={open}
              onCancel={handleCancel}
              onOk={handleSubmit}
              okText="Отправить"
              cancelText="Отмена"
              okButtonProps={{ className: s.btnSend }}
            >
              <div className={s.modal}>
                <Typography.Text strong>Причина:</Typography.Text>
                <Radio.Group
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className={s.reasons}
                >
                  <Space direction="vertical">
                    <Radio value="Запрещенный товар">Запрещенный товар</Radio>
                    <Radio value="Неверная категория">Неверная категория</Radio>
                    <Radio value="Некорректное описание">
                      Некорректное описание
                    </Radio>
                    <Radio value="Проблемы с фото">Проблемы с фото</Radio>
                    <Radio value="Подозрение на мошенничество">
                      Подозрение на мошенничество
                    </Radio>
                    <Radio value="Другое">Другое:</Radio>
                  </Space>
                </Radio.Group>
                {reason === 'Другое' && (
                  <Input
                    placeholder="Укажите причину"
                    value={other}
                    onChange={e => setOther(e.target.value)}
                    className={s.other}
                  />
                )}
                <Input.TextArea
                  placeholder="Комментарий (необязательно)"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  rows={3}
                  className={s.text}
                />
              </div>
            </Modal>

            <div className={s.nav}>
              <Button
                icon={<LeftOutlined />}
                onClick={handleBack}
                className={s.btnBack}
              >
                К списку
              </Button>
              <Space>
                <Button
                  icon={<LeftOutlined />}
                  onClick={handlePrev}
                  disabled={!prevId}
                  className={s.btnNav}
                >
                  Пред
                </Button>
                <span className={s.sep}>|</span>
                <Button
                  icon={<RightOutlined />}
                  onClick={handleNext}
                  disabled={!nextId}
                  className={s.btnNav}
                >
                  След
                </Button>
              </Space>
            </div>
          </>
        )}
      </Layout.Content>
    </Layout>
  )
}

export default ItemPage
