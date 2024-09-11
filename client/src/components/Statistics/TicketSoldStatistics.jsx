import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  width: 500,
  height: 400,
};

const TicketsSoldStatistics = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    // Fetch event data
    fetch("http://localhost:8081/api/events")
      .then((response) => response.json())
      .then((eventData) => {
        // Fetch ticket data
        fetch("http://localhost:8081/api/tickets")
          .then((response) => response.json())
          .then((ticketData) => {
            // Count number of tickets sold for each event
            const eventMap = new Map();
            ticketData.forEach((ticket) => {
              const eventId = ticket.event;
              if (eventMap.has(eventId)) {
                const count = eventMap.get(eventId);
                eventMap.set(eventId, count + 1);
              } else {
                eventMap.set(eventId, 1);
              }
            });
            // Map event IDs to event names
            const eventDataWithNames = eventData.map((event) => ({
              id: event._id,
              name: event.name,
            }));
            // Prepare data for the BarChart
            const dataForChart = eventDataWithNames.map((event) => ({
              event: event.name,
              ticketsSold: eventMap.get(event.id) || 0,
            }));
            setEventData(dataForChart);
          })
          .catch((error) =>
            console.error("Error fetching ticket data:", error)
          );
      })
      .catch((error) => console.error("Error fetching event data:", error));
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <BarChart
        dataset={eventData}
        yAxis={[
          {
            scaleType: "band",
            dataKey: "event",
          },
        ]}
        series={[{ dataKey: "ticketsSold", label: "Number of Tickets Sold" }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default TicketsSoldStatistics;
