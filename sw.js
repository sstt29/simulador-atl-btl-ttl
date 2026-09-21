const C='atl-btl-ttl-v8';
const A=['./','./index.html','./manifest.webmanifest','./payload0.txt','./payload1.txt','./payload2.txt','./payload3.txt','./payload4.txt'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(fetch(e.request).then(resp=>{
   const copy=resp.clone();
   caches.open(C).then(c=>c.put(e.request,copy));
   return resp;
 }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});