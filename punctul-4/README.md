# Cerinta
```
4. Daca vreo pagina nu se incarca (din orice motiv) reincercati-o. Nu reincercati o pagina de mai mult de X ori. Faceti asta si daca ati reusit sa descarcati deja cateva bucati din pagina si ati intampinat o problema dupa.
```

# Comenzi

## Install
Inainte de toate, va trebuii dat un `npm install`, pentru a instala librariile de care depinde proiectul (`yargs` - folosit pentru a trimite url-ul de start in scriptul de start al aplicatiei, ceva may `fancy`, puteam folosi un `env`, sau ceva).

## Structura
```
npm start -- --url $url --x $x
```
- Unde `$url` trebuie sa fie un URL valid.
- Unde `$x` trebuie sa fie un numar intreg pozitiv.

## Exemplu
```
npm start -- --url https://iclp.imfast.io/tema3.html --x 3
```

## Avertizare
Daca url-ul pe care il trimiteti ca parametru are url-uri catre alte site-uri, iar acelea, au alte url-uri catre altele etc. se poate ca aceasta aplicatie sa ruleze foarte mult, astfel, va propun sa alegeti un url care sa nu aiba o `panza` de url-uri foarte mare.

# Rezolvare

## Cod
Pentru cod, te rog sa verifici [aici](./index.js).

## Algoritm

La fel ca la punctul-3, insa, acum, se adauga pentru fiecare URL cate un numar, care spune de cate ori s-a incercat acel url sa fie citit (`crawled`).

1. S-a implementat o constanta expresie regulata (`regex`) pentru `url`
2. S-a implementat o functie care foloseste constanta de mai sus pentru a verifica daca un `string` este sau nu un `url` valid
3. S-a implementat o functie care foloseste constanta de mai sus pentru a scoate toate url-urile valide dintr-un string dat (content-ul unui url anterior)
4. S-a implementat o functie care foloseste `async`, care creeaza o lista de url-uri, apoi porneste de la un `url` valid (daca acesta nu este valid va arunca o eroare), si citeste folosind `await` content-ul fiecarui url din lista ( **In cazul in care in timpul citirii apare, o eroare, url-ul respectiv este nemarcat, pentru a putea fi citit din nou (pana cand nu depaseste acel x), si pentru fiecare noua incercare de a fi citit un url, se incrementeaza numarul care spune de cate ori s-a incercat citirea**), si pentru fiecare url nou gasit in acest content este adaugat la lista de url-uri doar daca acest url nu exista deja in lista. Aceasta cautare se face folosind un await pe un Promise care se foloseste de un resolve care citeste bucati din content-ul url-ului, bucati care atunci cand ajung la 2000 de caractere sunt sterse din memorie.
5. Programul se opreste fie cand gaseste un url invalid, fie cand toate url-urile din lista de mai sus au fost marcate ca fiind citite.
