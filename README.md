# root>_ — Linux / Kali / Purple Team

Interaktywna aplikacja do nauki komend Linux, Kali i Purple Team, w całości po polsku.
Działa lokalnie w przeglądarce, bez żadnego backendu — cały postęp zapisywany jest
w `localStorage` Twojej przeglądarki.

## Jak uruchomić lokalnie (do testów)

Aplikacja musi być serwowana przez HTTP (nie `file://`), żeby Service Worker (offline)
oraz Content-Security-Policy działały poprawnie. Najprościej:

```bash
cd root-app       # katalog z tym README
python3 -m http.server 8080
```

Potem wejdź w przeglądarce na `http://localhost:8080`.

Node.js (alternatywnie):
```bash
npx serve .
```

## Jak zainstalować jako prawdziwe PWA (na telefonie/laptopie)

Instalacja PWA (ikona na pulpicie, tryb offline, pełny ekran) wymaga hostingu po **HTTPS**
(`localhost` też działa do testów, ale nie na telefonie w sieci domowej).
Najszybsze darmowe opcje:

- **GitHub Pages** — wrzuć zawartość tego folderu do repozytorium i włącz Pages w ustawieniach.
- **Netlify / Vercel** — przeciągnij i upuść cały folder na netlify.com/drop.
- **Cloudflare Pages** — podobnie, deploy przez przeciągnięcie folderu.

Po wejściu na wdrożony adres przeglądarka (Chrome/Edge/Android) pokaże opcję
„Zainstaluj aplikację” / „Dodaj do ekranu głównego”.

## Struktura projektu

```
index.html       — punkt wejścia, meta CSP, ładowanie skryptów
manifest.json     — manifest PWA (nazwa, ikony, kolory)
sw.js             — Service Worker (cache offline, tylko zasoby własne)
css/style.css     — cały styl wizualny (motyw terminal dark, WCAG AA)
js/data.js        — treść merytoryczna: 14 kategorii, lekcje, pytania
js/app.js         — logika aplikacji (routing, quizy, zapis postępu)
icons/            — ikony PWA 192x192 i 512x512
```

## Bezpieczeństwo (co zostało zastosowane)

- Zero zależności zewnętrznych, zero wywołań sieciowych — aplikacja nie łączy się
  z żadnym serwerem ani API, więc nie ma powierzchni ataku typu „przechwycone dane”.
- Ścisła polityka `Content-Security-Policy` (tylko zasoby z własnej domeny, zero inline
  skryptów, zablokowane `object-src`, `frame-ancestors` itd.).
- Wszystkie dane pochodzące od użytkownika (odpowiedzi w quizach) są wstawiane do DOM
  przez `textContent`/escapowanie HTML — nigdy przez `innerHTML` z surowym tekstem,
  co eliminuje ryzyko DOM-based XSS.
- Service Worker cache'uje wyłącznie zasoby z tej samej domeny (`same-origin`),
  nie proxuje żadnych zewnętrznych żądań.
- Brak `eval()` na danych pochodzących od użytkownika, brak dynamicznego ładowania kodu.

## Jak zresetować postęp

W aplikacji, na dole ekranu głównego: przycisk „Wyzeruj postęp (localStorage)”.
Ręcznie: w konsoli przeglądarki `localStorage.removeItem('rootapp_progress_v1')`.

## Rozszerzanie treści

Wszystkie pytania i lekcje są w jednym pliku `js/data.js`, w prostej strukturze
JS (bez builda, bez frameworka) — możesz dopisywać kolejne kategorie/pytania
kopiując istniejący wzorzec obiektu.
