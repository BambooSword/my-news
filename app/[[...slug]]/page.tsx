import Client from '../client';
import {getChatGPTUser} from '../chatgpt-auth';
export const dynamic = 'force-dynamic';
export default async function Page(){ const user=await getChatGPTUser();return <Client user={user?{name:user.displayName,email:user.email}:null}/>; }
