import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Common Chart.js default options for Tensora Black + Silver + Blue
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#c9ced6',
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
          weight: '500'
        },
        usePointStyle: true,
        padding: 18
      }
    },
    tooltip: {
      backgroundColor: 'rgba(13, 18, 26, 0.95)',
      titleColor: '#ffffff',
      bodyColor: '#c9ced6',
      borderColor: 'rgba(0, 102, 255, 0.4)',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      titleFont: {
        weight: 'bold',
        size: 13
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(201, 206, 214, 0.05)',
        drawBorder: false
      },
      ticks: {
        color: '#737b87',
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(201, 206, 214, 0.05)',
        drawBorder: false
      },
      ticks: {
        color: '#737b87',
        font: {
          size: 11
        }
      }
    }
  }
};
