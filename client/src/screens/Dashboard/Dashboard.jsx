import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Dashboard.css";
import SampleNextArrow from "../../components/SampleNextArrow";
import SamplePrevArrow from "../../components/SamplePrevArrow";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
Chart.register(ArcElement);

// Dummy data
const upcomingDefenses = [
  {
    id: 1,
    title: "Defense 1",
    student: "Ahmed Ali",
    examiner: "Dr. John Doe",
    date: "2024-05-15",
    time: "10:00",
    room: "C7.302",
  },
  {
    id: 2,
    title: "Defense 2",
    student: "Mona Hassan",
    examiner: "Dr. John Doe",
    date: "2024-05-16",
    time: "12:00",
    room: "C2.203",
  },
  {
    id: 3,
    title: "Defense 3",
    student: "Ali Ahmed",
    examiner: "Dr. Mervat Abu Elkheir",
    date: "2024-05-17",
    time: "14:00",
    room: "C5.102",
  },
  {
    id: 4,
    title: "Defense 4",
    student: "Hassan Mona",
    examiner: "Dr. John Doe",
    date: "2024-05-18",
    time: "16:00",
    room: "C3.502",
  },
  {
    id: 5,
    title: "Defense 5",
    student: "John Doe",
    examiner: "Dr. Heba El Mougy",
    date: "2024-05-19",
    time: "18:00",
    room: "C4.202",
  },
];

const defensesPerExaminer = upcomingDefenses.reduce((acc, defense) => {
  const { examiner } = defense;
  if (!acc[examiner]) {
    acc[examiner] = { count: 1, label: examiner };
  } else {
    acc[examiner].count++;
  }
  return acc;
}, {});

const chartData = {
  labels: Object.values(defensesPerExaminer).map((def) => def.label),
  datasets: [
    {
      data: Object.values(defensesPerExaminer).map((def) => def.count),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F77825"],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#F77825",
      ],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    datalabels: {
      color: "#ffffff",
      display: (context) => {
        return context.dataset.data[context.dataIndex];
      },
      font: {
        weight: "700",
        size: 10,
      },
      formatter: (value, context) => {
        return context.chart.data.labels[context.dataIndex];
      },
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

const totalDefenses = upcomingDefenses.length;
const totalExaminers = Object.keys(defensesPerExaminer).length;

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="upcoming-defenses">
        <h2>Upcoming Defenses</h2>
        <Slider {...sliderSettings}>
          {upcomingDefenses.map((defense) => (
            <div key={defense.id} className="slide">
              <div className="defense-item">
                <AccessTimeIcon className="icon" />
                <div>
                  <h3>{defense.title}</h3>
                  <p>Student: {defense.student}</p>
                  <p>Examiner: {defense.examiner}</p>
                  <p>Date: {defense.date}</p>
                  <p>Time: {defense.time}</p>
                  <p>Room: {defense.room}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <section className="quick-statistics">
        <h2>Quick Statistics</h2>
        <div className="stats-container">
          <div className="chart">
            <Pie data={chartData} options={chartOptions} />
          </div>
          <div className="text-stats">
            {/* Other stats as text */}
            <p>Total Defenses: {totalDefenses}</p>
            <p>Total Examiners: {totalExaminers}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
