import { CMS_URL, CMS_KEY } from './cms-config'
export async function getCms<T>(key:string,fallback:T):Promise<T>{try{const r=await fetch(`${CMS_URL}/rest/v1/site_content?key=eq.${encodeURIComponent(key)}&select=value`,{headers:{apikey:CMS_KEY},cache:'no-store'});if(!r.ok)return fallback;const d=await r.json();return d?.[0]?.value??fallback}catch{return fallback}}
