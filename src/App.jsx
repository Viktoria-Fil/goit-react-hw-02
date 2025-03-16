import { useEffect, useState } from "react";
import "./App.css";

import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

export default function App () {
  const[feedback, setFeedback] = useState({
    good:0,
    neutral:0,
    bad:0
  });

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);


  const updateFeedback = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;
  return (
    <div>
      <Description />

      <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback}/>
      {totalFeedback > 0 ? (
         <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/>
      ) : (<Notification/>
      )}

    </div>
  );
};
