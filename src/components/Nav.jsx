import axios from 'axios';
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const Nav = ({dados,token}) => {
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
    const navigate = useNavigate()
    const [cliente,setCliente]= useState()


    useEffect(()=>{
      if (dados!=undefined && token != undefined) {
        console.log(dados.cpf+"/n"+token.acess);
        axios
        .get(`${import.meta.env.VITE_SERVIDOR}fastbank/clientes/?cpf=${dados.cpf}`, { headers: { Authorization: `JWT ${token.acess}`}})
            .then((res) => {
                console.log(res.data[0])
                if (res.status == 200) {
                    setCliente(res.data[0])
                } 
            }).catch((erro)=> {
                console.log(erro)
                // if(res.response.status == 401){
                //     refreshToken(Token.refresh)
                // }
            })
      }

    },[token])

    const logout = () => {
      localStorage.clear()
      navigate('/')
      window.location.reload(true);
   }


    return (
        <div className='w-full bg-[#1A1B1A] h-[80px] flex justify-between items-center'>
          <div className='w-1/3 h-[80px] flex items-center p-3'>
            <img src="src/assets/bugs.png" alt="" className='h-14'/>
            <h1 className='text-white text-4xl font-semibold font-oswald'>B&</h1>
            <h1 className='text-white text-4xl font-light font-oswald'>Bank</h1>
        </div>
          <section className="MOBILE-MENU flex lg:hidden ">
            <div
              className="HAMBURGER-ICON space-y-1 p-4"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              {
                !isNavOpen?
                <>
                <span className="block h-0.5 w-8  bg-[#27C863]"></span>
                <span className="block h-0.5 w-8  bg-[#27C863]"></span>
                <span className="block h-0.5 w-8  bg-[#27C863]"></span>
                </>
                :
                null 
                // <>
                // <div className="flex space-x-2">
                // <span className="block h-8 w-0.5  bg-white"></span>
                // <span className="block h-8 w-0.5  bg-white"></span>
                // <span className="block h-8 w-0.5  bg-white"></span>
                // </div>
                // </>
              }
              
            </div>
  
            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} 
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className='flex-col items-start '>
              <div className='flex items-center p-3 h-1/2'>
                <img src="src/assets/bugs.png" alt="" className='h-14 mr-2'/>
                <h1 className='text-white text-4xl font-semibold font-oswald'>B&</h1>
                <h1 className='text-white text-4xl font-light font-oswald'>Bank</h1>
              </div>
              {
                !cliente?
                <>
                <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[150px]">
                <li><Link activeClass="active" to="SobreNos" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]' onClick={() => setIsNavOpen(false)}>Sobre Nós</Link></li>
                <li><Link activeClass="active" to="SobreNos" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]' onClick={() => setIsNavOpen(false)}>Para você</Link></li>
                <li><Link activeClass="active" to="SobreNos" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]' onClick={() => setIsNavOpen(false)}>Cartão</Link></li>
                </ul>
                <div className="flex flex-col h-48 justify-evenly p-4">
                <button className='bg-[#27C863] text-white font-oswald text-xl p-2 rounded-2xl hover:text-black' onClick={()=> navigate('/login')}>Acessar sua conta</button>
                <button className='bg-[#27C863] text-white font-oswald text-xl p-2 px-3 rounded-2xl hover:text-black' onClick={()=> navigate('/cadastro')}>Cadastrar</button>
                </div>
                </>
                :
                <>
                <button className='bg-[#27C863] text-white font-oswald text-xl p-2 rounded-2xl hover:text-black' onClick={()=>logout()}>Logout</button>
                </>

              }
           
              </div>
            </div>
          </section>

          {!cliente?
            <>
            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex lg:w-full lg:justify-center">
            <li><Link activeClass="active" to="SobreNos" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]' onClick={() => setIsNavOpen(false)}>Sobre Nós</Link></li>
            <li><Link activeClass="active" to="Paravoce" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]' onClick={() => setIsNavOpen(false)}>Para você</Link></li>
            <li><Link activeClass="active" to="Cartao" spy={true} smooth={true} duration={500} className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]'onClick={() => setIsNavOpen(false)}>Cartão</Link></li>
            </ul>
            <div className=' hidden lg:flex lg:w-1/3 lg:h-[80px] lg:items-center lg:justify-evenly lg:p-3'>
            <button className='bg-[#27C863] text-white font-oswald text-xl p-2 rounded-2xl hover:text-black' onClick={()=> navigate('/login')}>Acessar sua conta</button>
            <button className='bg-[#27C863] text-white font-oswald text-xl p-2 px-3 rounded-2xl hover:text-black' onClick={()=> navigate('/cadastro')}>Cadastrar</button>
            </div>
            </>
          :
          <>
           <div className=' hidden lg:flex lg:w-1/3 lg:h-[80px] lg:items-center lg:justify-evenly lg:p-3'>
              <h1 className='text-white text-xl font-light font-oswald'> Olá, seja Bem-vindo a sua conta virtual {cliente.nome}</h1>
               <button className='bg-[#27C863] text-white font-oswald text-xl p-2 rounded-2xl hover:text-black' onClick={()=> logout()}>Logout</button>
          
           </div>
          </>
          }
  
       
        <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 75%;
          height: 100vh;
          top: 0;
          left: 0;
          background: #1A1B1A;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      </div>
    );
  }
    // return ( 
    // <>
    //     <div className='w-full bg-[#1A1B1A] h-[80px] flex'>
    //         <div className='w-1/3 h-[80px] flex items-center p-3'>
    //             <img src="src/assets/bugin.png" alt="" className='h-14 mr-4'/>
    //             <h1 className='text-white text-4xl font-semibold font-oswald'>B&</h1>
    //             <h1 className='text-white text-4xl font-light font-oswald'>Bank</h1>
    //         </div>
    //         <div className='flex w-1/3 h-[80px] items-center'>
    //             <ul className='flex w-full justify-evenly '>
    //                 <li><Link className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]'>Sobre Nós</Link></li>
    //                 <li><Link className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]'>Para você</Link></li>
    //                 <li><Link className='text-white font-medium font-oswald border-b-2 border-[#27C863] text-[20px]'>Ajuda</Link></li>
    //             </ul>
    //         </div>
    //         <div className='flex w-1/3 h-[80px] items-center justify-end p-3 '>
    //             <button className='bg-[#27C863] text-white font-oswald text-xl p-2 rounded-2xl hover:text-black'>Acessar sua conta</button>
    //         </div>
    //     </div>
    // </> 
    // );
// }
 
export default Nav;