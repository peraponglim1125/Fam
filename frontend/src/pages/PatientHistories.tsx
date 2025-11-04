import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function PatientHistories() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/patienthistories");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/patienthistories", values);
    message.success("เพิ่มประวัติผู้ป่วยสำเร็จ");
    setVisible(false);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ประวัติผู้ป่วย</h2>
        <Button type="primary" onClick={() => setVisible(true)}>เพิ่มข้อมูล</Button>
        <Table
          dataSource={data}
          rowKey="ID"
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "ชื่อ", dataIndex: "FirstName" },
            { title: "นามสกุล", dataIndex: "LastName" },
            { title: "เบอร์โทร", dataIndex: "Phone" },
            { title: "เพศ", dataIndex: "Gender" },
            {
              title: "จัดการ",
              render: (r) => (
                <Button danger onClick={async () => {
                  await api.delete(`/patienthistories/${r.ID}`);
                  message.success("ลบสำเร็จ");
                  load();
                }}>ลบ</Button>
              ),
            },
          ]}
        />
        <Modal title="เพิ่มข้อมูลผู้ป่วย" open={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="FirstName" label="ชื่อ"><Input /></Form.Item>
            <Form.Item name="LastName" label="นามสกุล"><Input /></Form.Item>
            <Form.Item name="Phone" label="เบอร์โทร"><Input /></Form.Item>
            <Form.Item name="Gender" label="เพศ"><Input /></Form.Item>
            <Form.Item name="PatientID" label="รหัสผู้ป่วย"><Input /></Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
