import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Medicines() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/medicines");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/medicines", values);
    message.success("เพิ่มข้อมูลยาเรียบร้อย");
    setVisible(false);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ข้อมูลยา</h2>
        <Button type="primary" onClick={() => setVisible(true)}>เพิ่มข้อมูลยา</Button>
        <Table
          dataSource={data}
          rowKey="ID"
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "ชื่อยา", dataIndex: "MedicineName" },
            { title: "จำนวน", dataIndex: "Amount" },
            { title: "รหัสผู้ป่วย", dataIndex: "PatientID" },
            {
              title: "จัดการ",
              render: (r) => (
                <Button danger onClick={async () => {
                  await api.delete(`/medicines/${r.ID}`);
                  message.success("ลบสำเร็จ");
                  load();
                }}>ลบ</Button>
              ),
            },
          ]}
        />
        <Modal title="เพิ่มยา" open={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="MedicineName" label="ชื่อยา"><Input /></Form.Item>
            <Form.Item name="Amount" label="จำนวน"><Input /></Form.Item>
            <Form.Item name="PatientID" label="รหัสผู้ป่วย"><Input /></Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
