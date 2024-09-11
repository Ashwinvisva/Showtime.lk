import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  width: 300,
  height: 300,
};

const VenueSeatsStatistics = () => {
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8081/api/venues')
      .then(response => response.json())
      .then(data => {
        // Calculate number of seats for each venue
        const venueSeatsData = data.map(venue => ({
          venue: venue.name,
          seats: venue.maxRow * venue.maxColumn
        }));
        setVenueData(venueSeatsData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <BarChart
        dataset={venueData}
        xAxis={[{ scaleType: 'band', dataKey: 'venue' }]}
        series={[{ dataKey: 'seats', label: 'Number of Seats' }]}
        layout="vertical"
        {...chartSetting}
      />
    </div>
  );
}

export default VenueSeatsStatistics;
