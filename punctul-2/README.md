# Cerinta
```
2. Aveti grija sa nu crawlati de 2 ori acelasi url.
```

# Comenzi

## Install
Inainte de toate, va trebuii dat un `npm install`, pentru a instala librariile de care depinde proiectul (`yargs` - folosit pentru a trimite url-ul de start in scriptul de start al aplicatiei, ceva may `fancy`, puteam folosi un `env`, sau ceva).

## Structura
```
npm start -- --url $url
```
Unde `$url` trebuie sa fie un URL valid.

## Exemplu
```
npm start -- --url https://iclp.imfast.io/tema3.html
```

## Avertizare
Daca url-ul pe care il trimiteti ca parametru are url-uri catre alte site-uri, iar acelea, au alte url-uri catre altele etc. se poate ca aceasta aplicatie sa ruleze foarte mult, astfel, va propun sa alegeti un url care sa nu aiba o `panza` de url-uri foarte mare.

# Rezolvare

## Cod
Pentru cod, te rog sa verifici [aici](./index.js).

## Algoritm

La fel ca la punctul-1, insa la pasul 5, se verifica fiecare url ca acesta sa nu existe deja in lista de url-uri (liniile `68`-`81`).

1. S-a implementat o constanta expresie regulata (`regex`) pentru `url`
2. S-a implementat o functie care foloseste constanta de mai sus pentru a verifica daca un `string` este sau nu un `url` valid
3. S-a implementat o functie care foloseste constanta de mai sus pentru a scoate toate url-urile valide dintr-un string dat (content-ul unui url anterior)
4. S-a implementat o functie care foloseste `Promise` pentru a `downloada` content-ul unui url
5. S-a implementat o functie care foloseste `async`, care creeaza o lista de url-uri, apoi porneste de la un `url` valid (daca acesta nu este valid va arunca o eroare), si citeste folosind `await` content-ul fiecarui url din lista, si pentru fiecare url nou gasit in acest content este adaugat la lista de url-uri (**Doar daca acest url nu exista deja in lista**)
6. Programul se opreste fie cand gaseste un url invalid, fie cand toate url-urile din lista de mai sus au fost marcate ca fiind citite.
