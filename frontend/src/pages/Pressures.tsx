import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Pressures() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/pressures");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/pressures", values);
    message.success("เพิ่มข้อมูลความดันสำเร็จ");
    setVisible(false);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ข้อมูลความดันโลหิต</h2>
        <Button type="primary" onClick={() => setVisible(true)}>เพิ่มข้อมูล</Button>
        <Table
          dataSource={data}
          rowKey="ID"
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "วันที่", dataIndex: "Date" },
            { title: "Systolic", dataIndex: "Systolic" },
            { title: "Diastolic", dataIndex: "Diastolic" },
            {
              title: "จัดการ",
              render: (r) => (
                <Button danger onClick={async () => {
                  await api.delete(`/pressures/${r.ID}`);
                  message.success("ลบสำเร็จ");
                  load();
                }}>ลบ</Button>
              ),
            },
          ]}
        />
        <Modal title="เพิ่มข้อมูลความดัน" open={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="Date" label="วันที่"><DatePicker style={{ width: "100%" }} /></Form.Item>
            <Form.Item name="Systolic" label="Systolic"><Input /></Form.Item>
            <Form.Item name="Diastolic" label="Diastolic"><Input /></Form.Item>
            <Form.Item name="PatientID" label="รหัสผู้ป่วย"><Input /></Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
