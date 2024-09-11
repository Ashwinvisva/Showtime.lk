import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const chartSetting = {
  width: 550,
  height: 200,
};

const VenueEventStatistics = () => {
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8081/api/events')
      .then(response => response.json())
      .then(data => {
        // Count number of events for each venue
        const venueMap = new Map();
        data.forEach(event => {
          const venueName = event.venue.name;
          if (venueMap.has(venueName)) {
            const count = venueMap.get(venueName);
            venueMap.set(venueName, count + 1);
          } else {
            venueMap.set(venueName, 1);
          }
        });
        // Prepare data for PieChart
        const venueDataArray = Array.from(venueMap).map(([venue, count]) => ({
          id: venue,
          value: count,
          label: `${venue} (${count} events)`
        }));
        setVenueData(venueDataArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <PieChart
        series={[{ data: venueData }]}
        {...chartSetting}
      />
    </div>
  );
}

export default VenueEventStatistics;
