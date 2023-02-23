import React from 'react'
import '../index.css';

export default function Footer() {
    const year = new Date().getFullYear();

  return (
    <>
    <footer className='label-text'>
      <p> copyright © {year} </p>
    </footer>
    </>
  )
}
