import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Foods() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/foodandexercises");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/foodandexercises", values);
    message.success("เพิ่มข้อมูลอาหารและการออกกำลังกายสำเร็จ");
    setVisible(false);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ข้อมูลอาหารและการออกกำลังกาย</h2>
        <Button type="primary" onClick={() => setVisible(true)}>เพิ่มข้อมูล</Button>
        <Table
          dataSource={data}
          rowKey="ID"
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "วันที่", dataIndex: "Date" },
            { title: "อาหาร", dataIndex: "Food" },
            { title: "ประเภทการออกกำลังกาย", dataIndex: "TypeOfExercise" },
            {
              title: "จัดการ",
              render: (r) => (
                <Button danger onClick={async () => {
                  await api.delete(`/foodandexercises/${r.ID}`);
                  message.success("ลบสำเร็จ");
                  load();
                }}>ลบ</Button>
              ),
            },
          ]}
        />
        <Modal title="เพิ่มข้อมูลอาหารและออกกำลังกาย" open={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="Date" label="วันที่"><DatePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item name="Food" label="อาหาร"><Input /></Form.Item>
            <Form.Item name="TypeOfExercise" label="ประเภทออกกำลังกาย"><Input /></Form.Item>
            <Form.Item name="PatientID" label="รหัสผู้ป่วย"><Input /></Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
