import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/login", values);
      localStorage.setItem("token", res.data.token);
      message.success("เข้าสู่ระบบสำเร็จ");
      navigate("/dashboard");
    } catch {
      message.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      }}
    >
      <Card title="เข้าสู่ระบบ" style={{ width: 400, borderRadius: 10 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="ชื่อผู้ใช้" name="thai_account" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="รหัสผ่าน" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            เข้าสู่ระบบ
          </Button>

          {/* ✅ ปุ่มสมัครสมาชิก */}
          <Button
            type="link"
            block
            onClick={() => navigate("/register")}
            style={{ marginTop: 10 }}
          >
            สมัครสมาชิก
          </Button>
        </Form>
      </Card>
    </div>
  );
}
