import React, {useState, useEffect} from 'react';
import './App.css';

const initialLocationState = {
  latitude : null,
  longitude : null,
  speed : null
}

const App = () => {

  
  const [counter, setCounter] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: null,y: null})
  const [status, setStatus] = useState(navigator.onLine)
  const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState)
  let mounted = true;

  const incrementCounter = () =>{
    setCounter(prevCounter => prevCounter +1)
  }

  const toggelLight = () => {
    setIsOn(prevIsOn => !prevIsOn)
  }

  useEffect(() => {
    document.title = `I have been clicked  ${counter}  times`
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeolocation)
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchId)
      mounted = false;
    }
  },[counter])

  const handleMouseMove = event =>{
    setMousePosition({
        x: event.pageX,
        y: event.pageY
    })
  }
  
  const handleOnline = () => {
    setStatus(true)
  }
  const handleOffline = () => {
    setStatus(false)
  }

  const handleGeolocation = event => {
    if(mounted){
      setLocation({
        latitude : event.coords.latitude,
        longitude : event.coords.longitude,
        speed : event.coords.speed
      })
    }
  }
  return (
      <>
      
      
        <h2>Counter</h2>
            <button onClick={incrementCounter}>I am clicked {counter} times</button>
        <h2>Toggel Light</h2>
            <div  onClick={toggelLight}
                  style ={{
                    width:'50px',
                    height:'50px',
                    background: isOn ? 'yellow':'grey'
                  }}
            ></div>

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}

      <br/>
      <h2>Network Status</h2>
      <p>You are <strong>{status ? "online" : "offline"}</strong></p>

      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Speed is {speed}</p>
      </>
  )
}

export default App;
