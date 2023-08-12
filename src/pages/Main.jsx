import React, { useEffect, useState } from 'react';
import NomeBank from '../components/Nomebank';
import Footer from '../components/Footer';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import axios from 'axios';

const Main = () => {
const [cliente,setCliente] = useState()
const [token, setToken] = useState()
const[verSaldo,setVerSaldo] = useState()
const [conta,setConta] = useState("")

useEffect(()=>{
    setToken(JSON.parse(localStorage.getItem("Token")))
},[])

useEffect(()=>{
    if (token!=undefined) {
        axios
        .get(`${import.meta.env.VITE_SERVIDOR}auth/users/me/`, {
            headers: { Authorization: `JWT ${token.acess}`},
            
        })
        .then((res) => {
            console.log(res.status)
            if (res.status == 200) {
                buscaConta(res.data.id)
                
            }           
        }).catch((erro)=>{
            console.log(erro.response.status)
            if(erro.response.status ==401){
                // refreshToken(token.refresh)
            } 
        }
        )
    }
    
},[token])

const mostrarSaldo = () => {
    if(verSaldo){
        setVerSaldo(false);
    }
    else{
        setVerSaldo(true);
    }
}

const buscaConta = (id)=>{
    axios
        .get(`${import.meta.env.VITE_SERVIDOR}fastbank/conta/${id}`, { headers: { Authorization: `JWT ${token.acess}`}})
            .then((res) => {
                console.log(res.data)
                console.log(res.status)
                if (res.status == 200) {
                    setConta(res.data)
                } 
            }).catch((erro)=>{
                 console.log(erro)
                if(res.response.status ==401){
                    // refreshToken(token.refresh)
                }
                })
}

    return ( 
        <>
        <div className="bg-black w-full h-screen">
        <div className="lg:h-[250px] bg-[url('src/assets/cripto.png')] bg-center h-[130px]">
                <div className='absolute flex flex-col sm:items-start sm:justify-center w-full p-2 lg:h-[230px] md:object-none'>
                    <p className='w-1/3 text-white font-oswald sm:text-[40px] font-light text-left sm:px-10 text-2xl sm:leading-10'> Saldo:</p> 
                     
                     <div className='flex w-1/3 items-center'>
                    {verSaldo?<p className='w-1/3 text-white font-oswald sm:text-[40px] font-medium text-left sm:px-10 text-2xl sm:leading-10 sm:mt-10'> R$ {conta.saldo}</p> :<p className="w-1/3 text-white font-oswald sm:text-[40px] font-medium text-left sm:px-10 text-2xl sm:leading-10 sm:mt-10 ">R$ -----</p>}
                    <button onClick={mostrarSaldo}>
                    {verSaldo?<img src='src/assets/eye.png' className='w-14 sm:mt-10'/> : <img src='src/assets/eye-slash.png' className='w-14 sm:mt-10'/>}
                    </button>
                     </div>
                </div>
        </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Main;