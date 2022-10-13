import React from "react";
import TimelineDay from "./TimelineDay";
import { useSelector } from "react-redux";
import "./Timeline.css";

function Timeline() {
  const timeline = useSelector((store) => store.student?.currentStudent?.assessments);
  const currentAssessment = useSelector(store => store.assessment?.currentAssessment);

  const sortTimeline = (timelineList = []) => {
    return timelineList.slice().sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      if (da > db) return 1;
      else if (da < db) return -1;
      else return 0;
    });
  }

  return (
    <div className="timeline">
      <div className="timeline--fields">
        <div className="timeline--fields__box">
          <h3>Timeline</h3>
        </div>
        <div className="timeline--fields__box">Present</div>
        <div className="timeline--fields__box">Academic Performance</div>
        <div className="timeline--fields__box">Behavior</div>
      </div>
      {timeline.length ? (
        <div className="timeline__calendar">
          {sortTimeline(timeline)?.map((timelineDay) => (
            <TimelineDay key={timelineDay.id} timeline={timelineDay} isSelected={currentAssessment?.id === timelineDay.id} />
          ))}
        </div>
      ) : (
        <div className="timeline__empty-placeholder">
          <h3>Use the form below to add to the timeline</h3>
        </div>
      )}
    </div>
  );
}

export default Timeline;
