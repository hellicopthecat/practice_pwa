//캐시 제목
const sCacheName = "hello-pwa";
//캐시할 파일 지정 - 오프라인이 되어도 보여줄 수 있게 해주는 것이 캐시파일이다.
const aFilesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/icons/android-chrome-192x192.png",
];
// 서비스워커 실행 & 캐시파일 저장
self.addEventListener("install", (event) => {
  console.log("설치완료");
  event.waitUntil(
    caches.open(sCacheName).then((pCache) => {
      console.log("캐시에 파일 저장 완료");
      return pCache.addAll(aFilesToCache);
    })
  );
});
// 고유번호 할당받은 서비스 워커 동작 시작
self.addEventListener("activate", () => {
  console.log("서비스 워커 동작 시작됨");
});
// 데이터 요청시 네트워크 또는 캐시에서 찾아 변환
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (!response) {
          console.log("네트워크로 데이터 요청!", event.request);
          return fetch(event.request);
        }
        console.log("캐시에서 데이터 요청!", event.request);
        return response;
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
