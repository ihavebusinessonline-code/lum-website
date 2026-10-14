'use client';
import {useEffect, useRef, useState} from 'react';
const links = [['#work','Selected work'],['#about','About'],['#services','The experience'],['#contact','Let’s connect']];
export default function Navigation(){
 const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[open]);
 return <><nav className="desktop-nav flex items-center" aria-label="Main navigation">{links.map(([href,label])=><a className={href==='#contact'?'nav-contact':''} key={href} href={href}>{label}</a>)}</nav><div className="mobile-nav"><button ref={toggle} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}> {open?'Close':'Menu'} <span aria-hidden="true">{open?'−':'＋'}</span></button>{open&&<nav id="mobile-menu" aria-label="Mobile navigation">{links.map(([href,label])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>}</div></>;
}
