'use client';
import {useState} from 'react';
export default function Page(){const [msg,setMsg]=useState('取消后将不再收到每日简报。');return <main className="status-page"><h1>取消订阅</h1><p>{msg}</p><button onClick={async()=>{const token=new URLSearchParams(location.search).get('token');const r=await fetch('/api/unsubscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});setMsg(r.ok?'已取消订阅。':'链接无效或已退订。');}}>确认退订</button><p><a href="/">返回首页 →</a></p></main>;}
