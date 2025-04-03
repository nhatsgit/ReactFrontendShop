import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, Rate, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AddReviews } from '../../../apiServices/ProductService';

const ProductReviewModal = ({ productId, orderId }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList.map(file => ({
            ...file,
            preview: URL.createObjectURL(file.originFileObj),
        })));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log({ ...values, files: fileList, productId, orderId });
            const files = fileList.map(file => file.originFileObj);
            const response = await AddReviews({ ...values, files, productId, orderId });
            message.success('Review submitted successfully!');
            setVisible(false);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error('Please complete the form before submitting.');
        }
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setFileList([]);
    };

    return (
        <div>
            <button className="btn btn-fefault cart" type="primary" onClick={() => setVisible(true)}>
                Đánh giá
            </button>
            <Modal
                title="Đánh giá sản phẩm"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Gửi"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="noiDung"
                        label="Nội dung đánh giá"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
                    </Form.Item>
                    <Form.Item
                        name="diem"
                        label="Điểm đánh giá"
                        rules={[{ required: true, message: 'Vui lòng chọn điểm!' }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item label="Chọn ảnh">
                        <Upload
                            accept="image/*"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false} // Prevent auto upload
                        >
                            {fileList.length < 5 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default ProductReviewModal;
