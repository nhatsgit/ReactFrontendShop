import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Tabs, notification, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ChangePassword, GetMyInfo, UpdateUserInfo } from '../../apiServices/AuthService';
import AddressSelector from '../../component/Context/Address/AddressSelector';

const { TabPane } = Tabs;

const Account = () => {
    const [profileForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAddressSelectorVisible, setIsAddressSelectorVisible] = useState(false);


    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const resUser = await GetMyInfo();
                setUser(resUser);
                setAddress(resUser.address);
            } catch (error) {
                notification.info({ message: "Đã hết phiên đang nhập, vui lòng đăng nhập lại" });
                navigate("/login");
            } finally {
                setLoading(false)
            };
        };
        fetchApi();
    }, []);
    const [address, setAddress] = useState(null);

    const handleAddressChange = () => {
        setIsAddressSelectorVisible(true);
    };

    const handleAddressSelectorClose = () => {
        setIsAddressSelectorVisible(false);
    };
    const onFinishProfile = async (values) => {
        console.log('Updated Profile:', values);
        try {
            const avatarFile = values.avatarImage?.[0]?.originFileObj;
            const response = await UpdateUserInfo({ ...values, address, avatarImage: avatarFile });
            if (response) {
                notification.success({
                    message: 'Cập nhật thông tin thành công!',
                });
            } else {
                notification.error({
                    message: 'Đã xảy ra lỗi nhập!',
                });
            }

        } catch (error) {
            notification.error({
                message: 'Đã xảy ra lỗi!',
            });
        }
    };

    const onFinishPassword = async (values) => {
        console.log('Change Password:', values);
        const res = await ChangePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });

        if (res) {
            notification.success({
                message: 'Đổi mật khẩu thành công!',
            });
        } else {
            notification.error({
                message: 'Sai mật khẩu cũ!',
            });
        }
    };
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Cập nhật thông tin" key="1">
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                            alt="Preview"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '2px solid #ccc',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <Form
                        form={profileForm}
                        layout="vertical"
                        onFinish={onFinishProfile}
                        initialValues={{
                            userName: user.userName,
                            fullName: user.fullName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            address: address,
                        }}
                    >
                        <Form.Item
                            label="Tên đăng nhập"
                            name="userName"
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 6, message: 'Tên đăng nhập phải có ít nhất 6 ký tự!' },
                                { pattern: /^[a-z0-9]+$/, message: 'Tên đăng nhập chỉ có thể chứa chữ thường và số!' },
                            ]}
                        >
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input.TextArea
                                placeholder="Chọn địa chỉ"
                                value={address}
                                onClick={handleAddressChange}
                                readOnly
                                autoSize={{ minRows: 2, maxRows: 2 }} // Luôn hiển thị 2 hàng
                            />
                        </Form.Item>
                        <Modal
                            title="Chọn địa chỉ"
                            visible={isAddressSelectorVisible}
                            onCancel={handleAddressSelectorClose}
                            footer={null}
                            destroyOnClose
                        >
                            <AddressSelector
                                onClose={handleAddressSelectorClose}
                                setAddress={(selectedAddress) => {
                                    setAddress(selectedAddress);
                                    setIsAddressSelectorVisible(false);
                                }}
                            />
                        </Modal>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatarImage"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        >
                            <Upload
                                accept="image/*"
                                beforeUpload={() => false}
                                listType="picture-card"
                                maxCount={1}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div>Chọn ảnh</div>
                                </div>
                            </Upload>
                        </Form.Item>



                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Cập nhật thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Đổi mật khẩu" key="2">
                    <Form
                        form={passwordForm}
                        layout="vertical"
                        onFinish={onFinishPassword}
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                    >
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' },
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/, message: 'Mật khẩu phải bao gồm ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt!' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu mới"
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Account;
