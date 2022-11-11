import './LandingPage.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function LandingPage(){
    return(
        <>
        <body className='body'>
            <div className='Header'></div>
            <main className='main'></main>
            <div className='container'></div>
            <div className='info'></div>
            <div className='testimonials'></div>
            <footer className='footer'></footer>
        </body>
        </>
    )
}

export default LandingPage

