import React from "react";
import { Menu } from "antd";

export default function Navbar() {
  const menuItems = [
    { label: "ผู้ป่วย", key: "/patients" },
    { label: "หมอ/พยาบาล", key: "/doctors" },
    { label: "นัดหมาย", key: "/appointments" },
    { label: "ผลเลือด", key: "/bloods" },
    { label: "ค่าน้ำตาล", key: "/sugars" },
    { label: "ความดัน", key: "/pressures" },
    { label: "อาหาร/ออกกำลังกาย", key: "/foods" },
    { label: "ยา", key: "/medicines" },
    { label: "ประวัติรักษา", key: "/medicalhistories" },
    { label: "ประวัติผู้ป่วย", key: "/patienthistories" },
  ];

  const handleClick = (e: any) => {
    window.location.href = e.key;
  };

  return (
    <div
      style={{
        background: "#1677ff",
        padding: "5px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>🏥 ระบบจัดการผู้ป่วย</h2>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        onClick={handleClick}
        style={{ flex: 1, justifyContent: "center", background: "transparent" }}
      />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{
          background: "#ff4d4f",
          border: "none",
          color: "white",
          borderRadius: 5,
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}
