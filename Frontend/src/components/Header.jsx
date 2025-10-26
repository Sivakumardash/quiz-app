import { useState } from "react";
import React from "react";
import "./Header.css"; // optional for styling

const Header = () => {
    const[isintro,setisintro]=useState(false);
    function intro()
    {
        if(isintro==false)
        {
            setisintro(true)
        }
        else{
            setisintro(false)
        }
        
    }
    if(!isintro)
    {
        return (
    <header className="header">
      <h1>quiz exam</h1>
      <nav>
        <button className="ab" onClick={intro}>Instructions</button>
      </nav>
    </header>
  );
    }

     if(isintro)
    {
        return (
            <div className="a">
                <h2>Instructions:</h2>
          <ul>
            <li>The quiz starts with a 30-second timer.</li>
            <li>For each correct answer, 30 seconds will be added.</li>
            <li>If the timer ends or all questions are answered, the quiz ends.</li>
          </ul>
           <button className="ab" onClick={intro}>back</button>

            </div>
            )
    }

    
  
};

export default Header;
