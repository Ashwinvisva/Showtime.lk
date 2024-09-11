import React from "react";
import ReviewStatistics from "../../components/Statistics/ReviewStatistics";
import AverageRatingStatistics from "../../components/Statistics/AverageRatingStatistics";
import FormBox from "../../components/FormBox";
import VenueEventStatistics from "../../components/Statistics/VenueEventStatistics";
import VenueSeatsStatistics from "../../components/Statistics/VenueSeatStatistics";
import TicketsSoldStatistics from "../../components/Statistics/TicketSoldStatistics";

const Dashboard = () => {
  return (
    <div className="w-full flex gap-3 flex-wrap pb-5">
      <FormBox title="Review Statistics" className="w-fit">
        <ReviewStatistics />
      </FormBox>
      <FormBox title="Average Ratings for Each Event" className="w-fit">
        <AverageRatingStatistics />
      </FormBox>
      <FormBox title="Number of Events by Venue" className="w-fit">
        <VenueEventStatistics />
      </FormBox>
      <FormBox title="Number of Seats in Each Venue" className="w-fit">
        <VenueSeatsStatistics />
      </FormBox>
      <FormBox title="Number of Tickets Sold for Each Event" className="w-fit">
        <TicketsSoldStatistics />
      </FormBox>
    </div>
  );
};

export default Dashboard;
