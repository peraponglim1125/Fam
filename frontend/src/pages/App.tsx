import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Appointments from "./Appointments";
import Bloods from "./Bloods";
import Sugars from "./Sugars";
import Pressures from "./Pressures";
import Foods from "./Foods";
import Medicines from "./Medicines";
import MedicalHistories from "./MedicalHistories";
import PatientHistories from "./PatientHistories";
import Register from "./Register"; // ✅ เพิ่ม

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ เพิ่ม */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/bloods" element={<Bloods />} />
        <Route path="/sugars" element={<Sugars />} />
        <Route path="/pressures" element={<Pressures />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicalhistories" element={<MedicalHistories />} />
        <Route path="/patienthistories" element={<PatientHistories />} />
      </Routes>
    </BrowserRouter>
  );
}
