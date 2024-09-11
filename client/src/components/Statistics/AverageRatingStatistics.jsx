import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'Average Rating',
    },
  ],
  width: 400,
  height: 200,
};

const valueFormatter = (value) => `${value.toFixed(2)}`;

const AverageRatingBarChart = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8081/api/reviews')
      .then(response => response.json())
      .then(data => {
        // Calculate average rating for each event
        const eventMap = new Map();
        data.forEach(review => {
          const eventName = review.event.name; // Extract event name
          const rating = review.rating;
          if (eventMap.has(eventName)) {
            const { totalRating, count } = eventMap.get(eventName);
            eventMap.set(eventName, { totalRating: totalRating + rating, count: count + 1 });
          } else {
            eventMap.set(eventName, { totalRating: rating, count: 1 });
          }
        });
        // Calculate average rating and update state
        const eventDataWithAverage = [];
        eventMap.forEach((value, key) => {
          const averageRating = value.totalRating / value.count;
          eventDataWithAverage.push({
            event: key,
            averageRating: averageRating
          });
        });
        setEventData(eventDataWithAverage);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <BarChart
        dataset={eventData}
        yAxis={[{ scaleType: 'band', dataKey: 'event' }]}
        series={[{ dataKey: 'averageRating', label: 'Average Rating', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}

export default AverageRatingBarChart;
