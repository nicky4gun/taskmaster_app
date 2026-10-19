## Refleksionsspørgsmål

**Hvordan kunne man forhindre at data bliver væk ved crash?**

Man kan have et sikkert sted at opbare dataene f.eks. en database eller som os en fil. 
Dertil kunne man yderligere have backup at databasen, i tilfælde at ens main databae instans skulle gå ned.

**Hvad ville du gøre anderledes med en database?**

Man ville kunne manupuler med data meget hurtigere end med en json fil man kan bruger insertion og deletion queries. 
Man kunne også have flere brugere på samme tid, og man kunne have en mere struktureret måde at gemme data på.

Ift. selve applikationen ville det være at udskifte filhåndtering i taskService ud med database-kald.

**Hvad sker der, hvis to brugere tilføjer på samme tid?**

Der kan opstå konflikter, hvorved en af brugerne må vente eller hvorved man skal implementere en løsning, der håndterer concurrent updates (f.eks. en form for queue på fil-writes).
Eller man kunne måske lave en ny json fil for hver bruger, og så merge dem sammen når de er færdige med at tilføje deres data.

**Hvordan kunne man udvide med status, redigering eller deadlines?**
- Man kunne tilføje et statusfelt til hver opgave, som kunne være "ikke startet", "i gang" eller "færdig". Dette ville give brugerne mulighed for at se, hvor langt de er med deres opgaver.
- Man kunne også tilføje en redigeringsfunktion, hvor brugerne kan ændre deres opgaver, hvis de har lavet en fejl eller ønsker at ændre noget. 
- Endelig kunne man tilføje en deadline-funktion, hvor brugerne kan sætte en dato og tid for, hvornår deres opgaver skal være færdige. Dette ville hjælpe brugerne med at holde styr på deres tidsplaner og prioritere deres opgaver bedre.

## brug af ai

vi har kun brug ai til at mappe struktur 