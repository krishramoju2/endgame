import React from "react";
import { useAppContext } from "../contexts/AppContext";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { currentCareerId, analytics, careers, theme } = useAppContext();

  if (!currentCareerId) return null;

  const careerData = analytics[currentCareerId];
  const career = careers.find((c) => c.id === currentCareerId);

  if (!career || !careerData) return null;
  if (careerData.totalQuestions === 0) {
    return (
      No data yet. Ask some questions to see analytics.
    );
  }

  const topResponses = careerData.responseCounts.map((count, idx) => ({
    response: career.responses[idx],
    count,
  }));

  const barData = {
    labels: topResponses.map((r) => r.response),
    datasets: [
      {
        label: "Response usage count",
        data: topResponses.map((r) => r.count),
        backgroundColor: {
          light: "#007bff",
          dark: "#00bcd4",
          blue: "#48dbfb",
        }[theme],
      },
    ],
  };

  const lineData = {
    labels: careerData.interactions.map((i) =>
      new Date(i.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Average Rating Over Time",
        fill: false,
        data: careerData.interactions.reduce((acc, interaction, i, arr) => {
          const avg =
            arr.slice(0, i + 1).reduce((sum, curr) => sum + curr.rating, 0) /
            (i + 1);
          acc.push(avg);
          return acc;
        }, [] as number[]),
        borderColor: "#e74c3c",
      },
    ],
  };

  return (



          Questions
          {careerData.totalQuestions}


          Average Rating
          {careerData.avgRating.toFixed(2)}


          Last Used

            {careerData.lastUsed
              ? new Date(careerData.lastUsed).toLocaleString()
              : "Never"}




        Top Responses



        Rating Trend



  );
}
