import { useState } from 'react';

const Form = () => {
  let [ currentSavings, setCurrentSavings ] = useState('');
  const [ yearlyContribution, setYearlyContribution ] = useState('');
  const [ expectedReturn, setExpectedReturn ] = useState('');
  const [ duration, setDuration ] = useState('');
  const [ yearly, setYearly ] = useState([]);

  const inputSavingHandler = (event) => {
    setCurrentSavings(+event.target.value);
  }

  const inputContributionHandler = (event) => {
    setYearlyContribution(+event.target.value);
  }

  const expectedReturnHandler = (event) => {
    setExpectedReturn(+event.target.value/100);
  }

  const inputDurationHandler = (event) => {
    setDuration(+event.target.value);
  }

  const resetHandler = () => {
    setYearly([]);
    setCurrentSavings('');
    setDuration('');
    setExpectedReturn('');
    setYearlyContribution('');
  }

  const calculateHandler = (e) => {
    e.preventDefault();

    const yearlyData = []; 
    let totalCapital = 0;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = Math.round(currentSavings * expectedReturn);
      currentSavings += yearlyInterest + yearlyContribution;
      totalCapital += currentSavings;

      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
        totalCapital: totalCapital
      });
    }
    setYearly(yearlyData);
    
  };

  return (
    <>
    <form className="form" onSubmit={calculateHandler}>
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input type="number" id="current-savings" onChange={inputSavingHandler}/>
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input type="number" id="yearly-contribution" onChange={inputContributionHandler}/>
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expected-return" onChange={expectedReturnHandler}/>
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" onChange={inputDurationHandler}/>
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt" onClick={resetHandler}>
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
      {yearly.length > 0 ? (<table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {yearly.map(dataItem => <tr key={dataItem.year}>
            <td>{dataItem.year}</td>
            <td>{dataItem.savingsEndOfYear}</td>
            <td>{dataItem.yearlyContribution}</td>
            <td>{dataItem.yearlyInterest}</td>
            <td>{dataItem.totalCapital}</td>
          </tr>)}
        </tbody>
      </table>) : <p style={{color: 'yellow', textAlign: 'center'}}>There is no data vailable</p>}
    </>
  )
}

export default Form;