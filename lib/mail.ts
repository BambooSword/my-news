import {env} from 'cloudflare:workers';
export function mailConfig(){const e=env as unknown as Record<string,string>;return {key:e.RESEND_API_KEY,from:e.NEWSLETTER_FROM};}
export async function sendMail(to:string,subject:string,html:string){const {key,from}=mailConfig();if(!key||!from)throw new Error('邮件服务待配置');const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject,html})});if(!r.ok)throw new Error('邮件发送失败，请稍后重试');}
export const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
