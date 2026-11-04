const V = "etc-v5";
const FILES = [
  "./",
  "index.html",
  "css/style.css",
  "js/main.js",
  "manifest.json",
  "images/club-app-icon.png",
  "images/club-logo.png",
  "images/team-events-head-menna-alsammak.png",
  "images/team-events-head-yamen-almasri.png",
  "images/team-female-branch-head-maram-alastal.png",
  "images/team-male-branch-head-ibrahim-salha.png",
  "images/team-media-head-shatha-abu-jazar.png",
  "images/team-membership-head-fatima-badawi.jpeg",
  "images/team-membership-head-mohammad-khreis.png",
  "images/team-president-mohammad-alzamili.png",
  "images/team-relations-head-alaa-alramlawi.png",
  "images/team-secretary-farah-tabal.png",
  "images/team-tech-training-head-ahmad-alfarani.png",
  "images/team-tech-training-head-shahd-salim.png",
  "images/team-vice-president-raghad-alzamili.png",
  "images/tile-certificates.png",
  "images/tile-community-leadership.png",
  "images/tile-events-competitions.png",
  "images/tile-partnerships.png",
  "images/tile-training-employment.png",
  "images/tile-workshops-courses.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(V)
      .then((c) => c.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((k) =>
        Promise.all(k.filter((x) => x !== V).map((x) => caches.delete(x))),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(V).then((c) => c.put(e.request, copy));
            return res;
          })
          .catch(() => caches.match("index.html")),
    ),
  );
});
