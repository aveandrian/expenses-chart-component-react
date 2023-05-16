import { useEffect, useState } from 'react'
import balanceData from './data.json'
import './App.css'

function Histogram(props){
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  const isToday = props.day == props.today
  const styles = {
    height: `${props.amount / props.max * 150}px`,
    backgroundColor: props.day == props.today ? 
      isHover ? "hsla(186, 34%, 60%, 0.6)" : "hsl(186, 34%, 60%)"
      : isHover ? "hsla(10, 79%, 65%, 0.6)" : "hsl(10, 79%, 65%)"
  }
  return (
    <div className='element'>
      <div className='total'>${props.amount}</div>
      <div 
      className={`column ${isToday ? "today" : ""}`} 
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >

      </div>
      <p className='day'>{props.day}</p>
    </div>
  )
}

function App() {
  const [data, setData] = useState(balanceData)
  const [maxAmount, setMaxAmount] = useState(0)
  const weekday = ["sun","mon","tue","wed","thu","fri","sat"]
  const d = new Date();
  let day = weekday[d.getDay()];

  useEffect(()=>{
    let max = 0;
    data.forEach(el => {
      if(el["amount"] > max) 
        max = el["amount"]
      }
    )
    setMaxAmount(max)
  }, [])

  return (
    <>
      <main>
        <section className='header-section'>
          <div className='header-text'>
            <p>My balance</p>
            <h1>$921.48</h1>
          </div>
          <img src='/images/logo.svg' className='logo' alt='Logo'></img>
        </section>
        <section className='main-section'>
          <h1>Spending - Last 7 days</h1>

          <div className='histogram'>
            {data.map(el => <Histogram key={el.day} today={day} {...el} max={maxAmount}/>)}       
          </div>

          <div className='divider'></div>
          <div className='bottom-section'>
            <div>
              <p>Total this month</p>
              <h1 className='month-total'>$478.33</h1>
            </div>
            
            <div className='difference'>
              <h4>+2.4%</h4>
              <p>from last month</p>
            </div>
          </div>
          
        </section>
      </main>
      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </footer>
    </>
  )
}

export default App
