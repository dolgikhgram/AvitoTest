import { Row, Col, Image, Typography } from 'antd'
import s from './Gallery.module.css'

type GalleryProps = {
  images: string[]
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <div>
      <Typography.Title level={2}>Галерея</Typography.Title>
      {images && images.length > 0 && (
        <Image.PreviewGroup>
          <Row gutter={[8, 8]}>
            {images.map((imageUrl, i) => {
              return (
                <Col xs={12} sm={8} key={i}>
                  <Image
                    src={imageUrl}
                    alt={`Изображение ${i + 1}`}
                    className={s.img}
                    preview={{
                      mask: 'Просмотр',
                    }}
                  />
                </Col>
              )
            })}
          </Row>
        </Image.PreviewGroup>
      )}
    </div>
  )
}

export default Gallery

