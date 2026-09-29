var CACHE = 'youthdrive-v1';
var FILES = [
  'app.html',
  'manifest.json',
  'logo.jpg',
  'fleet1.jpg','fleet2.jpg','fleet3.jpg','fleet4.jpg',
  'fleet5.jpg','fleet6.jpg','fleet7.jpg','fleet8.jpg'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(FILES); })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request);
    })
  );
});