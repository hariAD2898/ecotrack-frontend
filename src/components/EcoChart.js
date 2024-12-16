import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EcoChart = ({ ecoData }) => {
    const chartData = {
        labels: ecoData.map(data => new Date(data.date).toLocaleDateString()),  // Dates as labels
        datasets: [
            {
                label: 'Carbon Footprint',
                data: ecoData.map(data => data.carbon_footprint),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Energy Consumption',
                data: ecoData.map(data => data.energy_consumption),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Water Usage',
                data: ecoData.map(data => data.water_usage),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Eco Tracking Data',
            },
        },
        scales: {
            x: {
                type: 'category',  // Make sure this scale type is registered
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default EcoChart;
