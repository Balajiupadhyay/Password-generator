import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, changeLength]= useState(8);
  const [number , includeNumber]= useState(false);
  const [specialChar, includeSpecialChar]= useState(false);
  const [password, generatePassword]= useState("");
  
  const passwordRef= useRef()

  const copyPassword= useCallback(() => {

    window.navigator.clipboard.writeText(password);
    },[password])

  const passwordGenerator= useCallback(() => 
  {
    let pass= "";
    let str= "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    
    if (number)
      str= str + "0123456789" ;
    if (specialChar)
      str= str + "~!@#$%^&*()_+=-{}[]|:;<>?" ;

    for (let i = 1; i <= length; i++) 
    {
      let passwordStr= Math.floor(Math.random()*str.length + 1);
      pass = pass + str.charAt(passwordStr);
      
    }

    generatePassword(pass)
  }, [length, specialChar, number]);

  useEffect(() => {passwordGenerator()},[length, specialChar, number, passwordGenerator]) ;
  function lengthChange(event)
  {
    changeLength(event.target.value);
  }

  function allowNumbers()
  {
    includeNumber((prev)=>!prev);
  }

  function allowSpecialChar()
  {
    includeSpecialChar((prev)=>!prev);
  }


  return (
    <>
      
      <div className='bg-black h-screen w-full flex justify-center items-center'>
       <div className='bg-gray-600 w-2/5 h-60 rounded-xl text-center pt-2'>
        <h1 className='text-white font-semibold'>Password Generator</h1>
          <div className='m-6 flex overflow-hidden rounded-xl'>
            <input 
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none w-full py-1 px-3'
            ref={passwordRef}
            readOnly
            />
            <button 
              onClick={copyPassword}
              className='outline-none bg-red-500 text-white px-3 py-0.5 shrink-0 '>
              Copy
            </button>
          </div> 
          <div className='flex gap-x-2 text-green-500 font-medium'>
            <div className='mx-6 flex gap-x-1 items-center'>
              <input 
              type="range" 
              min={8}
              max={28}
              value={length}
              onChange={lengthChange}
              className='cursor-pointer'
              />
              <label>Length: {length}</label>
            </div>
            <div className='mx-6 flex gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={includeNumber}
            
              onChange={allowNumbers}
              id='numberInput'
              />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className='mx-6 flex gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={includeSpecialChar}
              onChange={allowSpecialChar}
              id='specialCharInput'
              />
              <label htmlFor="specialCharInput">Special Character</label>
            </div>

          </div>
       </div>
      </div>
    </>
  )
}

export default App
