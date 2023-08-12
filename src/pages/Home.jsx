import React from 'react';
import NomeBank from '../components/Nomebank';
import Footer from '../components/Footer';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    return ( 
        <>
        <div className="bg-black w-full h-full">
            <div className="lg:h-[650px] bg-[url('src/assets/cripto.png')] bg-cover h-[130px]">
                <div className='absolute flex flex-col items-center justify-center w-full p-2 lg:h-[630px] md: object-none'>
                    <div className='flex'>
                        <h1 className='text-white sm:text-[60px] font-semibold font-oswald'>B&</h1>
                        <h1 className='text-white sm:text-[60px] font-light font-oswald'>Bank</h1>
                    </div>
                    <p className='w-1/3 text-white font-oswald sm:text-[40px] font-light text-center text-xs sm:leading-10'>Ser B.Bank é entender que os pequenos investimentos valem a pena</p>
                </div>
            </div>
            <div>
                <Element name='SobreNos'>
                <div className='flex flex-col w-full justify-end p-3 h-1/3'>
                    <h1 className='font-oswald text-white mb-4 sm:text-4xl sm:font-bold sm:p-4'>Um banco Completo e Seguro</h1>
                    <div className="flex justify-around items-center">
                    <div>
                    <p className='font-oswald text-sm w-2/3 text-center text-[#27C863] sm:text-4xl sm:text-center sm:w-[38rem] sm:p-10'>A B&Bank cuida dos seus clientes como se fosse família!</p>
                    <img src="src/assets/bugs.png" alt="" className='w-10 lg:w-40 sm:w-28'/>
                    </div>
                    <img src='src/assets/seguranca.png' className='w-44 lg:w-1/2 sm:w-96 sm:mb-10'></img>
                    </div>
                </div>
                </Element>
                <div className='w-3/4 flex p-4 lg:w-1/3 lg:h-52 sm:h-1/3 mb-3'>
                    <p className='text-white font-oswald font-extralight lg:text-4xl sm:text-2xl sm:text-center'>A B&Bank possui todas as funcionalidades dos bancos tradicionais, porém com o nosso <span className='text-[#27C863] text-right'>+PLUS</span></p>
                </div>
                <div className='flex bg-gradient-to-r from-[#27C863] via-[#07ca4f] to-black to-90% h-1/4 w-full'>
                    <img src='src/assets/propaganda.png' className='h-[130px] w-fit lg:h-[520px] lg:px-4'></img>
                    <div className='flex flex-col justify-center w-3/4 items-center'>
                        <div className='flex flex-col justify-center items-center h-2/3'>
                            <p className='text-white w-2/3 font-oswald lg:text-4xl sm:text-2xl font-light text-center text-xs lg:h-36 pb-2'> Baixe o aplicativo totalmente de graça na sua loja de aplicativos e seja um cliente B&Bank</p>
                            <p className='text-white font-oswald lg:text-4xl sm:text-2xl font-light text-center text-[9px] pb-2 '> Disponivel nas lojas:</p>
                        </div>
                        <div className='flex flex-row justify-around w-24 lg:w-1/4 items-center'>
                            <img src='src/assets/playstore.png' className='w-[13px] h-fit lg:w-[70px]'></img>
                            <img src='src/assets/appstore.png' className='w-[13px] h-fit lg:w-[70px]'></img>
                        </div>
                    </div>
                </div>
                <Element name="Paravoce">

                <div className='w-full h-1/2 lg:p-6 p-3'>
                    <h1 className='font-oswald text-white sm:text-4xl sm:font-bold p-2'>Para você:</h1>
                    <div className="flex justify-around p-2 items-center">
                        <div className='w-1/2 flez flex-col justify-between h-2/5'>
                            <p className='text-white font-oswald lg:text-4xl sm:text-2xl font-light text-center text-[10px] pb-3 lg:mb-10'>A B&Bank pensa nos seus clienres como parte da família!</p>
                            <p className='text-white font-oswald lg:text-4xl sm:text-2xl font-light text-center text-[10px]'>Está complicado para você esse mês?<br/>
                                Nos ajudamos você com diversos meios de emprestimos, te colocamos pra CIMA!</p>
                        </div>
                        <img src="src/assets/cima.png" alt=""  className='w-36 lg:w-[700px]'/>
                    </div>
                </div>
                </Element>
                <Element name="Cartao">
                <div className='w-full lg:h-[600px] flex bg-[#1e2e1e] justify-around items-center p-4 lg:p-10'>
                    <img src="src/assets/cartaoB.png" alt=""  className='w-28 lg:w-[500px]'/>
                    <div className='w-3/5 flex flex-col justify-between items-center'>
                     <h1 className='font-oswald text-white sm:text-4xl sm:font-bold p-2 lg:mb-10'>Cartão BUG:</h1>
                            <p className='text-white  text-center font-oswald lg:text-4xl sm:text-2xl font-normal text-[10px] py-1'>O cartão BUG lhe oferece centenas de vantagens e praticidade! </p>
                            <p className='text-white font-oswald  text-center lg:text-4xl sm:text-2xl font-normal text-[10px] py-1'>Acumule pontos de uso e troque por criptomoedas!! </p>
                            <p className='text-white font-oswald text-center lg:text-4xl sm:text-2xl font-normal text-[10px] py-1'>O nosso cartão não possui anuidade!! </p>
                    </div>
                </div>
                </Element>
            </div>
        </div>
        <Footer/>
        </>
     );
}
 
export default Home;