import React from 'react';
import logo from './palace-corona.png';
import './index.css';

/**
* @author Equipo Desarrollo Clever MID <clevermerida@palace-resorts.local>
* Componente Loading migrado de Complib
*/
const Loading = ({ show = false }) => {
    return <div className={show ? 'inside' : 'outside'}>
        <div className='loader-wrapper'>
            <div className='loader-section-0'>
                <div className='loader-0-1'/>
                <img className='loader-img' src={logo}/>
            </div>
            <div className='loader-section-1'>
                <div className='section-1'>
                    <div className='loader-1-1'/>
                </div>
                <div className='loader-1-4'/>
                <div className='loader-1-5'/>
            </div>
            <div className='loader-section-2'>
                <div className='loader-2-1'/>
                <div className='loader-2-2'/>
            </div>
        </div>
    </div>;
};

export default Loading;
