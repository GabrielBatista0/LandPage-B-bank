import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const Footer = () => {
    return ( 
        <div className='flex flex-col lg:flex-row h-fit lg:h-60 bg-[#1A1B1A] w-full p-5 justify-center lg:p-10'>
            <div className='flex flex-col items-center lg:w-1/4'>
                <p className='text-white font-semibold lg:text-3xl'>Veja mais:</p>
                <ul className='mb-10 flex items-center flex-col '>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Nossa história</Link></li>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Como fazer parte do time</Link></li>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Como trabalhamos</Link></li>
                </ul>
            </div>
            <div className='flex flex-col items-center lg:w-1/4'>
                <p className='text-white font-semibold p-1 lg:text-3xl'>Ouvidoria:</p>
                <ul className='mb-10 flex items-center flex-col'>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>0800 0902 1232</Link></li>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>B&bank@bbank.com</Link></li>
                    <p className='text-white font-light p-1 text-[12px] lg:text-lg'>(atendimento até  das 10:00 as 00:00hr)</p>
                </ul>
            </div>
            <div className='flex flex-col items-center lg:w-1/4'>
                <p className='text-white p-1 font-semibold lg:text-3xl'>Politica:</p>
                <ul className='mb-10 flex items-center flex-col'>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Transparencia</Link></li>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Privacidade</Link></li>
                    <li className='text-white font-light  text-[12px] lg:text-lg'><Link>Segurança</Link></li>
                </ul>
            </div>
            <div className='flex flex-col items-center lg:w-1/4'>
                <p className='text-white p-2 font-semibold lg:text-3xl'>Baixe o App:</p>
                <Link><img src="src/assets/lojas.png" alt="" srcset="" className=' w-24 lg:w-44'/></Link>
            </div>

        </div>
        
     );
}
 
export default Footer;