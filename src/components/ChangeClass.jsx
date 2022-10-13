import React, { useState } from "react";
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useSelector, useDispatch } from "react-redux";
import { createClassAction, getClassAction } from "../slices/classSlice";
import { resetCurrentStudent } from "../slices/studentSlice";
import "./ChangeClass.css";

function ChangeClass() {
  const dispatch = useDispatch();

  const [addClassVisible, setAddClassVisible] = useState(false);
  const [classesListVisible, setClassesListVisible] = useState(false);
  const [classNameValue, setClassNameValue] = useState("");

  const currentTeacher = useSelector((store) => store.teacher?.currentTeacher);
  const currentClass = useSelector((store) => store.class?.currentClass);

  const createClass = () => {
    dispatch(createClassAction(classNameValue));
    setAddClassVisible(false);
    setClassNameValue("");
  };

  const chooseClass = id => {
    dispatch(getClassAction(id));
    setClassesListVisible(false);
    dispatch(resetCurrentStudent());
  };

  return (
    <>
      <Dialog
        header="Add a class"
        visible={addClassVisible}
        footer={<Button label="Add Class" onClick={createClass} />}
        resizable={false}
        onHide={() => setAddClassVisible(false)}
      >
        <div className="addClass__form">
          <div>
            <label htmlFor="name" className="classAdmission__form--option">
              Name
            </label>
            <InputText
              id="name"
              value={classNameValue}
              onChange={(e) => setClassNameValue(e.target.value)}
              className="classAdmission__form--input"
            />
          </div>
        </div>
      </Dialog>

      <Dialog header="Class List" visible={classesListVisible} resizable={false} onHide={() => setClassesListVisible(false)}>
        <Button icon="pi pi-plus" label="Add Class" onClick={() => setAddClassVisible(true)} />
        <div className="separator"></div>
        <ListBox
          style={{ width: "300px" }}
          value={currentClass?.id}
          onChange={(e) => chooseClass(e.value)}
          options={currentTeacher.classes}
          optionLabel="name"
          optionValue="id"
        />
      </Dialog>

      <Button
        className="p-button-sm p-button-outlined"
        label={currentClass ? "Chosen class: " + currentClass?.name : "Choose a class"}
        onClick={() => setClassesListVisible(true)}
        icon="pi pi-sitemap"
      />
    </>
  );
}

export default ChangeClass;
