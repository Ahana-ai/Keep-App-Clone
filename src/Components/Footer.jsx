import React from 'react'
import '../index.css';

export default function Footer() {
    const year = new Date().getFullYear();

  return (
    <>
    <footer>
      <p> copyright © {year} </p>
    </footer>
    </>
  )
}
