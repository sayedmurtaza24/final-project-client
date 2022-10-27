import React from "react";
import Header from "../components/Header";
import StudentList from "../components/StudentList";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import Statistics from "../components/Statistics";
import "./Home.css";

function Home() {
  const currentClass = useSelector((store) => store.class?.currentClass);
  const currentStudent = useSelector((store) => store.student?.currentStudent);

  return (
    <div className="homepage-container">
      <Header />
      {currentClass ? (
        <>
          <StudentList />
          {currentStudent ? <Main /> : <div className="main-placeholder">{currentClass && <Statistics />}</div>}
        </>
      ) :
        <div className="homepage--no-class"><p>Select or Create a class to get started!</p></div>
      }
    </div>
  );
}

export default Home;
