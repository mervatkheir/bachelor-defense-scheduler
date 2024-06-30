import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Dashboard.css";
import SampleNextArrow from "../../components/SampleNextArrow";
import SamplePrevArrow from "../../components/SamplePrevArrow";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const schedules = useSelector((state) => state.schedules);
  const fileManagement = useSelector((state) => state.fileManagement);
  const currentFile = fileManagement.selectedFile;
  const allDefenses = React.useMemo(
    () => schedules.schedules[currentFile] || [],
    [schedules.schedules, currentFile]
  );

  const getExaminerData = (role) => {
    return allDefenses.reduce((acc, defense) => {
      const examiner = defense[role];
      acc[examiner] = (acc[examiner] || 0) + 1;
      return acc;
    }, {});
  };

  const internalData = getExaminerData("internal");
  const externalData = getExaminerData("external");

  const createChartData = (data) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number of Defenses",
        data: Object.values(data),
        backgroundColor: Array(Object.keys(data).length).fill("#4BC0C0"),
      },
    ],
  });

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const upcomingDefenses = allDefenses
    .filter((defense) => new Date(defense.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [examiners, setExaminers] = useState({ internals: [], externals: [] });

  useEffect(() => {
    const getExaminersOnDate = (date) => {
      const dateStr = date.toISOString().split("T")[0];
      return allDefenses.reduce(
        (acc, defense) => {
          const defenseDateStr = new Date(defense.date)
            .toISOString()
            .split("T")[0];
          if (defenseDateStr === dateStr) {
            if (!acc.internals.includes(defense.internal)) {
              acc.internals.push(defense.internal);
            }
            if (!acc.externals.includes(defense.external)) {
              acc.externals.push(defense.external);
            }
          }
          return acc;
        },
        { internals: [], externals: [] }
      );
    };

    let examiners = getExaminersOnDate(selectedDate);
    setExaminers(examiners);
  }, [selectedDate, allDefenses]);

  return (
    <div className="dashboard">
      <section className="upcoming-defenses">
        <h2>Upcoming Defenses</h2>
        {upcomingDefenses.length > 0 ? (
          <Slider {...sliderSettings}>
            {upcomingDefenses.map((defense, index) => (
              <div key={index} className="slide">
                <div className="defense-item">
                  <AccessTimeIcon className="icon" />
                  <div>
                    <h3>{defense.title}</h3>
                    <p>Student: {defense.studentName}</p>
                    <p>Examiner: {defense.internal}</p>
                    <p>Date: {defense.date}</p>
                    <p>Time: {defense.time}</p>
                    <p>Room: {defense.room}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No upcoming defenses are scheduled.</p>
        )}
      </section>
      <section className="quick-statistics">
        <h2>Quick Statistics</h2>
        <div className="stats-container">
          <div className="chart">
            <Bar data={createChartData(internalData)} options={chartOptions} />
          </div>
          <div className="chart">
            <Bar data={createChartData(externalData)} options={chartOptions} />
          </div>
        </div>
      </section>
      <section className="examiners-on-date">
        <h2>Examiners on Selected Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />

        <h3>Internal Examiners:</h3>
        <ul>
          {examiners.internals.map((internal, index) => (
            <li key={index}>{internal}</li>
          ))}
        </ul>

        <h3>External Examiners:</h3>
        <ul>
          {examiners.externals.map((external, index) => (
            <li key={index}>{external}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
