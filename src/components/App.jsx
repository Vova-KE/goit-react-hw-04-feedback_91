import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';
import style from './style.module.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };

  const handleClick = option => {
    if (option === 'good') {
      setGood(prevGood => prevGood + 1);
    }
    if (option === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    }
    if (option === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () =>
    (good / countTotalFeedback()) * 100;

  const roundPercentage = () => countPositiveFeedbackPercentage().toFixed(0);

  const getCountTotalFeedback = countTotalFeedback();
  const getRoundPercentage = roundPercentage();

  return (
    <div className={style.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(options)}
          onLeaveFeedback={handleClick}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {getCountTotalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={getCountTotalFeedback}
            positivePercentage={getRoundPercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
