import React from 'react';
import { Card, Rate, Space, Image, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductReviews = ({ reviews }) => {
    return (
        <div>
            <Title level={3}>Đánh giá sản phẩm</Title>
            {reviews.length === 0 ? (
                <Text>Chưa có đánh giá nào cho sản phẩm này.</Text>
            ) : (
                reviews.map((review) => (
                    <Card key={review.reviewsId} style={{ marginBottom: 20, textAlign: 'left' }}>
                        {/* Căn chỉnh các phần tử theo dạng flex */}
                        <Space size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                                width={50}
                                src={`${process.env.REACT_APP_API_URL}${review.customer.avatar}` || "/images/avatar_default.png"}
                                fallback="/images/avatar_default.png"
                                preview={false}
                                style={{ borderRadius: '50%' }}
                            />
                            <div>
                                <Text strong>{review.customer.userName}</Text>
                                <Text type="secondary" style={{ marginLeft: 10 }}>
                                    {new Date(review.thoiGianDanhGia).toLocaleString()}
                                </Text>
                            </div>
                        </Space>

                        {/* Căn chỉnh điểm đánh giá và nội dung về phía trái */}
                        <div style={{ marginTop: 10 }}>
                            <Rate disabled value={review.diemDanhGia} style={{ marginRight: 10 }} />
                        </div>

                        <p style={{ marginTop: 10 }}>{review.noiDung}</p>

                        {/* Căn chỉnh hình ảnh về phía trái */}
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {review.reviewsImages.map((image, index) => (
                                <Image
                                    key={index}
                                    width={100}
                                    src={`${process.env.REACT_APP_API_URL}${image.url}`}
                                    style={{ marginRight: 10, marginTop: 10 }}
                                    preview={true}
                                />
                            ))}
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
};

export default ProductReviews;
