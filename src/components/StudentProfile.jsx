import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { updateStudentAction } from "../slices/studentSlice";
import "./StudentProfile.css";

function StudentProfile() {
  const dispatch = useDispatch();
  const currentStudent = useSelector((store) => store.student.currentStudent);

  const [editMode, setEditMode] = useState(false);
  const [studentName, setStudentName] = useState(currentStudent.name);
  const [dob, setDob] = useState(new Date(currentStudent.dob));
  const [gender, setGender] = useState(currentStudent.gender);
  const [emergencyNum, setEmergencyNum] = useState(currentStudent.emergency_contact_phone ?? "");
  const [emergencyEmail, setEmergencyEmail] = useState(currentStudent.emergency_contact_email ?? "");

  useEffect(() => {
    setEditMode(false);
  }, [currentStudent]);

  const editProfile = () => {
    if (editMode) {
      dispatch(
        updateStudentAction({
          studentId: currentStudent.id,
          name: studentName,
          dob: dob.toISOString().split("T")[0],
          gender,
          phone: emergencyNum,
          email: emergencyEmail
        })
      );
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className="student-profile">
      <div className="student-profile__header">
        <h2>Student Profile</h2>
        <Button
          onClick={editProfile}
          label={editMode ? "Save Profile" : "Edit Profile"}
          icon={"pi " + (!editMode ? "pi-pencil" : "pi-save")}
        />
      </div>
      <div className="student-profile__fields">
        <div className="student-profile__vertical-slices">
          <div className="student-profile__horizontal-slices">
            <p>Student Name:</p>
            {editMode ? (
              <InputText
                style={{ width: "250px" }}
                value={studentName}
                placeholder="Student Name"
                onChange={(e) => setStudentName(e.target.value)}
              />
            ) : (
              <p className="student-profile__field-value">{currentStudent.name}</p>
            )}
          </div>
          <div className="student-profile__horizontal-slices">
            <p>Date of birth:</p>
            {editMode ? (
              <Calendar  dateFormat="yy-mm-dd" style={{ width: "250px" }} value={dob} placeholder="Date of birth" onChange={(e) => setDob(e.target.value)} />
            ) : (
              <p className="student-profile__field-value">{new Date(currentStudent.dob).toLocaleDateString()}</p>
            )}
          </div>
          <div className="student-profile__horizontal-slices">
            <p>Gender:</p>
            {editMode ? (
              <InputText style={{ width: "250px" }} value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
            ) : (
              <p className="student-profile__field-value">{currentStudent.gender}</p>
            )}
          </div>
        </div>
        <div className="student-profile__vertical-slices">
          <div className="student-profile__horizontal-slices">
            <h3>Emergency Contact Details</h3>
          </div>
          <div className="student-profile__horizontal-slices">
            <p>Emergency Number:</p>
            {editMode ? (
              <InputText
                style={{ width: "250px" }}
                value={emergencyNum}
                placeholder="Contact number"
                onChange={(e) => setEmergencyNum(e.target.value)}
              />
            ) : (
              <p className="student-profile__field-value">{currentStudent.emergency_contact_phone || "No registered phone number"}</p>
            )}
          </div>
          <div className="student-profile__horizontal-slices">
            <p>Emergency Email:</p>
            {editMode ? (
              <InputText
                style={{ width: "250px" }}
                value={emergencyEmail}
                placeholder="Contact Email"
                onChange={(e) => setEmergencyEmail(e.target.value)}
              />
            ) : (
              <p className="student-profile__field-value">{currentStudent.emergency_contact_email || "No registered email"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
