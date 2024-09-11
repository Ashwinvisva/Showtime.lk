import React, { useState } from "react";
import axios from "axios";
import FormBox from "../../components/FormBox";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: JSON.parse(localStorage.getItem("user")).user._id,
    questions: [
      {
        id: 1,
        question:
          "How would you rate the overall user experience of the event management system?",
        answer: "",
      },
      {
        id: 2,
        question:
          "Were you able to easily navigate through the system to perform your desired tasks?",
        answer: "",
      },
      {
        id: 3,
        question:
          "Did the system meet your expectations in terms of functionality?",
        answer: "",
      },
      {
        id: 4,
        question:
          "Were there any features or functionalities that you found particularly useful or beneficial?",
        answer: "",
      },
      {
        id: 5,
        question:
          "Were there any aspects of the system that you found confusing or difficult to use?",
        answer: "",
      },
      {
        id: 6,
        question:
          "Did you encounter any technical issues or bugs while using the system? If so, please describe.",
        answer: "",
      },
      {
        id: 7,
        question:
          "How satisfied are you with the communication and support provided by the system's team?",
        answer: "",
      },
      {
        id: 8,
        question:
          "Did the system help streamline the event planning and management process for you and your team?",
        answer: "",
      },
      {
        id: 9,
        question:
          "How would you rate the system's performance in terms of speed and responsiveness?",
        answer: "",
      },
      {
        id: 10,
        question:
          "Do you have any suggestions or feedback for improving the event management system?",
        answer: "",
      },
    ],
    currentQuestionIndex: 0,
    inputError: false, // New state for input validation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[formData.currentQuestionIndex].answer = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
      inputError: false,
    });
  };

  const handleNextQuestion = () => {
    // Check if input is empty before moving to next question
    if (
      formData.questions[formData.currentQuestionIndex].answer.trim() === ""
    ) {
      setFormData({ ...formData, inputError: true });
      return; // Prevent moving to next question
    }
    setFormData({
      ...formData,
      currentQuestionIndex: formData.currentQuestionIndex + 1,
      inputError: false,
    });
  };

  const handlePreviousQuestion = () => {
    setFormData({
      ...formData,
      currentQuestionIndex: formData.currentQuestionIndex - 1,
      inputError: false, // Reset input error state when going back
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answers = formData.questions.map((question) => question.answer);
    const postData = {
      user: formData.user,
      questions: answers,
    };

    try {
      await axios.post("http://localhost:8081/api/contact", postData);
      alert("Your responses have been submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert(
        "An error occurred while submitting your responses. Please try again later."
      );
    }
  };

  const { questions, currentQuestionIndex, inputError } = formData;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center">
      <FormBox title={currentQuestion.question} className="max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`w-full p-[20px] border-2 rounded ${
              inputError ? "border-red-500" : ""
            }`} // Apply red border if input is empty
            name={`question${currentQuestion.id}`}
            value={currentQuestion.answer}
            onChange={handleChange}
            required
          />
          {inputError && (
            <p className="text-red-500 mt-1">This field cannot be empty</p>
          )}
          <div className="flex justify-between pt-5">
            <div>
              {currentQuestionIndex > 0 && (
                <button
                  className="bg-black text-white rounded py-2 px-4 hover:bg-slate-800"
                  type="button"
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </button>
              )}
            </div>
            <div>
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className="bg-black text-white rounded py-2 px-4 hover:bg-slate-800"
                  type="button"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  className="bg-green-600 text-white rounded py-2 px-4 hover:bg-green-800"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </FormBox>
    </div>
  );
};

export default ContactUs;
