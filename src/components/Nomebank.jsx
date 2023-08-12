import React, { Component } from 'react';

const NomeBank = ({tamanho}) => {
    return ( <>
     <h1 className={`text-white text-[${tamanho}] font-semibold font-oswald`}>B&</h1>
                <h1 className={`text-white text-[${tamanho}] font-light font-oswald`}>Bank</h1>
    </> );
}
 
export default NomeBank;