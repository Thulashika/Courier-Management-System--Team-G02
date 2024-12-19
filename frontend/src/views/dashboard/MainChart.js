import React, { useEffect, useRef, useState } from 'react'

import { CChartBar } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import axios from 'axios'

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

  
  const [data, setData] = useState({})

  useEffect(() => {
    getTotalCount()
  }, [])

  const getTotalCount = () => {
    axios
      .get('http://localhost:6431/dashboard/count')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching total count:', err);
      });
  };

  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthDataMap = new Map(data?.monthlyCustomerCounts?.map(item => [item.month, item]));
  
  const getCustomerData = (type) => fullMonths.map(month => (monthDataMap.get(month)?.[type] || 0));
  

  return (
    <>
      {/* <CChartBar
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          // labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],      
          labels: data?.monthlyCustomerCounts?.map(month => month.month),       
          datasets: [
            {
              label: 'Customers',
              // backgroundColor: `rgba(${getStyle('--cui-light-rgb')}, .1)`,
              backgroundColor: 'rgba(54, 162, 235, 0.8)', 
              // borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-light'),
              borderWidth: 1,
              barThickness: 10,
              // data: [
              //   // random(78),
              //   78, 82, 72, 46, 33, 15, 26, 86, 64, 51, 6, 90, 6 
              // ],
              
              data: data?.monthlyCustomerCounts?.map(month => month.oldCustomerCount || 0),
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
              data: data?.monthlyCustomerCounts?.map(month => month.newCustomerCount || 0),
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
      /> */}

      <CChartBar
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: fullMonths,
          datasets: [
            {
              label: 'Customers',
              // backgroundColor: 'rgba(54, 162, 235, 0.8)',
              data: getCustomerData('oldCustomerCount'),
              // fill: true,
              // borderWidth: 1,
              // barThickness: 10,
            },
            // {
            //   label: 'New Customers',
            //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
            //   data: getCustomerData('newCustomerCount'),
            //   borderWidth: 1,
            //   barThickness: 10,
            // },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { color: getStyle('--cui-body-color') },
            },
          },
          scales: {
            x: {
              grid: { color: getStyle('--cui-border-color-translucent'), drawOnChartArea: false },
              ticks: { color: getStyle('--cui-body-color') },
              categoryPercentage: 0.7,
            },
            y: {
              beginAtZero: true,
              grid: { color: getStyle('--cui-border-color-translucent') },
              max: 10,
              ticks: { color: getStyle('--cui-body-color'), stepSize: 2 },
            },
          },
          elements: { bar: { borderRadius: 4 } },
        }}
      />
    </>
  )
}

export default MainChart
