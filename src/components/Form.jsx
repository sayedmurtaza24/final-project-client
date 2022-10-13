import React, { useState } from "react";
import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createAssessmentAction,
  resetAssessments,
  selectAssessment,
  updateAssessmentAction
} from "../slices/assessmentSlice";
import "./Form.css";

function Form() {
  const dispatch = useDispatch();
  const currentStudent = useSelector((store) => store.student?.currentStudent);
  const currentAssessment = useSelector((store) => store.assessment?.currentAssessment);
  const [editMode, setEditMode] = useState(false);
  const [present, setPresent] = useState(true);
  const [goodPerf, setGoodPerf] = useState(true);
  const [goodBehave, setGoodBehave] = useState(true);
  const [perfComment, setPerfComment] = useState("");
  const [behaveComment, setBehaveComment] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    date.setHours(12);
    const found = currentStudent?.assessments.find(timelineObj => {
      return timelineObj.date.split('T')[0] === date.toISOString().split('T')[0]
    });
    if (found) {
      dispatch(selectAssessment(found))
      setEditMode(true);
    } else {
      dispatch(resetAssessments())
      setEditMode(false)
    }
  }, [dispatch, date, currentStudent]);

  useEffect(() => {
    if (currentAssessment) {
      setPresent(currentAssessment.present);
      setGoodBehave(currentAssessment.good_behave);
      setGoodPerf(currentAssessment.good_perf);
      setPerfComment(currentAssessment.perf_comment ?? "");
      setBehaveComment(currentAssessment.behave_comment ?? "");
      setDate(new Date(currentAssessment.date));
    } else {
      setPresent(true)
      setGoodPerf(false)
      setGoodBehave(false)
      setPerfComment("")
      setBehaveComment("")
    }
  }, [currentAssessment]);

  const addToStudentTimeline = () => {
    const payload = {
      studentId: currentStudent.id,
      assessmentId: currentAssessment?.id,
      date: date.toISOString().split("T")[0],
      present,
      good_behave: goodBehave,
      good_perf: goodPerf,
      perf_comment: perfComment,
      behave_comment: behaveComment,
    };

    dispatch(!editMode ? createAssessmentAction(payload) : updateAssessmentAction(payload));
    setPresent(true);
    setGoodPerf(true);
    setGoodBehave(true);
    setPerfComment("");
    setBehaveComment("");
  };

  return (
    <div className="form">
      <div className="form__header">
        <h2>{editMode ? 'Edit' : 'Add'} student status</h2>
        <Button label={editMode ? "Edit timeline status" : "Add status to timeline"} onClick={addToStudentTimeline} icon="pi pi-plus" />
      </div>
      <div className="form__parts">
        <div className="form__part">
          <ToggleButton
            className="p-button-sm"
            onLabel="Present"
            offLabel="Absent"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={present}
            onChange={() => setPresent(!present)}
          />
          <Calendar dateFormat="yy-mm-dd" value={date} id="icon" onChange={(e) => setDate(e.value)} showIcon />
        </div>
        <div className="form__part">
          <ToggleButton
            className="p-button-sm"
            onLabel="Good performance"
            offLabel="Bad performance"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={goodPerf}
            onChange={() => setGoodPerf(!goodPerf)}
          />
          <InputTextarea
            value={perfComment}
            onChange={(e) => setPerfComment(e.target.value)}
            autoResize
            placeholder="Write performance comment here..."
            className="form__input--box"
          />
        </div>
        <div className="form__part">
          <ToggleButton
            className="p-button-sm"
            onLabel="Good behavior"
            offLabel="Bad behavior"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={goodBehave}
            onChange={() => setGoodBehave(!goodBehave)}
          />
          <InputTextarea
            autoResize
            value={behaveComment}
            onChange={(e) => setBehaveComment(e.target.value)}
            placeholder="Write behaviour comment here..."
            className="form__input--box"
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
