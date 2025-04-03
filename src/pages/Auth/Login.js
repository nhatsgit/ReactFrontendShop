import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import * as AuthService from '../../apiServices/AuthService';
import { AuthContext } from '../../component/Context/AuthContext';

const { Title, Text } = Typography;

function Login() {
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth, navigate]);

    const handleSubmit = async (values) => {
        setLoading(true);
        const { userName, password, rememberMe } = values;

        const res = await AuthService.LoginRequest(userName, password);

        if (res) {
            localStorage.setItem('ACCESS_TOKEN', res);
            localStorage.setItem('USER', userName);
            notification.success({
                message: 'Đăng nhập thành công',
                description: `Xin chào ${userName}`,
            });
            setAuth({
                isAuthenticated: true,
                user: { username: userName },
            });

            const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
            sessionStorage.removeItem('redirectAfterLogin');
            navigate(redirectUrl);
        } else {
            notification.error({
                message: 'Đăng nhập không thành công',
                description: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div
                style={{
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Đăng Nhập
                </Title>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        rememberMe: false,
                    }}
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item name="rememberMe" valuePropName="checked">
                        <Checkbox>Nhớ mật khẩu</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Text>Bạn chưa có tài khoản? </Text>
                    <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
