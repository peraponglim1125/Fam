import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Doctors() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/doctorandnurses");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/doctorandnurses", values);
    message.success("เพิ่มข้อมูลแพทย์/พยาบาลสำเร็จ");
    setVisible(false);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ข้อมูลแพทย์/พยาบาล</h2>
        <Button type="primary" onClick={() => setVisible(true)}>
          เพิ่มข้อมูล
        </Button>
        <Table
          dataSource={data}
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "AccountID", dataIndex: "AccountID" },
            { title: "PatientID", dataIndex: "PatientID" },
            {
              title: "จัดการ",
              render: (record) => (
                <Button
                  danger
                  onClick={async () => {
                    await api.delete(`/doctorandnurses/${record.ID}`);
                    message.success("ลบข้อมูลสำเร็จ");
                    load();
                  }}
                >
                  ลบ
                </Button>
              ),
            },
          ]}
          rowKey="ID"
        />
        <Modal
          title="เพิ่มข้อมูลแพทย์/พยาบาล"
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="AccountID" label="AccountID" required>
              <Input />
            </Form.Item>
            <Form.Item name="PatientID" label="PatientID" required>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
