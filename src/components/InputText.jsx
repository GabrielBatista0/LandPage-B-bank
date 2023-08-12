import React, { Component } from 'react';

const InputText = ({value,textUp, disabled, onChange,type,placeholder }) => {
    return ( 
        <>
        <p className='text-[#757575] font-oswald font-thin'>{textUp}</p>
        <input type={type} className='bg-transparent border-b-2 border-b-[#0ACF53]  w-72 h-9 p-2 py-1 font-oswald font-thin text-white mb-6 outline-none' disabled={disabled} onChange={onChange} placeholder={placeholder} value={value}/>
        </>
     );
}
 
export default InputText;
