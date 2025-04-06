import React, { useContext, useState } from 'react';
import { Form, Input, Button, Upload, Typography, notification, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserRegister } from '../../apiServices/AuthService';
import AddressSelector from '../../component/Context/Address/AddressSelector';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../component/Context/AuthContext';
const { Title, Text } = Typography;


const Register = () => {
    const [form] = Form.useForm();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFinish = async (values) => {

        try {
            const avatarFile = values.avatarImage?.[0]?.originFileObj; // Lấy file đầu tiên từ danh sách
            if (!avatarFile) {
                notification.error({ message: 'Vui lòng chọn ảnh đại diện!' });
                return;
            }

            const response = await UserRegister({ ...values, avatarImage: avatarFile });
            if (response) {

                notification.success({ message: 'Đăng ký thành công!' });
                localStorage.setItem('ACCESS_TOKEN', response);
                localStorage.setItem('USER', form.getFieldValue('userName'));
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: `Xin chào ${form.getFieldValue('userName')}`,
                });
                setAuth({
                    isAuthenticated: true,
                    user: { username: form.getFieldValue('userName') },
                });

                const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
                sessionStorage.removeItem('redirectAfterLogin');
                navigate(redirectUrl);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            notification.error({ message: 'Lỗi đăng ký!', description: 'Có lỗi xảy ra trong quá trình đăng ký!' });
        }
    };


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <div
                style={{
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    maxWidth: '500px',
                }}
            >

                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Đăng Ký
                </Title>
                <Form

                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ remember: false }}
                >
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Text>Bạn đã có tài khoản? </Text>
                        <Link to="/login">Đăng nhập ngay</Link>
                    </div>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                            { pattern: /^[a-z0-9]{6,}$/, message: 'Chỉ chứa kí tự thường hoặc số, ít nhất 6 kí tự!' },
                        ]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" required />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                                message: 'Ít nhất 6 kí tự, bao gồm 1 chữ thường, 1 chữ hoa, 1 kí tự đặc biệt!'
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Họ và Tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Vui lòng nhập đúng định dạng email!' },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]+$/, message: 'Chỉ được chứa số!' },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện"
                        name="avatarImage"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                    >
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false} // Không tải file ngay lập tức
                            onChange={handleAvatarChange}
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                        {avatarPreview && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng Ký
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default Register;
