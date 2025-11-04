import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Appointments() {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const load = async () => {
    const res = await api.get("/appointments");
    setData(res.data);
  };

  const onFinish = async (values: any) => {
    await api.post("/appointments", values);
    message.success("เพิ่มข้อมูลการนัดหมายสำเร็จ");
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
        <h2>ข้อมูลการนัดหมาย</h2>
        <Button type="primary" onClick={() => setVisible(true)}>
          เพิ่มนัดหมาย
        </Button>
        <Table
          dataSource={data}
          columns={[
            { title: "ID", dataIndex: "ID" },
            { title: "ApplointmentDay", dataIndex: "ApplointmentDay" },
            { title: "ReasonForApplointment", dataIndex: "ReasonForApplointment" },
            { title: "PatientID", dataIndex: "PatientID" },
            {
              title: "จัดการ",
              render: (record) => (
                <Button
                  danger
                  onClick={async () => {
                    await api.delete(`/appointments/${record.ID}`);
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
          title="เพิ่มข้อมูลนัดหมาย"
          open={visible}
          onCancel={() => setVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="ApplointmentDay" label="วันที่นัดหมาย" required>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="ReasonForApplointment" label="เหตุผลการนัดหมาย" required>
              <Input />
            </Form.Item>
            <Form.Item name="PatientID" label="รหัสผู้ป่วย" required>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
