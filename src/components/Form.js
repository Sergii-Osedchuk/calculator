import { useState } from 'react';

const Form = () => {
  let [ currentSavings, setCurrentSavings ] = useState();
  const [ yearlyContribution, setYearlyContribution ] = useState();
  const [ expectedReturn, setExpectedReturn ] = useState();
  const [ duration, setDuration ] = useState();

  const [ yearly, setYearly ] = useState([]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const inputChangeHandler = (input, value) => {
      input === 'savings' && setCurrentSavings(+value);
      input === 'return' && setExpectedReturn(+value);
      input === 'contribution' && setYearlyContribution(+value);
      input === 'duration' && setDuration(+value);
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
      const yearlyInterest = currentSavings * expectedReturn / 100;
      currentSavings += yearlyInterest + yearlyContribution;
      totalCapital = currentSavings + yearlyContribution * i;

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
            <input 
              type="number" 
              id="current-savings" 
              onChange={(event) => 
                inputChangeHandler('savings', event.target.value, )}
              value = {currentSavings}
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input 
              type="number" 
              id="yearly-contribution" 
              onChange={(event) => 
                inputChangeHandler('contribution', event.target.value, )}
              value = {yearlyContribution}
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input 
              type="number" 
              id="expected-return" 
              onChange={(event) => 
              inputChangeHandler('return', event.target.value, )}
              value = {expectedReturn}
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input 
              type="number" 
              id="duration" 
              onChange={(event) => 
              inputChangeHandler('duration', event.target.value, )}
              value = {duration}
            />
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
            <td>{formatter.format(dataItem.savingsEndOfYear)}</td>
            <td>{formatter.format(dataItem.yearlyInterest)}</td>
            <td>{formatter.format(dataItem.savingsEndOfYear - currentSavings - dataItem.yearlyContribution * dataItem.year)}</td>
            <td>{formatter.format(dataItem.totalCapital)}</td>
          </tr>)}
        </tbody>
      </table>) : <p style={{color: 'yellow', textAlign: 'center', fontSize: '12px'}}>There is no data vailable</p>}
    </>
  )
}

export default Form;