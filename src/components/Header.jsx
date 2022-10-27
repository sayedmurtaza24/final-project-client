import React from "react";
import "./Header.css";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { resetTeacher } from "../slices/teacherSlice";
import { logoutAction, resetAuth } from "../slices/authSlice";
import { resetCurrentStudent } from "../slices/studentSlice";
import { resetClasses } from "../slices/classSlice";
import ChangeClass from "./ChangeClass";
import { resetAssessments } from "../slices/assessmentSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <h1 className="header__title">
        <strong>Track</strong>
        <span>Mate</span>
      </h1>
      <div className="header__buttons">
        <ChangeClass />
        <Button
          label="Show stats"
          icon="pi pi-chart-bar"
          onClick={() => dispatch(resetCurrentStudent())}
          className="p-button-outlined p-button-sm"
        />
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          onClick={() => {
            dispatch(resetAssessments());
            dispatch(resetTeacher());
            dispatch(resetClasses());
            dispatch(resetCurrentStudent());
            dispatch(resetAuth());
            dispatch(logoutAction());
          }}
          className="p-button-outlined p-button-sm"
        />
      </div>
    </div>
  );
}

export default Header;
