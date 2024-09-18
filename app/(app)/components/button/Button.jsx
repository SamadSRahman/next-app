import React from 'react'
import './button.css'
export default function Button({text, className, icon, setSelectedTab, onButtonClick, bcg, disabled}) {

  function handleClick(){
     if(setSelectedTab){
      setSelectedTab(text)
     }
  }
  if(className === "paginationRightBtn"||className === "paginationRightDisabledBtn"){
  return (
  
    <button
    disabled={disabled}
    style={{backgroundColor:bcg?bcg:""}}
  onClick={onButtonClick?()=>onButtonClick():handleClick}
    className={className}>
      
        {text}
        {icon && <img src={icon} alt='icon'/>}
    </button>
  )
}
else{
  return(
    <button
    disabled={disabled}
    style={{backgroundColor:bcg?bcg:""}}
  onClick={onButtonClick?()=>onButtonClick():handleClick}
    className={className}>
      {icon && <img src={icon} alt='icon'/>}
        {text}
    </button>
  )
}
}
