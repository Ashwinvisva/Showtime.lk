import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

const ReviewStatistics = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    async function fetchReviewData() {
      try {
        const response = await axios.get("http://localhost:8081/api/reviews");
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    }
    fetchReviewData();
  }, []);

  // Calculate statistics
  const calculateStatistics = () => {
    let totalRating = 0;
    let numReviews = reviewData.length;
    let ratingCounts = {};

    // Calculate total rating and rating counts
    reviewData.forEach((review) => {
      totalRating += review.rating;
      ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
    });

    // Prepare data for PieChart
    let eventsData = [];
    for (let rating in ratingCounts) {
      eventsData.push({
        id: rating,
        value: ratingCounts[rating],
        label: `Rating ${rating}`,
      });
    }

    return {
      averageRating: totalRating / numReviews,
      eventsData,
    };
  };

  const { averageRating, eventsData } = calculateStatistics();

  return (
    <div>
      <p>Average Rating: {averageRating}</p>
      <PieChart series={[{ data: eventsData }]} width={400} height={200} />
    </div>
  );
};

export default ReviewStatistics;
