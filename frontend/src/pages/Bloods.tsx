// src/pages/Bloods.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Bloods() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  // โหลดข้อมูลจาก backend
  const load = async () => {
    try {
      const res = await api.get("/bloods");
      setData(res.data);
    } catch {
      message.error("ไม่สามารถโหลดข้อมูลผลเลือดได้");
    }
  };

  // เพิ่มข้อมูลผลเลือด
  const onFinish = async (values: any) => {
    try {
      await api.post("/bloods", values);
      message.success("บันทึกผลเลือดสำเร็จ");
      setVisible(false);
      form.resetFields();
      load();
    } catch {
      message.error("บันทึกข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>ผลตรวจเลือด</h2>

        <Button type="primary" onClick={() => setVisible(true)}>
          เพิ่มผลเลือด
        </Button>

        <Table
          style={{ marginTop: 20 }}
          dataSource={data}
          rowKey="ID"
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "วันที่ตรวจ", dataIndex: "Date" },
            { title: "WBC", dataIndex: "WBC" },
            { title: "RBC", dataIndex: "RBC" },
            { title: "Hb", dataIndex: "Hb" },
            { title: "FBS", dataIndex: "FBS" },
            {
              title: "จัดการ",
              render: (r) => (
                <Button
                  danger
                  onClick={async () => {
                    await api.delete(`/bloods/${r.ID}`);
                    message.success("ลบสำเร็จ");
                    load();
                  }}
                >
                  ลบ
                </Button>
              ),
            },
          ]}
        />

        {/* Modal เพิ่มผลเลือด */}
        <Modal
          title="เพิ่มผลเลือด"
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="Date"
              label="วันที่ตรวจ"
              rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="WBC" label="WBC">
              <Input />
            </Form.Item>
            <Form.Item name="RBC" label="RBC">
              <Input />
            </Form.Item>
            <Form.Item name="Hb" label="Hb">
              <Input />
            </Form.Item>
            <Form.Item name="FBS" label="FBS">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
