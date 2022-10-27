import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useSelector, useDispatch } from "react-redux";
import { getClassStatisticsAction } from "../slices/classSlice";
import "./Statistics.css";

function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector((store) => store.class.currentClassStats);
  const classId = useSelector((store) => store.class.currentClass?.id);

  const [basicData, setBasicData] = useState({});

  useEffect(() => {
    dispatch(getClassStatisticsAction(classId))
  }, [classId, dispatch]);

  useEffect(() => {
    if (statistics) {
      let labels, data = {
        presenceRate: [],
        goodPerfRate: [],
        goodBehaveRate: [],
      };
      labels = Object
        .keys(statistics.weeklyData)
        .map(key => {
          const [weekNo, year] = key.split(" ");
          return { weekNo, year, key };
        })
        .sort((a, b) => {
          if (a.weekNo > b.weekNo && a.year >= b.year) return 1;
          else return -1;
        });
      labels.forEach(label => {
        data.presenceRate.push(statistics.weeklyData[label.key].presenceRate);
        data.goodPerfRate.push(statistics.weeklyData[label.key].goodPerfRate);
        data.goodBehaveRate.push(statistics.weeklyData[label.key].goodBehaveRate);
      });

      setBasicData({
        labels: labels.map(l => `Week ${l.weekNo}`),
        datasets: [
          {
            label: "Presence Rate",
            backgroundColor: "#42A5F5",
            data: data.presenceRate,
          },
          {
            label: "Good Performance Rate",
            backgroundColor: "#0ecbb5",
            data: data.goodPerfRate,
          },
          {
            label: "Good Behaviour Rate",
            backgroundColor: "#0fba0f",
            data: data.goodBehaveRate,
          },
        ],
      });
    } else {
      setBasicData({});
    }
  }, [statistics, dispatch]);

  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };
  return (
    <div className="statistics-page">
      {statistics ? <div className="overview-chart">
        <h2>Overview</h2>
        <div className="overview-stats">
          <div>
            <p>Total number of students:</p>
            <p>{statistics?.totalStudents === "NaN" ? "0" : statistics?.totalStudents}</p>
          </div>
          <div>
            <p>Average Class Presence Rate</p>
            <p>{statistics?.presenceRateAverage === "NaN" ? "0" : statistics?.presenceRateAverage}%</p>
          </div>
          <div>
            <p>Average Class Good Performance Rate</p>
            <p>{statistics?.goodPerfRateAverage === "NaN" ? "0" : statistics?.goodPerfRateAverage}%</p>
          </div>
          <div>
            <p>Average Class Good Behaviour Rate</p>
            <p>{statistics?.goodBehaveRateAverage === "NaN" ? "0" : statistics?.goodBehaveRateAverage}%</p>
          </div>
        </div>
        <Chart type="bar" data={basicData} options={basicOptions} />
      </div> :
        <div className="overview-stats--no-data">
          <p>No statistics available for the class yet!</p>
        </div>}
    </div>
  );
}

export default Statistics;
