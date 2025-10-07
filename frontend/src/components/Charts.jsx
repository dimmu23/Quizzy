import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DistributionChart = ({ easy, medium, hard }) => {
    const data = {
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
          {
            label: "Quiz Difficulty Distribution",
            data: [easy, medium, hard],
            backgroundColor: [
              "#4ade80", // subtle green
              "#facc15", // subtle yellow
              "#f87171"  // subtle red
            ],
            borderColor: "#1f2937", // dark gray for seamless blending
            borderWidth: 2,
          },
        ],
      };
    
      const options = {
        plugins: {
          legend: {
            labels: {
              color: "white", // label text color
              font: {
                size: 14,
                family: "Poppins"
              }
            }
          },
        },
      };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default DistributionChart;
