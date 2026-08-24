/* ============================================================
   LINUX / KALI / PURPLE TEAM — baza wiedzy
   Struktura każdej kategorii:
   {
     id, title, subtitle, icon,
     lesson: [ { cmd, en, pl, desc, example } ],
     quiz1: [ { q, options:[4], correct:idx, exp } ],   // ABCD
     quiz2: [ { q, answers:[akceptowalne stringi], hint, exp } ] // wpisz komendę
   }
   ============================================================ */

const CATEGORIES = [
// ============================================================
{
  id: "fundamenty",
  title: "Fundamenty Linuksa",
  subtitle: "Nawigacja, pliki i praca z tekstem",
  icon: "❯_",
  lesson: [
    { cmd:"pwd", en:"print working directory", pl:"Wypisz bieżący katalog roboczy",
      desc:"Pokazuje pełną ścieżkę katalogu, w którym aktualnie się znajdujesz.",
      example:"pwd\n# /home/kali/projekty" },
    { cmd:"ls -la", en:"list", pl:"Wylistuj zawartość katalogu (wszystkie pliki, format długi)",
      desc:"-l = format długi (uprawnienia, właściciel, rozmiar, data), -a = pokaż też pliki ukryte (zaczynające się od kropki).",
      example:"ls -la /etc\n# drwxr-xr-x  2 root root 4096 sty 12 10:00 ." },
    { cmd:"cd", en:"change directory", pl:"Zmień katalog",
      desc:"Przechodzi do wskazanego katalogu. 'cd ..' przechodzi wyżej, 'cd ~' do katalogu domowego, 'cd -' do poprzedniego.",
      example:"cd /var/log" },
    { cmd:"cat", en:"concatenate", pl:"Wyświetl (połącz) zawartość pliku",
      desc:"Wypisuje całą zawartość pliku na standardowe wyjście. Dobre dla krótkich plików.",
      example:"cat /etc/os-release" },
    { cmd:"head -n 20", en:"head", pl:"Pokaż początek pliku",
      desc:"Domyślnie 10 pierwszych linii pliku, -n pozwala ustawić dowolną liczbę.",
      example:"head -n 20 access.log" },
    { cmd:"tail -f", en:"tail (follow)", pl:"Pokaż koniec pliku i śledź nowe wpisy na żywo",
      desc:"-f 'follow' — świetne do podglądania logów w czasie rzeczywistym, np. podczas testu.",
      example:"tail -f /var/log/auth.log" },
    { cmd:"grep -i", en:"global regular expression print", pl:"Szukaj wzorca w tekście (bez rozróżniania wielkości liter)",
      desc:"Filtruje linie pasujące do wzorca. -i ignoruje wielkość liter, -r przeszukuje rekurencyjnie, -v odwraca dopasowanie.",
      example:"grep -i \"failed password\" auth.log" },
    { cmd:"find . -name", en:"find", pl:"Znajdź pliki po nazwie/typie/dacie w drzewie katalogów",
      desc:"Bardzo elastyczne wyszukiwanie, np. find / -perm -4000 znajduje pliki SUID.",
      example:"find /var/www -name \"*.php\"" },
    { cmd:"man", en:"manual", pl:"Wyświetl podręcznik/dokumentację polecenia",
      desc:"Pierwsze miejsce, gdzie sprawdzasz flagi nieznanego polecenia.",
      example:"man nmap" },
    { cmd:"| (pipe)", en:"pipe", pl:"Potok — przekaż wyjście jednej komendy jako wejście drugiej",
      desc:"Pozwala łączyć proste narzędzia w potężne łańcuchy przetwarzania danych.",
      example:"cat access.log | grep \"POST\" | wc -l" }
  ],
  quiz1: [
    { q:"Która komenda wyświetli 15 ostatnich linii pliku log.txt i będzie na bieżąco pokazywać nowe wpisy?",
      options:["head -n 15 log.txt","tail -n 15 -f log.txt","cat -n 15 log.txt","less log.txt"], correct:1,
      exp:"tail -f śledzi plik na żywo, -n 15 ustawia liczbę linii startowych." },
    { q:"Jak wyświetlić WSZYSTKIE pliki w katalogu, łącznie z ukrytymi, w formacie długim?",
      options:["ls -h","ls -la","ls -R","dir /a"], correct:1, exp:"-l = format długi, -a = pokaż ukryte pliki." },
    { q:"Które polecenie znajdzie wszystkie pliki .conf w katalogu /etc i podkatalogach?",
      options:["grep -r *.conf /etc","find /etc -name \"*.conf\"","ls /etc/*.conf -r","cat /etc --name=conf"], correct:1,
      exp:"find przeszukuje drzewo katalogów wg wzorca nazwy." },
    { q:"Do czego służy operator | (pipe) w powłoce?",
      options:["Uruchamia polecenie w tle","Przekierowuje wyjście jednej komendy jako wejście kolejnej","Kończy proces","Tworzy komentarz w skrypcie"], correct:1,
      exp:"Pipe łączy strumień wyjścia (stdout) jednej komendy ze strumieniem wejścia (stdin) kolejnej." },
    { q:"Które polecenie pokaże bieżący katalog roboczy?",
      options:["whoami","pwd","cd","path"], correct:1, exp:"pwd = print working directory." },
    { q:"Jak wyszukać w pliku linie zawierające \"error\", ignorując wielkość liter?",
      options:["grep -v error plik","grep -i error plik","find -i error plik","cat error plik"], correct:1,
      exp:"grep -i ignoruje wielkość liter podczas wyszukiwania." },
    { q:"Gdzie sprawdzisz pełną dokumentację polecenia nmap w terminalu?",
      options:["nmap --docs","help nmap","man nmap","nmap /?"], correct:2, exp:"man wyświetla podręcznik systemowy danego polecenia." }
  ],
  quiz2: [
    { q:"Wpisz komendę, która wyświetli zawartość katalogu /etc w formacie długim wraz z ukrytymi plikami.",
      answers:["ls -la /etc","ls -al /etc","ls -a -l /etc","ls -l -a /etc"], hint:"Połącz flagi -l oraz -a.",
      exp:"ls -la /etc — -l format długi, -a pliki ukryte." },
    { q:"Wpisz komendę, która wyświetli 30 pierwszych linii pliku access.log.",
      answers:["head -n 30 access.log","head -30 access.log"], hint:"Użyj head z flagą -n.",
      exp:"head -n 30 access.log wypisuje pierwsze 30 linii." },
    { q:"Wpisz komendę, która wyszuka linii zawierających \"root\" w pliku /etc/passwd.",
      answers:["grep root /etc/passwd","grep \"root\" /etc/passwd"], hint:"grep <wzorzec> <plik>",
      exp:"grep root /etc/passwd wypisze pasujące linie." },
    { q:"Wpisz komendę, która rekurencyjnie znajdzie wszystkie pliki z rozszerzeniem .log w katalogu /var.",
      answers:["find /var -name \"*.log\"","find /var -name '*.log'","find /var -name *.log"], hint:"find <katalog> -name <wzorzec>",
      exp:"find domyślnie przeszukuje rekurencyjnie cały podany katalog." },
    { q:"Wpisz komendę, która pokaże bieżącą ścieżkę katalogu roboczego.",
      answers:["pwd"], hint:"Trzy litery, print working directory.",
      exp:"pwd wypisuje bieżącą ścieżkę." }
  ]
},
// ============================================================
{
  id: "uprawnienia",
  title: "Uprawnienia i użytkownicy",
  subtitle: "Prawa dostępu, hasła, sudo",
  icon: "🔐",
  lesson: [
    { cmd:"chmod 750", en:"change mode", pl:"Zmień uprawnienia do pliku/katalogu",
      desc:"Uprawnienia zapisujemy jako 3 cyfry (właściciel/grupa/inni), gdzie 4=odczyt,2=zapis,1=wykonanie. 750 = rwxr-x---.",
      example:"chmod 750 skrypt.sh" },
    { cmd:"chown user:group", en:"change owner", pl:"Zmień właściciela i grupę pliku",
      desc:"Ustawia, kto jest właścicielem pliku i do jakiej grupy należy.",
      example:"chown www-data:www-data /var/www/index.php" },
    { cmd:"sudo", en:"substitute user do / superuser do", pl:"Wykonaj polecenie jako inny użytkownik (domyślnie root)",
      desc:"Kto może używać sudo i do czego, definiuje plik /etc/sudoers (edytowany przez visudo).",
      example:"sudo systemctl restart ssh" },
    { cmd:"su -", en:"substitute user", pl:"Przełącz się na innego użytkownika (pełne środowisko)",
      desc:"'su -' ładuje pełne środowisko docelowego użytkownika, w przeciwieństwie do samego 'su'.",
      example:"su - root" },
    { cmd:"passwd", en:"password", pl:"Zmień hasło użytkownika",
      desc:"Bez argumentu zmienia hasło bieżącego użytkownika; jako root można podać nazwę innego użytkownika.",
      example:"passwd anna" },
    { cmd:"useradd -m", en:"user add", pl:"Utwórz nowego użytkownika (z katalogiem domowym)",
      desc:"-m tworzy katalog domowy, -G dodaje do grup dodatkowych, -s ustawia powłokę logowania.",
      example:"useradd -m -s /bin/bash tester" },
    { cmd:"/etc/passwd", en:"password file (metadata)", pl:"Plik z listą kont systemowych (bez haseł)",
      desc:"Zawiera login, UID, GID, katalog domowy i powłokę — hasła NIE są tu przechowywane od dawna.",
      example:"cat /etc/passwd | cut -d: -f1" },
    { cmd:"/etc/shadow", en:"shadow password file", pl:"Plik z zahaszowanymi hasłami użytkowników",
      desc:"Dostępny tylko dla roota — klasyczny cel eskalacji uprawnień przy błędnej konfiguracji SUID/sudo.",
      example:"sudo cat /etc/shadow" },
    { cmd:"id", en:"identity", pl:"Pokaż UID, GID i grupy bieżącego (lub podanego) użytkownika",
      desc:"Szybki sposób sprawdzenia, jakie masz uprawnienia po eskalacji.",
      example:"id\n# uid=0(root) gid=0(root) groups=0(root)" },
    { cmd:"find / -perm -4000", en:"SUID search", pl:"Znajdź pliki z bitem SUID (potencjalna eskalacja uprawnień)",
      desc:"Klasyczne polecenie enumeracyjne — pliki SUID uruchamiane są z uprawnieniami właściciela pliku (często root).",
      example:"find / -perm -4000 -type f 2>/dev/null" }
  ],
  quiz1: [
    { q:"Który plik przechowuje zahaszowane hasła użytkowników w systemie Linux?",
      options:["/etc/passwd","/etc/shadow","/etc/group","/etc/sudoers"], correct:1,
      exp:"/etc/shadow zawiera hasze haseł, dostępne tylko dla roota." },
    { q:"Co robi komenda: chmod 750 plik.sh ?",
      options:["Nadaje pełne prawa wszystkim","Nadaje rwx właścicielowi, r-x grupie, brak praw innym","Usuwa plik","Zmienia właściciela pliku"], correct:1,
      exp:"7=rwx (właściciel), 5=r-x (grupa), 0=--- (inni)." },
    { q:"Które polecenie pozwala wykonać komendę z uprawnieniami roota bez pełnego przełączania sesji?",
      options:["su","sudo","chmod","passwd"], correct:1, exp:"sudo uruchamia pojedyncze polecenie z podniesionymi uprawnieniami." },
    { q:"Co pokazuje komenda 'id'?",
      options:["Historię logowań","UID, GID i przynależność do grup","Zawartość /etc/passwd","Wersję jądra systemu"], correct:1,
      exp:"id wypisuje identyfikatory użytkownika i grup, do których należy." },
    { q:"Które polecenie utworzy konto użytkownika 'tester' wraz z katalogiem domowym?",
      options:["adduser tester --no-home","useradd -m tester","passwd -m tester","chmod -u tester"], correct:1,
      exp:"-m przy useradd tworzy katalog domowy dla nowego konta." },
    { q:"Dlaczego pliki z bitem SUID są istotne dla pentestera przy eskalacji uprawnień?",
      options:["Bo są zawsze zaszyfrowane","Bo uruchamiają się z uprawnieniami właściciela pliku, np. roota","Bo blokują dostęp do sieci","Bo automatycznie usuwają logi"], correct:1,
      exp:"Program z SUID działa z uprawnieniami właściciela pliku niezależnie od tego, kto go uruchamia." },
    { q:"Jak bezpiecznie edytować plik /etc/sudoers?",
      options:["nano /etc/sudoers","vi /etc/sudoers","visudo","cat > /etc/sudoers"], correct:2,
      exp:"visudo sprawdza składnię przed zapisem, chroniąc przed zablokowaniem dostępu do sudo." }
  ],
  quiz2: [
    { q:"Wpisz komendę nadającą plikowi skrypt.sh uprawnienia rwxr-x--- (750).",
      answers:["chmod 750 skrypt.sh"], hint:"chmod <liczba> <plik>",
      exp:"chmod 750 skrypt.sh ustawia rwx dla właściciela, r-x dla grupy, brak dla innych." },
    { q:"Wpisz komendę zmieniającą właściciela pliku index.php na użytkownika www-data i grupę www-data.",
      answers:["chown www-data:www-data index.php"], hint:"chown user:group plik",
      exp:"chown www-data:www-data index.php ustawia zarówno właściciela jak i grupę." },
    { q:"Wpisz komendę, która wyświetli Twój obecny UID oraz przynależność do grup.",
      answers:["id"], hint:"Krótka, 2-literowa komenda.",
      exp:"id wypisuje UID, GID i grupy bieżącego użytkownika." },
    { q:"Wpisz komendę tworzącą nowego użytkownika 'tester' z katalogiem domowym.",
      answers:["useradd -m tester"], hint:"useradd -m <login>",
      exp:"useradd -m tester tworzy konto wraz z katalogiem domowym." },
    { q:"Wpisz komendę wyszukującą w systemie pliki z bitem SUID (bez błędów w wyniku).",
      answers:["find / -perm -4000 -type f 2>/dev/null","find / -perm -4000 2>/dev/null","find / -perm -4000 -type f"],
      hint:"find / -perm -4000 ...",
      exp:"find / -perm -4000 -type f 2>/dev/null wyszukuje pliki SUID, ukrywając błędy dostępu." }
  ]
},
// ============================================================
{
  id: "procesy",
  title: "Procesy i system",
  subtitle: "ps, kill, systemctl, journalctl",
  icon: "⚙",
  lesson: [
    { cmd:"ps aux", en:"process status", pl:"Pokaż wszystkie uruchomione procesy w systemie",
      desc:"a=wszyscy użytkownicy, u=format z użytkownikiem, x=procesy bez terminala. Podstawa enumeracji po eksploitacji.",
      example:"ps aux | grep ssh" },
    { cmd:"top / htop", en:"table of processes", pl:"Interaktywny podgląd procesów i zużycia zasobów na żywo",
      desc:"htop to bardziej czytelna, kolorowa wersja top.",
      example:"htop" },
    { cmd:"kill -9", en:"kill signal 9 (SIGKILL)", pl:"Wymuś natychmiastowe zakończenie procesu o danym PID",
      desc:"-9 to sygnał SIGKILL — proces nie może go zignorować (w przeciwieństwie do SIGTERM/-15).",
      example:"kill -9 1234" },
    { cmd:"systemctl status", en:"system control", pl:"Sprawdź status usługi systemowej (np. ssh, apache)",
      desc:"systemctl start/stop/restart/enable pozwala zarządzać usługami (systemd).",
      example:"systemctl status ssh" },
    { cmd:"journalctl -u", en:"journal control", pl:"Przeglądaj logi systemowe danej usługi (systemd)",
      desc:"-u filtruje wg jednostki (usługi), -f śledzi logi na żywo, --since ogranicza czasowo.",
      example:"journalctl -u ssh -f" },
    { cmd:"jobs / nohup / &", en:"background jobs", pl:"Zarządzaj procesami działającymi w tle",
      desc:"& uruchamia w tle, nohup pozwala procesowi przeżyć wylogowanie, jobs listuje procesy tła bieżącej sesji.",
      example:"nohup ./skaner.sh &" }
  ],
  quiz1: [
    { q:"Która komenda wyświetli wszystkie procesy w systemie, niezależnie od użytkownika i terminala?",
      options:["ps","ps aux","top -1","jobs -a"], correct:1, exp:"ps aux pokazuje pełną listę procesów wszystkich użytkowników." },
    { q:"Jaki sygnał wysyła 'kill -9 PID'?",
      options:["SIGTERM (można zignorować)","SIGKILL (nie można zignorować)","SIGSTOP","SIGHUP"], correct:1,
      exp:"-9 to SIGKILL, wymuszone natychmiastowe zabicie procesu." },
    { q:"Które polecenie pokaże status usługi ssh zarządzanej przez systemd?",
      options:["service ssh info","systemctl status ssh","ps ssh","journalctl start ssh"], correct:1,
      exp:"systemctl status <usługa> pokazuje aktualny stan usługi systemd." },
    { q:"Jak śledzić logi usługi ssh na żywo za pomocą journalctl?",
      options:["journalctl -u ssh -f","journalctl --tail ssh","journalctl -f --unit=ssh --stop","tail ssh.journal"], correct:0,
      exp:"journalctl -u ssh -f filtruje po jednostce i śledzi nowe wpisy." },
    { q:"Do czego służy nohup przy uruchamianiu procesu w tle?",
      options:["Przyspiesza proces","Pozwala procesowi działać po wylogowaniu z sesji","Usuwa proces po zakończeniu","Szyfruje wyjście procesu"], correct:1,
      exp:"nohup ignoruje sygnał SIGHUP wysyłany przy zamknięciu terminala/sesji." }
  ],
  quiz2: [
    { q:"Wpisz komendę wyświetlającą wszystkie procesy w systemie z użytkownikami (bez ograniczenia do terminala).",
      answers:["ps aux"], hint:"ps + trzy flagi", exp:"ps aux pokazuje pełną listę procesów." },
    { q:"Wpisz komendę, która natychmiast i bezwarunkowo zabije proces o PID 4321.",
      answers:["kill -9 4321"], hint:"kill -9 <PID>", exp:"kill -9 4321 wysyła SIGKILL do procesu 4321." },
    { q:"Wpisz komendę sprawdzającą status usługi apache2 przez systemd.",
      answers:["systemctl status apache2"], hint:"systemctl status <usługa>",
      exp:"systemctl status apache2 pokazuje bieżący stan usługi." },
    { q:"Wpisz komendę śledzącą logi usługi sshd na żywo za pomocą journalctl.",
      answers:["journalctl -u sshd -f"], hint:"journalctl -u <usługa> -f",
      exp:"journalctl -u sshd -f pokazuje nowe wpisy logów w czasie rzeczywistym." }
  ]
},
// ============================================================
{
  id: "siec-podstawy",
  title: "Sieć — podstawy",
  subtitle: "curl, nc, ping, traceroute, ss",
  icon: "🌐",
  lesson: [
    { cmd:"ping -c 4", en:"packet internet groper", pl:"Sprawdź dostępność hosta w sieci",
      desc:"-c ogranicza liczbę wysłanych pakietów ICMP (bez tego ping działałby w nieskończoność).",
      example:"ping -c 4 8.8.8.8" },
    { cmd:"traceroute", en:"trace route", pl:"Pokaż trasę pakietów do hosta docelowego (przeskoki routerów)",
      desc:"Przydatne do mapowania topologii sieci i identyfikacji filtrów po drodze.",
      example:"traceroute example.com" },
    { cmd:"curl -I", en:"client URL", pl:"Wykonaj żądanie HTTP i pobierz tylko nagłówki odpowiedzi",
      desc:"-I wysyła HEAD, -X wybiera metodę, -H dodaje nagłówek, -d wysyła dane POST.",
      example:"curl -I https://example.com" },
    { cmd:"nc -lvnp", en:"netcat (listen, verbose, numeric, port)", pl:"Nasłuchuj na porcie (klasyczne narzędzie sieciowe)",
      desc:"nc to 'scyzoryk szwajcarski' sieciowca — nasłuch, transfer plików, banner grabbing, reverse shell listener.",
      example:"nc -lvnp 4444" },
    { cmd:"ss -tulwn", en:"socket statistics", pl:"Pokaż otwarte porty i nasłuchujące usługi (nowszy odpowiednik netstat)",
      desc:"-t TCP, -u UDP, -l tylko nasłuchujące, -n bez rozwiązywania nazw, -w wide/dodatkowe info.",
      example:"ss -tulwn" },
    { cmd:"wget", en:"web get", pl:"Pobierz plik z sieci przez HTTP/FTP",
      desc:"Dobre do pobierania exploitów, skryptów enumeracyjnych na docelową maszynę.",
      example:"wget http://10.10.10.5/linpeas.sh" }
  ],
  quiz1: [
    { q:"Które polecenie sprawdzi dostępność hosta 8.8.8.8, wysyłając dokładnie 4 pakiety?",
      options:["ping 8.8.8.8","ping -c 4 8.8.8.8","traceroute -c 4 8.8.8.8","curl -c 4 8.8.8.8"], correct:1,
      exp:"-c 4 ogranicza ping do 4 pakietów ICMP." },
    { q:"Które polecenie pobierze WYŁĄCZNIE nagłówki odpowiedzi HTTP ze strony?",
      options:["curl -X GET","curl -I","wget --headers-only","nc -H"], correct:1, exp:"curl -I wysyła żądanie HEAD i zwraca same nagłówki." },
    { q:"Które polecenie uruchomi nasłuch na porcie 4444 (typowy listener do reverse shell)?",
      options:["nc -lvnp 4444","curl -listen 4444","ss -listen 4444","ping -p 4444"], correct:0,
      exp:"nc -lvnp 4444 nasłuchuje na porcie 4444." },
    { q:"Które polecenie pokaże listę nasłuchujących portów TCP i UDP bez rozwiązywania DNS?",
      options:["ss -tulwn","ping -tuln","curl -tuln","traceroute -n"], correct:0,
      exp:"ss -tulwn to nowoczesny odpowiednik netstat -tulpn." },
    { q:"Do czego głównie służy traceroute w kontekście rekonesansu?",
      options:["Do łamania haseł","Do mapowania trasy pakietów i wykrywania hopów/filtrów po drodze","Do skanowania portów","Do edycji plików tekstowych"], correct:1,
      exp:"traceroute pokazuje kolejne routery (hopy) na drodze do celu." }
  ],
  quiz2: [
    { q:"Wpisz komendę wysyłającą dokładnie 4 pakiety ping do hosta 192.168.1.1.",
      answers:["ping -c 4 192.168.1.1"], hint:"ping -c <liczba> <host>", exp:"ping -c 4 192.168.1.1." },
    { q:"Wpisz komendę pobierającą tylko nagłówki HTTP ze strony https://example.com.",
      answers:["curl -I https://example.com"], hint:"curl -I <url>", exp:"curl -I https://example.com." },
    { q:"Wpisz komendę uruchamiającą nasłuch netcat na porcie 4444 w trybie verbose.",
      answers:["nc -lvnp 4444","nc -lvp 4444","nc -nlvp 4444"], hint:"nc -lvnp <port>", exp:"nc -lvnp 4444 nasłuchuje na porcie 4444." },
    { q:"Wpisz komendę pokazującą wszystkie nasłuchujące gniazda TCP/UDP bez rozwiązywania nazw.",
      answers:["ss -tulwn","ss -tuln","ss -tulnw"], hint:"ss -tul... + n", exp:"ss -tulwn pokazuje nasłuchujące porty." }
  ]
},
// ============================================================
{
  id: "rekonesans",
  title: "Rekonesans sieciowy",
  subtitle: "nmap, netdiscover, arp-scan",
  icon: "🛰",
  lesson: [
    { cmd:"nmap -sV -sC", en:"Network Mapper — service version, scripts", pl:"Skanuj porty z wykrywaniem wersji usług i domyślnymi skryptami NSE",
      desc:"-sV wykrywa wersje oprogramowania, -sC uruchamia domyślne, bezpieczne skrypty NSE (banner, enum).",
      example:"nmap -sV -sC 10.10.10.15" },
    { cmd:"nmap -p-", en:"all ports", pl:"Skanuj pełny zakres 65535 portów",
      desc:"Domyślnie nmap skanuje tylko top 1000 portów — -p- daje pełny obraz, kosztem czasu.",
      example:"nmap -p- -T4 10.10.10.15" },
    { cmd:"nmap -sn", en:"ping scan (no port scan)", pl:"Wykryj, które hosty w sieci są aktywne (bez skanowania portów)",
      desc:"Szybki sposób na zmapowanie żywych hostów w podsieci przed właściwym skanowaniem.",
      example:"nmap -sn 10.10.10.0/24" },
    { cmd:"netdiscover", en:"network discover", pl:"Wykryj aktywne hosty w sieci lokalnej przez ARP",
      desc:"Pasywnie lub aktywnie nasłuchuje/wysyła zapytania ARP, by odkryć hosty w tej samej sieci L2.",
      example:"netdiscover -r 192.168.1.0/24" },
    { cmd:"arp-scan", en:"ARP scan", pl:"Aktywnie skanuj sieć lokalną protokołem ARP",
      desc:"Szybka i wiarygodna metoda wykrywania hostów w sieci lokalnej (działa nawet gdy ICMP jest blokowany).",
      example:"arp-scan --localnet" }
  ],
  quiz1: [
    { q:"Która flaga nmap uruchamia domyślne, bezpieczne skrypty NSE?",
      options:["-sV","-sC","-sn","-p-"], correct:1, exp:"-sC uruchamia zestaw domyślnych skryptów NSE." },
    { q:"Które polecenie przeskanuje WSZYSTKIE 65535 portów celu?",
      options:["nmap -sV 10.10.10.5","nmap -p- 10.10.10.5","nmap -sn 10.10.10.5","nmap -top 10.10.10.5"], correct:1,
      exp:"-p- oznacza pełny zakres portów 1-65535." },
    { q:"Jak wykryć żywe hosty w sieci 10.10.10.0/24 BEZ skanowania portów?",
      options:["nmap -sn 10.10.10.0/24","nmap -sV 10.10.10.0/24","nmap -p- 10.10.10.0/24","nmap -sC 10.10.10.0/24"], correct:0,
      exp:"-sn to tzw. ping scan — sprawdza dostępność hostów bez skanu portów." },
    { q:"Do czego służy arp-scan w rekonesansie sieci lokalnej?",
      options:["Do łamania WPA2","Do wykrywania hostów w tej samej sieci L2 metodą ARP","Do fuzzing webowego","Do analizy logów systemowych"], correct:1,
      exp:"arp-scan wysyła zapytania ARP, wykrywając aktywne urządzenia w sieci lokalnej." },
    { q:"Która flaga nmap wykrywa wersje usług nasłuchujących na otwartych portach?",
      options:["-sV","-sn","-A -F","-O only"], correct:0, exp:"-sV = service version detection." }
  ],
  quiz2: [
    { q:"Wpisz komendę nmap skanującą host 10.10.10.15 z wykryciem wersji usług i domyślnymi skryptami NSE.",
      answers:["nmap -sV -sC 10.10.10.15","nmap -sC -sV 10.10.10.15"], hint:"nmap -sV -sC <cel>",
      exp:"nmap -sV -sC 10.10.10.15 łączy wykrywanie wersji i skrypty NSE." },
    { q:"Wpisz komendę nmap skanującą pełny zakres portów (65535) hosta 10.10.10.15.",
      answers:["nmap -p- 10.10.10.15"], hint:"nmap -p- <cel>", exp:"nmap -p- 10.10.10.15." },
    { q:"Wpisz komendę wykrywającą żywe hosty w sieci 192.168.1.0/24 bez skanowania portów.",
      answers:["nmap -sn 192.168.1.0/24"], hint:"nmap -sn <sieć>", exp:"nmap -sn 192.168.1.0/24." }
  ]
},
// ============================================================
{
  id: "enumeracja-web",
  title: "Enumeracja webowa",
  subtitle: "gobuster, ffuf, whatweb, arjun",
  icon: "🕸",
  lesson: [
    { cmd:"gobuster dir -u -w", en:"go buster (directory mode)", pl:"Szukaj ukrytych katalogów/plików na serwerze WWW",
      desc:"-u wskazuje URL celu, -w słownik (np. z SecLists), -x rozszerzenia plików do sprawdzenia.",
      example:"gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt" },
    { cmd:"ffuf -u -w", en:"fuzz faster u fool", pl:"Szybki fuzzing katalogów, parametrów i subdomen (placeholder FUZZ)",
      desc:"W URL/nagłówku umieszczasz słowo FUZZ, które ffuf podmienia kolejnymi wpisami ze słownika.",
      example:"ffuf -u http://10.10.10.5/FUZZ -w common.txt" },
    { cmd:"dirb", en:"dir buster (classic)", pl:"Klasyczne narzędzie do enumeracji katalogów webowych",
      desc:"Starszy odpowiednik gobustera — prostszy, ale wciąż użyteczny do szybkiego skanu.",
      example:"dirb http://10.10.10.5" },
    { cmd:"whatweb", en:"what web", pl:"Zidentyfikuj technologie napędzające aplikację webową",
      desc:"Wykrywa CMS, serwer HTTP, frameworki, wersje bibliotek JS na podstawie odpowiedzi serwera.",
      example:"whatweb http://10.10.10.5" },
    { cmd:"arjun -u", en:"Arjun (parameter discovery)", pl:"Odkryj ukryte parametry HTTP akceptowane przez endpoint",
      desc:"Przydatne przy testowaniu API — znajduje parametry niewidoczne w dokumentacji/formularzu.",
      example:"arjun -u http://10.10.10.5/api/search" },
    { cmd:"gobuster vhost -u -w", en:"vhost enumeration", pl:"Wykryj wirtualne hosty (subdomeny) skonfigurowane na serwerze",
      desc:"Ważne, gdy aplikacja rozróżnia treść na podstawie nagłówka Host — klasyczny cel dla purple teamu.",
      example:"gobuster vhost -u http://10.10.10.5 -w subdomains.txt" }
  ],
  quiz1: [
    { q:"Które polecenie uruchomi gobuster w trybie wyszukiwania katalogów na http://target z użyciem wordlist.txt?",
      options:["gobuster vhost -u http://target -w wordlist.txt","gobuster dir -u http://target -w wordlist.txt","gobuster dns -u http://target -w wordlist.txt","gobuster fuzz http://target"], correct:1,
      exp:"gobuster dir -u <url> -w <słownik> to tryb enumeracji katalogów." },
    { q:"Co w ffuf oznacza słowo 'FUZZ' w adresie URL?",
      options:["Nazwę pliku wynikowego","Placeholder podmieniany kolejnymi wpisami ze słownika","Typ HTTP method","Flagę verbose"], correct:1,
      exp:"FUZZ to punkt podstawienia — ffuf wstawia tam kolejne słowa ze słownika." },
    { q:"Które narzędzie najszybciej zidentyfikuje CMS i technologie użyte na stronie?",
      options:["whatweb","ping","traceroute","chmod"], correct:0, exp:"whatweb specjalizuje się w fingerprintingu technologii webowych." },
    { q:"Do czego służy narzędzie arjun?",
      options:["Do skanowania portów","Do wykrywania ukrytych parametrów HTTP","Do łamania haseł SSH","Do analizy pakietów"], correct:1,
      exp:"arjun automatycznie odkrywa parametry akceptowane przez endpoint." },
    { q:"Który tryb gobustera służy do wykrywania wirtualnych hostów (subdomen)?",
      options:["gobuster dir","gobuster vhost","gobuster dns-only","gobuster sub"], correct:1, exp:"gobuster vhost testuje różne wartości nagłówka Host." }
  ],
  quiz2: [
    { q:"Wpisz komendę gobuster wyszukującą katalogi na http://10.10.10.5 z użyciem /usr/share/wordlists/dirb/common.txt.",
      answers:["gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt"], hint:"gobuster dir -u <url> -w <słownik>",
      exp:"gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt." },
    { q:"Wpisz komendę whatweb sprawdzającą technologie strony http://10.10.10.5.",
      answers:["whatweb http://10.10.10.5"], hint:"whatweb <url>", exp:"whatweb http://10.10.10.5." },
    { q:"Wpisz komendę ffuf fuzzującą katalogi na http://10.10.10.5/FUZZ z użyciem common.txt.",
      answers:["ffuf -u http://10.10.10.5/FUZZ -w common.txt"], hint:"ffuf -u <url z FUZZ> -w <słownik>",
      exp:"ffuf -u http://10.10.10.5/FUZZ -w common.txt." }
  ]
},
// ============================================================
{
  id: "podatnosci",
  title: "Weryfikacja podatności",
  subtitle: "searchsploit, nikto, sqlmap (podstawy)",
  icon: "🛡",
  lesson: [
    { cmd:"searchsploit", en:"search exploit", pl:"Przeszukaj lokalną kopię bazy Exploit-DB",
      desc:"Działa offline, świetne po zidentyfikowaniu konkretnej wersji oprogramowania przez nmap -sV.",
      example:"searchsploit apache 2.4.49" },
    { cmd:"nikto -h", en:"Nikto (web scanner)", pl:"Skanuj serwer WWW pod kątem znanych podatności i błędnych konfiguracji",
      desc:"Wykrywa przestarzałe oprogramowanie, niebezpieczne pliki domyślne, nagłówki bezpieczeństwa.",
      example:"nikto -h http://10.10.10.5" },
    { cmd:"sqlmap -u", en:"SQL map", pl:"Automatycznie testuj i eksploatuj SQL Injection",
      desc:"-u wskazuje URL z parametrem, --dbs listuje bazy danych, --batch przechodzi przez pytania z ustawieniami domyślnymi.",
      example:"sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs" },
    { cmd:"searchsploit -m", en:"searchsploit mirror", pl:"Skopiuj (mirror) znaleziony exploit lokalnie do dalszej analizy",
      desc:"Pozwala pobrać kod exploita do bieżącego katalogu przed dostosowaniem go do celu.",
      example:"searchsploit -m 50383" }
  ],
  quiz1: [
    { q:"Do czego służy searchsploit?",
      options:["Do skanowania portów","Do przeszukiwania lokalnej bazy Exploit-DB","Do analizy ruchu sieciowego","Do zarządzania użytkownikami"], correct:1,
      exp:"searchsploit przeszukuje offline'ową kopię Exploit-DB po nazwie/wersji oprogramowania." },
    { q:"Które polecenie przeskanuje serwer WWW pod kątem znanych podatności i domyślnych plików?",
      options:["nikto -h http://target","sqlmap -h http://target","gobuster -h http://target","nmap -h http://target"], correct:0,
      exp:"nikto -h <url> to skaner podatności webowych." },
    { q:"Co robi flaga --dbs w sqlmap?",
      options:["Usuwa bazę danych","Listuje dostępne bazy danych po znalezieniu podatności SQLi","Skanuje porty bazy danych","Tworzy backup bazy"], correct:1,
      exp:"--dbs każe sqlmap wypisać dostępne bazy danych po wykryciu SQL Injection." },
    { q:"Jaki jest typowy pierwszy krok przed użyciem searchsploit?",
      options:["Uruchomienie sqlmap","Zidentyfikowanie wersji usługi (np. przez nmap -sV)","Restart systemu","Zmiana hasła roota"], correct:1,
      exp:"Znajomość dokładnej wersji oprogramowania pozwala trafnie wyszukać pasujący exploit." }
  ],
  quiz2: [
    { q:"Wpisz komendę searchsploit wyszukującą exploity dla 'apache 2.4.49'.",
      answers:["searchsploit apache 2.4.49"], hint:"searchsploit <nazwa i wersja>", exp:"searchsploit apache 2.4.49." },
    { q:"Wpisz komendę nikto skanującą http://10.10.10.5.",
      answers:["nikto -h http://10.10.10.5"], hint:"nikto -h <url>", exp:"nikto -h http://10.10.10.5." },
    { q:"Wpisz komendę sqlmap testującą URL http://10.10.10.5/item?id=1 i listującą bazy danych.",
      answers:["sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs","sqlmap -u http://10.10.10.5/item?id=1 --dbs"], hint:"sqlmap -u <url> --dbs",
      exp:"sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs." }
  ]
},
// ============================================================
{
  id: "ruch-sieciowy",
  title: "Analiza ruchu sieciowego",
  subtitle: "tcpdump, tshark, curl/httpie",
  icon: "📡",
  lesson: [
    { cmd:"tcpdump -i eth0", en:"TCP dump", pl:"Przechwytuj ruch sieciowy na wskazanym interfejsie",
      desc:"-w zapisuje do pliku .pcap, -n bez rozwiązywania DNS, filtry np. 'port 80' ograniczają przechwytywany ruch.",
      example:"tcpdump -i eth0 -n port 80 -w ruch.pcap" },
    { cmd:"tshark -r", en:"terminal Wireshark (read)", pl:"Analizuj plik przechwyconego ruchu (.pcap) w terminalu",
      desc:"Wiersz poleceń Wiresharka — pozwala filtrować i wyciągać konkretne pola z pakietów.",
      example:"tshark -r ruch.pcap -Y \"http.request\"" },
    { cmd:"tshark -Y", en:"display filter", pl:"Filtruj przechwycony ruch wg wyrażenia (np. protokołu)",
      desc:"Filtry wyświetlania Wiresharka/tsharka — np. http, dns, tcp.port==443.",
      example:"tshark -r ruch.pcap -Y \"dns\"" },
    { cmd:"curl -X POST -H", en:"custom HTTP request", pl:"Ręcznie skonstruuj żądanie HTTP z niestandardowymi nagłówkami",
      desc:"Kluczowe przy testowaniu API, walidacji CORS i mechanizmów autoryzacji.",
      example:"curl -X POST -H \"Content-Type: application/json\" -d '{\"user\":\"a\"}' http://10.10.10.5/api/login" },
    { cmd:"httpie (http)", en:"HTTPie", pl:"Bardziej czytelna alternatywa dla curl przy testowaniu API",
      desc:"Domyślnie koloruje i formatuje JSON, prostsza składnia dla nagłówków i danych.",
      example:"http POST 10.10.10.5/api/login user=a pass=b" }
  ],
  quiz1: [
    { q:"Które polecenie przechwyci ruch na interfejsie eth0 i zapisze go do pliku ruch.pcap?",
      options:["tcpdump -i eth0 -w ruch.pcap","tshark -w ruch.pcap eth0","curl -i eth0 -o ruch.pcap","nc -i eth0 > ruch.pcap"], correct:0,
      exp:"tcpdump -i <interfejs> -w <plik> przechwytuje i zapisuje ruch." },
    { q:"Które polecenie odczyta plik ruch.pcap i pokaże tylko żądania HTTP?",
      options:["tshark -r ruch.pcap -Y \"http.request\"","tcpdump -r ruch.pcap http","curl -r ruch.pcap","ffuf -r ruch.pcap"], correct:0,
      exp:"tshark -r <plik> -Y <filtr> analizuje zapisany ruch z filtrem wyświetlania." },
    { q:"Jak wysłać żądanie POST z JSON-em za pomocą curl?",
      options:["curl -X POST -H \"Content-Type: application/json\" -d '{...}' url","curl --json url","curl -POST url --data-json","curl -X GET -d json url"], correct:0,
      exp:"curl -X POST z nagłówkiem Content-Type i flagą -d dla danych to standard wysyłania JSON." },
    { q:"Do czego służy filtr -Y w tshark?",
      options:["Do zapisu pliku wynikowego","Do filtrowania wyświetlanych pakietów wg wyrażenia (np. protokołu)","Do wyboru interfejsu sieciowego","Do zmiany trybu promiscuous"], correct:1,
      exp:"-Y to filtr wyświetlania (display filter), analogiczny do paska filtrów w Wiresharku." }
  ],
  quiz2: [
    { q:"Wpisz komendę tcpdump przechwytującą ruch na eth0 tylko dla portu 80, zapisując do pliku ruch.pcap.",
      answers:["tcpdump -i eth0 -n port 80 -w ruch.pcap","tcpdump -i eth0 port 80 -w ruch.pcap"], hint:"tcpdump -i <if> port 80 -w <plik>",
      exp:"tcpdump -i eth0 -n port 80 -w ruch.pcap." },
    { q:"Wpisz komendę tshark odczytującą plik ruch.pcap i pokazującą tylko zapytania DNS.",
      answers:["tshark -r ruch.pcap -Y \"dns\"","tshark -r ruch.pcap -Y dns"], hint:"tshark -r <plik> -Y <filtr>",
      exp:"tshark -r ruch.pcap -Y \"dns\"." }
  ]
},
// ============================================================
{
  id: "eksploatacja",
  title: "Eksploatacja i walidacja",
  subtitle: "sqlmap, hydra, netexec, responder",
  icon: "💥",
  lesson: [
    { cmd:"sqlmap --batch --risk", en:"SQL map (automated)", pl:"Automatyzuj testy SQLi z domyślnymi odpowiedziami i poziomem ryzyka",
      desc:"--batch pomija pytania interaktywne, --risk/--level kontrolują agresywność testów (uważaj na środowiska produkcyjne!).",
      example:"sqlmap -u \"http://target/item?id=1\" --batch --risk=1" },
    { cmd:"hydra -l -P", en:"Hydra (brute force)", pl:"Testuj poświadczenia logowania metodą słownikową",
      desc:"-l login (pojedynczy), -L plik loginów, -P plik haseł, na końcu podajesz usługę (ssh, http-post-form itd.).",
      example:"hydra -l admin -P rockyou.txt ssh://10.10.10.5" },
    { cmd:"netexec (nxc)", en:"Network Exec (dawniej CrackMapExec)", pl:"Testuj i waliduj poświadczenia w usługach Windows/SMB w wielu hostach naraz",
      desc:"Następca CrackMapExec — pozwala szybko zweryfikować, gdzie działają dane poświadczenia (SMB, WinRM, itd.).",
      example:"nxc smb 10.10.10.0/24 -u admin -p 'Password1'" },
    { cmd:"responder -I", en:"Responder", pl:"Symuluj ataki LLMNR/NBT-NS poisoning, by przechwycić hasze uwierzytelniania",
      desc:"Używane w kontrolowany sposób do sprawdzenia, czy Blue Team wykryje zatruwanie protokołów rozgłoszeniowych.",
      example:"responder -I eth0" }
  ],
  quiz1: [
    { q:"Co robi flaga --batch w sqlmap?",
      options:["Włącza tryb graficzny","Pomija interaktywne pytania, używając domyślnych odpowiedzi","Zwiększa liczbę wątków","Wyłącza logowanie"], correct:1,
      exp:"--batch automatyzuje przebieg testu bez czekania na odpowiedzi użytkownika." },
    { q:"Które polecenie hydra przetestuje logowanie SSH loginem 'admin' i słownikiem rockyou.txt?",
      options:["hydra -l admin -P rockyou.txt ssh://10.10.10.5","hydra ssh -u admin -w rockyou.txt","hydra -P admin -l rockyou.txt 10.10.10.5","nc -l admin -P rockyou.txt ssh"], correct:0,
      exp:"hydra -l <login> -P <słownik haseł> <protokół>://<host>." },
    { q:"Do czego służy netexec (nxc) w purple teamie?",
      options:["Do fuzzing webowego","Do walidacji poświadczeń na wielu hostach w usługach typu SMB/WinRM","Do analizy pakietów pcap","Do przeszukiwania Exploit-DB"], correct:1,
      exp:"netexec pozwala sprawdzić ważność poświadczeń na wielu maszynach jednocześnie." },
    { q:"Do czego służy responder w kontrolowanym teście purple team?",
      options:["Do skanowania portów","Do symulacji LLMNR/NBT-NS poisoning i przechwytywania haszy uwierzytelniania","Do tworzenia kopii zapasowych","Do zarządzania firewallem"], correct:1,
      exp:"responder odpowiada na rozgłoszenia LLMNR/NBT-NS, przechwytując próby uwierzytelnienia." }
  ],
  quiz2: [
    { q:"Wpisz komendę hydra testującą login 'admin' ze słownikiem rockyou.txt na usłudze ssh hosta 10.10.10.5.",
      answers:["hydra -l admin -P rockyou.txt ssh://10.10.10.5"], hint:"hydra -l <login> -P <słownik> ssh://<host>",
      exp:"hydra -l admin -P rockyou.txt ssh://10.10.10.5." },
    { q:"Wpisz komendę uruchamiającą responder na interfejsie eth0.",
      answers:["responder -I eth0"], hint:"responder -I <interfejs>", exp:"responder -I eth0." }
  ]
},
// ============================================================
{
  id: "tunelowanie",
  title: "Tunelowanie i pivoting",
  subtitle: "ssh -L/-R/-D, socat, chisel, ligolo-ng",
  icon: "🔀",
  lesson: [
    { cmd:"ssh -L", en:"local port forwarding", pl:"Przekieruj lokalny port do usługi za maszyną pośredniczącą",
      desc:"ssh -L <port_lokalny>:<host_docelowy>:<port_docelowy> user@pivot — udostępnia usługę z sieci wewnętrznej lokalnie.",
      example:"ssh -L 8080:10.10.10.20:80 user@pivot-host" },
    { cmd:"ssh -R", en:"remote port forwarding", pl:"Udostępnij lokalną usługę zdalnej maszynie (odwrotny tunel)",
      desc:"Przydatne, gdy maszyna docelowa nie ma bezpośredniego dostępu do Ciebie — Ty łączysz się do niej.",
      example:"ssh -R 4444:localhost:4444 user@pivot-host" },
    { cmd:"ssh -D", en:"dynamic port forwarding (SOCKS proxy)", pl:"Utwórz dynamiczny proxy SOCKS przez tunel SSH",
      desc:"Pozwala przekierować cały ruch narzędzi (np. przez proxychains) przez skompromitowany hosta.",
      example:"ssh -D 1080 user@pivot-host" },
    { cmd:"socat", en:"socket cat", pl:"Przekazuj/przekierowuj dowolny ruch sieciowy między gniazdami",
      desc:"Bardziej elastyczny niż netcat — potrafi łączyć różne typy gniazd (TCP, UDP, pliki).",
      example:"socat TCP-LISTEN:8080,fork TCP:10.10.10.20:80" },
    { cmd:"chisel", en:"Chisel (tunneling tool)", pl:"Twórz szybkie tunele TCP/UDP przez HTTP (przydatne przy restrykcyjnych firewallach)",
      desc:"Działa w modelu klient-serwer, tunelując ruch przez HTTP, co bywa skuteczne przeciw prostym filtrom.",
      example:"chisel server -p 8000 --reverse" },
    { cmd:"ligolo-ng", en:"Ligolo Next Generation", pl:"Nowoczesne narzędzie do pivotingu z wirtualnym interfejsem sieciowym",
      desc:"Tworzy tunel wyglądający jak zwykły interfejs sieciowy, ułatwiając routing do sieci wewnętrznych.",
      example:"proxy -selfcert" }
  ],
  quiz1: [
    { q:"Która opcja ssh tworzy dynamiczny proxy SOCKS przez tunel SSH?",
      options:["ssh -L","ssh -R","ssh -D","ssh -X"], correct:2, exp:"ssh -D uruchamia dynamiczne przekierowanie portów jako proxy SOCKS." },
    { q:"Kiedy używasz ssh -R zamiast ssh -L?",
      options:["Gdy chcesz udostępnić lokalną usługę zdalnej maszynie (tunel odwrotny)","Gdy chcesz przyspieszyć transfer plików","Gdy chcesz zeskanować porty","Gdy chcesz zmienić hasło"], correct:0,
      exp:"-R (remote forwarding) tworzy tunel w odwrotnym kierunku niż -L." },
    { q:"Do czego głównie służy narzędzie chisel?",
      options:["Do łamania haseł","Do tunelowania TCP/UDP przez HTTP, przydatne przy restrykcyjnych firewallach","Do analizy logów","Do zarządzania użytkownikami"], correct:1,
      exp:"chisel tuneluje ruch przez HTTP w modelu klient-serwer." },
    { q:"Które polecenie ssh przekieruje lokalny port 8080 do usługi 10.10.10.20:80 przez maszynę pośredniczącą?",
      options:["ssh -L 8080:10.10.10.20:80 user@pivot","ssh -R 8080:10.10.10.20:80 user@pivot","ssh -D 8080 user@pivot","ssh -p 8080 user@pivot"], correct:0,
      exp:"ssh -L <lokalny>:<cel>:<port> user@pivot to lokalne przekierowanie portu." }
  ],
  quiz2: [
    { q:"Wpisz komendę ssh tworzącą dynamiczny proxy SOCKS na porcie 1080 przez hosta pivot-host (użytkownik user).",
      answers:["ssh -D 1080 user@pivot-host"], hint:"ssh -D <port> user@host", exp:"ssh -D 1080 user@pivot-host." },
    { q:"Wpisz komendę ssh przekierowującą lokalny port 8080 do 10.10.10.20:80 przez user@pivot-host.",
      answers:["ssh -L 8080:10.10.10.20:80 user@pivot-host"], hint:"ssh -L <lokalny>:<cel>:<port> user@host",
      exp:"ssh -L 8080:10.10.10.20:80 user@pivot-host." }
  ]
},
// ============================================================
{
  id: "threat-hunting",
  title: "Threat hunting i logi",
  subtitle: "grep/awk/sed/jq, ps/ss/lsof forensics",
  icon: "🔎",
  lesson: [
    { cmd:"awk '{print $1}'", en:"Aho, Weinberger, Kernighan (język przetwarzania tekstu)", pl:"Wyciągaj i przetwarzaj kolumny danych tekstowych",
      desc:"Bardzo potężne przy parsowaniu logów w kolumnach, np. adresów IP z logów Apache/Nginx.",
      example:"awk '{print $1}' access.log | sort | uniq -c | sort -nr" },
    { cmd:"sed 's/x/y/g'", en:"stream editor", pl:"Automatycznie edytuj/zamieniaj tekst w strumieniu danych",
      desc:"Klasyczne zastosowanie: masowa zamiana wzorców w logach lub plikach konfiguracyjnych.",
      example:"sed 's/ERROR/BŁĄD/g' log.txt" },
    { cmd:"jq", en:"JSON query", pl:"Parsuj i filtruj dane w formacie JSON w terminalu",
      desc:"Niezbędny przy analizie logów JSON (np. z API, ELK, chmurowych usług).",
      example:"cat events.json | jq '.[] | select(.status==\"failed\")'" },
    { cmd:"sort | uniq -c", en:"sort, unique count", pl:"Policz wystąpienia unikalnych wartości (np. adresów IP)",
      desc:"Klasyczny łańcuch do szybkiej analizy częstości — kto najczęściej odpytuje serwer.",
      example:"cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head" },
    { cmd:"lsof -i", en:"list open files (internet)", pl:"Pokaż otwarte połączenia sieciowe i powiązane z nimi procesy",
      desc:"Świetne do wykrycia nietypowego procesu utrzymującego podejrzane połączenie sieciowe.",
      example:"lsof -i :4444" },
    { cmd:"cut -d: -f1", en:"cut", pl:"Wytnij konkretne pole/kolumnę z linii tekstu wg separatora",
      desc:"-d ustawia separator (np. dwukropek w /etc/passwd), -f wybiera numer pola.",
      example:"cut -d: -f1 /etc/passwd" }
  ],
  quiz1: [
    { q:"Które polecenie policzy, ile razy każdy adres IP pojawia się w pierwszej kolumnie access.log, sortując malejąco?",
      options:["awk '{print $1}' access.log | sort | uniq -c | sort -nr","grep IP access.log | count","cat access.log | uniq","sed 's/IP/count/' access.log"], correct:0,
      exp:"To klasyczny łańcuch: wytnij kolumnę → posortuj → policz unikalne → posortuj wg liczby." },
    { q:"Do czego służy narzędzie jq?",
      options:["Do kompresji plików","Do parsowania i filtrowania danych JSON","Do skanowania portów","Do zarządzania procesami"], correct:1,
      exp:"jq to dedykowane narzędzie CLI do pracy z danymi JSON." },
    { q:"Które polecenie pokaże, jaki proces trzyma otwarte połączenie na porcie 4444?",
      options:["ps -4444","lsof -i :4444","grep 4444 /etc/passwd","find -port 4444"], correct:1,
      exp:"lsof -i :<port> pokazuje procesy powiązane z danym portem/połączeniem." },
    { q:"Co robi sed 's/ERROR/BŁĄD/g' log.txt ?",
      options:["Usuwa wszystkie linie z ERROR","Zamienia każde wystąpienie ERROR na BŁĄD w tekście","Liczy wystąpienia ERROR","Sortuje plik log.txt"], correct:1,
      exp:"s/x/y/g to podstawienie globalne (wszystkie wystąpienia w linii)." }
  ],
  quiz2: [
    { q:"Wpisz komendę wycinającą pierwsze pole (oddzielone dwukropkiem) z pliku /etc/passwd.",
      answers:["cut -d: -f1 /etc/passwd"], hint:"cut -d<separator> -f<numer> <plik>", exp:"cut -d: -f1 /etc/passwd." },
    { q:"Wpisz komendę pokazującą proces nasłuchujący/połączony na porcie 4444.",
      answers:["lsof -i :4444"], hint:"lsof -i :<port>", exp:"lsof -i :4444." },
    { q:"Wpisz komendę zliczającą i sortującą malejąco unikalne adresy IP z pierwszej kolumny access.log.",
      answers:["awk '{print $1}' access.log | sort | uniq -c | sort -nr"], hint:"awk → sort → uniq -c → sort -nr",
      exp:"awk '{print $1}' access.log | sort | uniq -c | sort -nr." }
  ]
},
// ============================================================
{
  id: "ssh",
  title: "SSH — bezpieczny dostęp",
  subtitle: "ssh-keygen, scp, sshd_config",
  icon: "🔑",
  lesson: [
    { cmd:"ssh-keygen -t ed25519", en:"SSH key generator", pl:"Wygeneruj parę kluczy SSH (prywatny/publiczny)",
      desc:"ed25519 to nowoczesny, zalecany algorytm — szybszy i bezpieczniejszy niż stare RSA-1024/2048.",
      example:"ssh-keygen -t ed25519 -C \"anna@laptop\"" },
    { cmd:"ssh-copy-id", en:"SSH copy identity", pl:"Wyślij swój klucz publiczny na serwer, by logować się bez hasła",
      desc:"Dopisuje Twój klucz publiczny do ~/.ssh/authorized_keys na serwerze docelowym.",
      example:"ssh-copy-id user@10.10.10.5" },
    { cmd:"scp", en:"secure copy", pl:"Kopiuj pliki między maszynami przez szyfrowany kanał SSH",
      desc:"Składnia jak cp, ale z hostem: scp plik user@host:/ścieżka/docelowa.",
      example:"scp raport.pdf user@10.10.10.5:/tmp/" },
    { cmd:"/etc/ssh/sshd_config", en:"SSH daemon config", pl:"Plik konfiguracyjny serwera SSH",
      desc:"Tu wyłączasz logowanie roota (PermitRootLogin no) i logowanie hasłem (PasswordAuthentication no) — kluczowe hardenowanie.",
      example:"sudo nano /etc/ssh/sshd_config" },
    { cmd:"ssh -i", en:"identity file", pl:"Zaloguj się przez SSH używając wskazanego klucza prywatnego",
      desc:"Przydatne, gdy masz wiele kluczy do różnych serwerów/projektów.",
      example:"ssh -i ~/.ssh/id_ed25519 user@10.10.10.5" }
  ],
  quiz1: [
    { q:"Które polecenie wygeneruje nowoczesną parę kluczy SSH typu ed25519?",
      options:["ssh-keygen -t ed25519","ssh-copy-id -t ed25519","scp -t ed25519","ssh -keygen ed25519"], correct:0,
      exp:"ssh-keygen -t ed25519 tworzy nową parę kluczy tego typu." },
    { q:"Które polecenie skopiuje Twój klucz publiczny na serwer, umożliwiając logowanie bez hasła?",
      options:["scp id_rsa.pub user@host:~","ssh-copy-id user@host","ssh -copy-key user@host","ssh-keygen -copy user@host"], correct:1,
      exp:"ssh-copy-id automatycznie dopisuje klucz do authorized_keys na serwerze." },
    { q:"W którym pliku wyłączysz logowanie roota przez SSH?",
      options:["/etc/passwd","/etc/ssh/sshd_config","/etc/shadow","~/.ssh/config"], correct:1,
      exp:"PermitRootLogin no w /etc/ssh/sshd_config blokuje logowanie roota po SSH." },
    { q:"Które polecenie skopiuje plik raport.pdf na zdalny serwer przez SSH?",
      options:["cp raport.pdf user@host:/tmp/","scp raport.pdf user@host:/tmp/","ssh raport.pdf user@host:/tmp/","ftp raport.pdf user@host"], correct:1,
      exp:"scp kopiuje pliki przez szyfrowany kanał SSH, ze składnią podobną do cp." }
  ],
  quiz2: [
    { q:"Wpisz komendę generującą nową parę kluczy SSH typu ed25519 z komentarzem \"anna@laptop\".",
      answers:["ssh-keygen -t ed25519 -C \"anna@laptop\"","ssh-keygen -t ed25519 -C anna@laptop"], hint:"ssh-keygen -t ed25519 -C <komentarz>",
      exp:"ssh-keygen -t ed25519 -C \"anna@laptop\"." },
    { q:"Wpisz komendę kopiującą plik raport.pdf na serwer 10.10.10.5 do katalogu /tmp/ (użytkownik user).",
      answers:["scp raport.pdf user@10.10.10.5:/tmp/","scp raport.pdf user@10.10.10.5:/tmp"], hint:"scp <plik> user@host:<ścieżka>",
      exp:"scp raport.pdf user@10.10.10.5:/tmp/." }
  ]
},
// ============================================================
{
  id: "bash-automatyzacja",
  title: "Bash i automatyzacja",
  subtitle: "zmienne, pętle, cron",
  icon: "📜",
  lesson: [
    { cmd:"#!/bin/bash", en:"shebang", pl:"Pierwsza linia skryptu wskazująca interpreter",
      desc:"Mówi systemowi, którym programem (tu: bashem) uruchomić resztę pliku.",
      example:"#!/bin/bash\necho \"Start skanu\"" },
    { cmd:"for i in ...; do ... done", en:"for loop", pl:"Pętla wykonująca polecenia dla każdego elementu listy",
      desc:"Klasyczna konstrukcja do iterowania np. po liście adresów IP z pliku.",
      example:"for ip in $(cat hosts.txt); do ping -c1 $ip; done" },
    { cmd:"if [ -f plik ]; then ... fi", en:"conditional", pl:"Instrukcja warunkowa sprawdzająca np. istnienie pliku",
      desc:"-f sprawdza plik, -d katalog, -x czy plik jest wykonywalny — częste w skryptach automatyzujących.",
      example:"if [ -f wynik.txt ]; then cat wynik.txt; fi" },
    { cmd:"chmod +x skrypt.sh", en:"executable bit", pl:"Nadaj skryptowi prawo wykonywania",
      desc:"Bez tego uruchomisz skrypt tylko przez 'bash skrypt.sh', a nie bezpośrednio './skrypt.sh'.",
      example:"chmod +x skrypt.sh && ./skrypt.sh" },
    { cmd:"crontab -e", en:"cron table (edit)", pl:"Edytuj harmonogram cyklicznych zadań bieżącego użytkownika",
      desc:"Format: minuta godzina dzień_miesiąca miesiąc dzień_tygodnia polecenie.",
      example:"0 2 * * * /home/anna/skanuj.sh  # codziennie o 2:00" },
    { cmd:"crontab -l", en:"cron table (list)", pl:"Wyświetl aktualnie zaplanowane zadania cron",
      desc:"Szybki sposób weryfikacji, co jest zaplanowane na danym koncie — istotne też przy audycie bezpieczeństwa.",
      example:"crontab -l" }
  ],
  quiz1: [
    { q:"Co oznacza linia #!/bin/bash na początku skryptu?",
      options:["Komentarz bez znaczenia","Wskazuje interpreter, którym system uruchomi skrypt","Kończy skrypt","Importuje bibliotekę bash"], correct:1,
      exp:"To tzw. shebang — wskazuje, jaki program ma wykonać resztę pliku." },
    { q:"Które polecenie nada skryptowi skrypt.sh prawo wykonywania?",
      options:["chmod +x skrypt.sh","chown +x skrypt.sh","bash +x skrypt.sh","sudo skrypt.sh +x"], correct:0,
      exp:"chmod +x dodaje bit wykonywalności (execute)." },
    { q:"Jak zaplanować w cron zadanie uruchamiane codziennie o 2:00 w nocy?",
      options:["0 2 * * * /skrypt.sh","2 0 * * * /skrypt.sh","* 2 0 * * /skrypt.sh","02:00 daily /skrypt.sh"], correct:0,
      exp:"Format crona: minuta godzina dzień miesiąc dzień_tygodnia — '0 2 * * *' to 2:00 codziennie." },
    { q:"Które polecenie wyświetli aktualnie zaplanowane zadania cron bieżącego użytkownika?",
      options:["crontab -l","cron -list","crontab -e --show","cat /etc/cron"], correct:0,
      exp:"crontab -l listuje zaplanowane zadania." }
  ],
  quiz2: [
    { q:"Wpisz komendę nadającą skryptowi skaner.sh prawo wykonywania.",
      answers:["chmod +x skaner.sh"], hint:"chmod +x <plik>", exp:"chmod +x skaner.sh." },
    { q:"Wpisz komendę wyświetlającą aktualną listę zaplanowanych zadań cron.",
      answers:["crontab -l"], hint:"crontab -<flaga>", exp:"crontab -l." }
  ]
},
// ============================================================
{
  id: "firewall",
  title: "Firewall",
  subtitle: "iptables, ufw, nftables",
  icon: "🧱",
  lesson: [
    { cmd:"iptables -L -n -v", en:"IP tables (list)", pl:"Wyświetl aktualne reguły firewalla iptables",
      desc:"-L listuje reguły, -n bez rozwiązywania DNS, -v szczegóły (liczniki pakietów/bajtów).",
      example:"sudo iptables -L -n -v" },
    { cmd:"iptables -A INPUT -p tcp --dport 22 -j ACCEPT", en:"append rule", pl:"Dodaj regułę zezwalającą na ruch TCP na port 22 (SSH)",
      desc:"-A dodaje regułę na koniec łańcucha, -p protokół, --dport port docelowy, -j akcja (ACCEPT/DROP/REJECT).",
      example:"sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT" },
    { cmd:"iptables -A INPUT -j DROP", en:"drop rule", pl:"Domyślnie odrzucaj (cicho) cały pozostały ruch przychodzący",
      desc:"Zwykle umieszcza się na końcu łańcucha jako reguła 'domyślnie odmów' po wcześniejszych ACCEPT.",
      example:"sudo iptables -A INPUT -j DROP" },
    { cmd:"ufw enable / ufw allow", en:"Uncomplicated Firewall", pl:"Prostszy interfejs do zarządzania firewallem (nakładka na iptables)",
      desc:"ufw allow 22/tcp jest dużo czytelniejsze niż odpowiadająca mu reguła iptables.",
      example:"sudo ufw allow 22/tcp && sudo ufw enable" },
    { cmd:"nft list ruleset", en:"nftables (list)", pl:"Wyświetl reguły nowszego systemu firewalla nftables",
      desc:"nftables to następca iptables w nowoczesnych dystrybucjach, z bardziej elastyczną składnią.",
      example:"sudo nft list ruleset" }
  ],
  quiz1: [
    { q:"Które polecenie wyświetli aktualne reguły iptables wraz z licznikami, bez rozwiązywania DNS?",
      options:["iptables -L -n -v","iptables show","iptables --rules","ufw status -v"], correct:0,
      exp:"-L listuje, -n pomija DNS, -v pokazuje szczegóły." },
    { q:"Która reguła iptables zezwoli na ruch TCP przychodzący na port 22 (SSH)?",
      options:["iptables -A INPUT -p tcp --dport 22 -j ACCEPT","iptables -A INPUT -p tcp --sport 22 -j DROP","iptables -D INPUT --port 22","iptables allow 22/tcp"], correct:0,
      exp:"-A INPUT -p tcp --dport 22 -j ACCEPT dodaje regułę zezwalającą na port docelowy 22." },
    { q:"Które polecenie to najprostszy sposób zezwolenia na port 22/tcp za pomocą ufw?",
      options:["ufw allow 22/tcp","ufw -A 22/tcp","ufw accept port=22","iptables ufw 22"], correct:0,
      exp:"ufw allow 22/tcp to czytelna składnia UFW." },
    { q:"Jaka jest rola reguły 'iptables -A INPUT -j DROP' umieszczonej na końcu łańcucha?",
      options:["Zezwala na cały ruch","Domyślnie odrzuca cały pozostały ruch przychodzący, który nie pasował do wcześniejszych reguł","Kasuje wszystkie reguły","Włącza NAT"], correct:1,
      exp:"To typowa reguła 'default deny' zamykająca łańcuch INPUT." }
  ],
  quiz2: [
    { q:"Wpisz komendę wyświetlającą aktualne reguły iptables z licznikami, bez rozwiązywania DNS.",
      answers:["iptables -L -n -v"], hint:"iptables -L -n -v", exp:"iptables -L -n -v." },
    { q:"Wpisz komendę ufw zezwalającą na ruch na porcie 22/tcp.",
      answers:["ufw allow 22/tcp","sudo ufw allow 22/tcp"], hint:"ufw allow <port>/tcp", exp:"ufw allow 22/tcp." }
  ]
}
]; // KONIEC CATEGORIES

/* ============================================================
   AUTO-UZUPEŁNIANIE TESTÓW
   Cel: (1) każda kategoria testuje WSZYSTKIE komendy z lekcji,
        nie tylko podzbiór; (2) dodatkowy, trzeci test — bez
        podpowiedzi, trzeba wpisać wszystko samodzielnie.
   Ręcznie napisane pytania (powyżej) zostają jako "rdzeń" —
   dopisujemy tylko brakujące pozycje, żeby uniknąć dziur
   w pokryciu materiału i nadmiarowych duplikatów.
   ============================================================ */

function _firstLine(example) {
  return String(example).split('\n')[0].trim();
}
function _firstToken(cmdLike) {
  const line = _firstLine(cmdLike);
  const m = line.match(/^\S+/);
  return (m ? m[0] : line).toLowerCase();
}
function _shuffleDeterministic(arr, seed) {
  // Prosty, deterministyczny "tasowany" porządek (bez Math.random) —
  // ten sam wynik przy każdym uruchomieniu aplikacji.
  const out = arr.slice();
  let s = seed + 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function _autoMcq(cat, item, idx) {
  const correctCmd = _firstLine(item.example);
  const otherCmds = cat.lesson
    .filter((l, i) => i !== idx)
    .map(l => _firstLine(l.example))
    .filter(c => c && c !== correctCmd);
  const distractors = _shuffleDeterministic(otherCmds, idx).slice(0, 3);
  while (distractors.length < 3) distractors.push(correctCmd + ' --pomocnicza-opcja');
  const options = _shuffleDeterministic([correctCmd, ...distractors], idx + 7);
  return {
    q: `Która komenda pozwala: ${item.pl.toLowerCase()}?`,
    options,
    correct: options.indexOf(correctCmd),
    exp: item.desc,
    auto: true
  };
}

function _autoType(item, withHint) {
  return {
    q: `Wpisz komendę, która pozwala: ${item.pl.toLowerCase()}.`,
    answers: [_firstLine(item.example)],
    hint: withHint ? (item.cmd + ' — ' + item.en) : undefined,
    exp: item.desc,
    auto: true
  };
}

CATEGORIES.forEach((cat) => {
  const q1Covered = new Set(cat.quiz1.map(q => _firstLine(q.options[q.correct]).toLowerCase()));
  const q2Covered = new Set(cat.quiz2.map(q => _firstLine(q.answers[0]).toLowerCase()));

  cat.lesson.forEach((item, idx) => {
    const key = _firstLine(item.example).toLowerCase();
    if (!q1Covered.has(key)) { cat.quiz1.push(_autoMcq(cat, item, idx)); q1Covered.add(key); }
    if (!q2Covered.has(key)) { cat.quiz2.push(_autoType(item, true)); q2Covered.add(key); }
  });

  // Test 3: PEŁNE pokrycie, bez podpowiedzi — trzeba wpisać wszystko samodzielnie.
  cat.quiz3 = cat.lesson.map(item => _autoType(item, false));
});
