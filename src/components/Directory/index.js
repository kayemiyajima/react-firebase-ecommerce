import React from 'react';
import './styles.scss';

const Directory = () => {
    return(
        <div className='directory'>
            <div className='wrap'>
                <div 
                    className='item'
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/originals/fd/3c/51/fd3c51d353dde26915072b090d6b0311.jpg')"
                    }}>
                        <a href='#'>Shop Womens</a>
                </div>
                <div 
                    className='item'
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/originals/be/27/b4/be27b47adadeee7faf07eda70dabd385.jpg')"
                    }}>
                        <a href='#'>Shop Mens</a>
                </div>
            </div>
        </div>
    );
};

export default Directory;