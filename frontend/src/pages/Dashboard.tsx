import React from "react";
import Navbar from "../components/Navbar";
import { Card } from "antd";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 30 }}>
        <Card>
          <h1>ระบบจัดการข้อมูลผู้ป่วยโรงพยาบาล</h1>
          <p>เลือกระบบย่อยที่ต้องการจากเมนูด้านบน</p>
        </Card>
      </div>
    </div>
  );
}
