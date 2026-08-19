const CACHE = 'k3-v6';

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE).then(cache =>
			cache.addAll(['./', './index.html', './manifest.json'])
		)
	);
	self.skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys =>
			Promise.all(
				keys
					.filter(key => key !== CACHE)
					.map(key => caches.delete(key))
			)
		)
	);
	self.clients.claim();
});

self.addEventListener('fetch', event => {
	const request = event.request;
	const isHtmlRequest = request.url.endsWith('/index.html') ||
		request.mode === 'navigate' ||
		request.headers.get('accept')?.includes('text/html');

	if (isHtmlRequest) {
		event.respondWith(
			fetch(request).then(response => {
				const copy = response.clone();
				caches.open(CACHE).then(cache => cache.put(request, copy));
				return response;
			}).catch(() => caches.match(request))
		);
		return;
	}

	event.respondWith(
		caches.match(request).then(response => response || fetch(request))
	);
});