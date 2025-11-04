import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await api.post("/register", {
        thai_account: values.username,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
      });
      message.success("สมัครสมาชิกสำเร็จ!");
      navigate("/"); // กลับไปหน้า login
    } catch (err) {
      message.error("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      }}
    >
      <Card title="สมัครสมาชิก" style={{ width: 400, borderRadius: 10 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="ชื่อผู้ใช้" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="รหัสผ่าน" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label="ชื่อจริง" name="firstname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="นามสกุล" name="lastname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="เบอร์โทรศัพท์" name="phone">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            สมัครสมาชิก
          </Button>

          <Button
            type="link"
            block
            onClick={() => navigate("/")}
            style={{ marginTop: 10 }}
          >
            กลับไปเข้าสู่ระบบ
          </Button>
        </Form>
      </Card>
    </div>
  );
}
