import React, { useState } from 'react';
import { Modal, Form, Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { SearchByImage } from '../../../apiServices/ProductService';

const ImageModal = ({ setProducts }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false); // State quản lý trạng thái loading

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList.map(file => ({
            ...file,
            preview: URL.createObjectURL(file.originFileObj),
        })));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (fileList.length === 0) {
                message.error('Vui lòng chọn ảnh trước khi gửi!');
                return;
            }

            setLoading(true);

            const files = fileList.map(file => file.originFileObj);
            const response = await SearchByImage({ image: files[0] });
            if (response === null) {
                message.error('Không tìm thấy sản phẩm nào giống ảnh bạn đã gửi!');
                return;
            }
            else {
                if (setProducts) {
                    setProducts(response);
                }
            }
            message.success('Tìm kiếm thành công!');
            setVisible(false);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error('Vui lòng hoàn tất mẫu trước khi gửi.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setFileList([]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
                className="searchButtonCamera"
                type="button"
                onClick={() => setVisible(true)}
                onMouseOver={(e) => e.target.style.color = 'blue'}
                onMouseOut={(e) => e.target.style.color = 'rgb(15, 162, 254)'}
            >
                <i className="fa fa-camera"></i>
            </button>

            <Modal
                title="Tìm kiếm bằng hình ảnh"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Gửi"
                cancelText="Hủy"
                confirmLoading={loading} // Thêm trạng thái loading cho nút OK
                footer={loading ? null : [  // Ẩn footer khi loading
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Gửi
                    </Button>
                ]}
            >
                <div style={{ position: 'relative' }}>
                    {/* Nếu đang loading, hiển thị Spin để cover phần nội dung */}
                    {loading && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Màu nền nhẹ để tạo hiệu ứng cover
                            zIndex: 9999,
                        }}>
                            <Spin size="large" />
                        </div>
                    )}

                    <Form form={form} layout="vertical">
                        <Form.Item label="Chọn ảnh">
                            <Upload
                                accept="image/*"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false} // Prevent auto upload
                            >
                                {fileList.length < 1 && (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default ImageModal;
