import React from 'react';
import ReactGA from 'react-ga';
import './app.scss';

import Lyrics   from './components/lyrics';
import NextDate from './components/next-date';
import Footer   from './components/footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextOccurrence: null
    };
  }

  calculateNextOccurrence = () => {
    let foundDate = false;
    const targetMonth = 3; // April
    const targetDate = 19; // 19th
    const targetDay = 0; // sunday
    const today = new Date();
    let targetYear = (targetMonth <= today.getMonth() && targetDate <= today.getDate()) ? today.getFullYear() : today.getFullYear() + 1;
    
    let target = new Date();
    
    while (!foundDate) {
      target.setFullYear(targetYear, targetMonth, targetDate);
      // document.write(target);
      if (target.getDay() === targetDay) {
        foundDate = true;
      }
      else {
        ++targetYear;
      }
    }

    let targetText = targetYear === today.getFullYear() ? 'this year!' : `in ${targetYear}`;

    this.setState({
      nextOccurrence: targetText
    })
  }

  componentDidMount() {
    this.calculateNextOccurrence();
    ReactGA.initialize('UA-146420413-1');
    ReactGA.pageview('/');
  }

  render() {
    return (
      <>
        <div className="app">
          { this.state.nextOccurrence && (
            <>
              <Lyrics />
              <NextDate {...this.state} />
            </>
            )
          }
        </div>
        <Footer />
      </>
    );
  }
}

export default App;