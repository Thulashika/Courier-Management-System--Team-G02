import React, { useEffect, useRef } from 'react'

import { CChartBar} from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  // const random = () => Math.round(Math.random() * 200)

  return (
    <>
      <CChartBar
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],             
          datasets: [
            {
              label: 'Customers',
              // backgroundColor: `rgba(${getStyle('--cui-light-rgb')}, .1)`,
              backgroundColor: 'rgba(54, 162, 235, 0.8)', 
              // borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-light'),
              borderWidth: 1,
              barThickness: 10,
              data: [
                // random(78),
                78, 82, 72, 46, 33, 15, 26, 86, 64, 51, 6, 90, 6 
              ],
              fill: true,
            },
            {
              label: 'New Customers',
              // backgroundColor: 'transparent',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              // borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 1,
              barThickness: 10,
              data: [
                // random(70),
                70, 77, 65, 48, 30, 8, 31, 82, 65, 43, 5, 96
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              // display: false,
              display: true, // Show the legend
              position: 'top',
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },

              // barPercentage: 0.5, // Decrease bar width (default is 0.9)
              categoryPercentage: 0.7, // Adjust spacing between bars
            },
            y: {
              beginAtZero: true,
              // border: {
              //   color: getStyle('--cui-border-color-translucent'),
              // },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 100,
              ticks: {
                color: getStyle('--cui-body-color'),
                // maxTicksLimit: 5,
                // stepSize: Math.ceil(100 / 5),
                stepSize: 25, // Use consistent intervals
              },
            },
          },
          elements: {
            // line: {
            //   tension: 0.4,
            // },
            // point: {
            //   radius: 0,
            //   hitRadius: 10,
            //   hoverRadius: 4,
            //   hoverBorderWidth: 3,
            // },
            bar: {
              borderRadius: 4, // Optional: round the bar edges for a smoother look
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
