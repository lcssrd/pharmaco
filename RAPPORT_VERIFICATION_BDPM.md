# Rapport de vérification des fiches — BDPM

Vérification faite le 25 novembre 2026 sur la branche `beta`, à jour avec `main` (commit `54ec78b`).

## Méthode

- **Ce qui a été relu** : tout le texte des 14 fiches (69 onglets) et les 170 questions de quiz.
- **Source** : la [Base de données publique des médicaments](https://base-donnees-publique.medicaments.gouv.fr/).
  - Fichiers officiels téléchargés le 25/11/2026 : `CIS_bdpm.txt` (spécialités et état de commercialisation), `CIS_COMPO_bdpm.txt` (substances actives) et `CIS_InfoImportantes.txt` (alertes ANSM).
  - Environ 200 noms commerciaux ont été recherchés dans ces fichiers.
  - Les RCP ont été lus pour une quarantaine de points : posologies, contre-indications, délais d'action et interactions. Le numéro CIS de chaque RCP consulté est indiqué dans le tableau.
- **Limites** :
  - Les médicaments à AMM européenne (Leqvio, Circadin, insulines, Cymbalta, Lyrica, etc.) renvoient vers le RCP de l'EMA, qui n'est pas lisible dans la BDPM : ces points sont signalés « RCP européen ».
  - La BDPM ne contient ni recommandations, ni seuils diagnostiques, ni physiologie. Les points de la partie 5 sont donc à faire valider par le relecteur scientifique.
  - La **fiche de synthèse des anticoagulants** (`antico.html:612`) est une image hébergée sur `rehost.diberie.com` : je n'ai pas pu la vérifier. Elle dépend aussi d'un site externe qui peut disparaître.
- Les numéros de ligne renvoient aux fichiers HTML de la branche `beta`.

**Priorité** : **P1** = information fausse ou dangereuse, à corriger ; **P2** = nom commercial absent ou non commercialisé ; **P3** = précision ou nuance à apporter.

---

## 1. Erreurs à corriger en priorité (P1)

| # | Fiche / ligne | Ce que dit le site | Ce que dit la BDPM (RCP) | Correction proposée |
|---|---|---|---|---|
| 1 | `antalgiques.html:241` + quiz n°9 (l. 891) | Paracétamol : max 4 g/j, « 1 g toutes les 6 h » ; le quiz donne 4 g/j comme bonne réponse | Doliprane 1000 mg (CIS 60234100) : **3 g/j**, intervalle **4 h minimum** ; **4 g/j uniquement sur avis médical** | « 1 g par prise, au moins 4 h d'intervalle, 3 g/j max (4 g/j sur avis médical) ». Reformuler le quiz : bonne réponse 3 g/j, ou préciser « sur avis médical » |
| 2 | `antalgiques.html:229` | CI paracétamol : « … alcoolisme chronique » | CI : hypersensibilité, **insuffisance hépatique sévère** seulement. L'alcoolisme chronique impose une dose max de 3 g/j (populations particulières) | Retirer l'alcoolisme des CI et le placer en précaution |
| 3 | `antalgiques.html:381` | Codéine : max 120 mg/j | Klipal (CIS 67869942), Codoliprane (CIS 60904643) : **240 mg/j de codéine** | Corriger : 240 mg/j |
| 4 | `antalgiques.html:369` | CI codéine : < 12 ans, allaitement, insuffisance respiratoire | Ajouter : **asthme** (quel que soit le degré), **métaboliseurs ultra-rapides CYP2D6**, < 18 ans après amygdalectomie. Klipal 600/50 : CI < 15 ans | Compléter |
| 5 | `antalgiques.html:416` | CI tramadol : « Association IMAO/IRS » | Topalgic (CIS 63435884) : CI = **IMAO** (14 j), insuffisance respiratoire sévère, épilepsie non contrôlée, **enfant < 15 ans**, intoxication aiguë alcool/psychotropes. Les **ISRS** ne sont pas une CI : ce sont des interactions (risque de syndrome sérotoninergique) | « CI : IMAO, épilepsie non contrôlée, insuffisance respiratoire sévère. Prudence avec ISRS/IRSN » |
| 6 | `antalgiques.html:322` et 316 | Néfopam : « 120 mg/j (per os ou IV) » ; CI : épilepsie, rétention urinaire, glaucome | Acupan injectable (CIS 62580656) : **120 mg/24 h** IV/IM, **perfusion lente > 15 min**. Acupan comprimé 30 mg (CIS 68943687) : **jusqu'à 6 cp/j = 180 mg/j**. CI : convulsions **ou antécédents**, rétention urinaire **liée à des troubles urétroprostatiques**, glaucome **par fermeture de l'angle**, **enfant < 15 ans** | Distinguer IV/IM (120 mg/j) et per os (180 mg/j) ; préciser les CI |
| 7 | `antalgiques.html:282` | Ibuprofène : 1,2–1,8 g/j | Advil 400 (CIS 63646874), Ibuprofène Arrow 400 (CIS 67539962) : **max 1 200 mg/j** ; durée 3 j (fièvre) à 5 j (douleur) en automédication | « 1 200 mg/j » |
| 8 | `antalgiques.html:276` | CI AINS : « grossesse T3 » | Advil (CIS 63646874) : **à partir du début du 6e mois (24 SA)**. La fiche anti-inflammatoires dit déjà « dès le 6e mois » : les deux fiches se contredisent | « Grossesse à partir de 24 SA » sur les deux fiches |
| 9 | `psychotropes.html:281` + quiz n°8 (l. 374) | Lithium : « CI : insuffisance rénale, régime sans sel, diurétiques, AINS » ; le quiz dit que l'ibuprofène est « formellement contre-indiqué » | Téralithe (CIS 62124478), 4.3 : allaitement, insuffisance rénale (sans surveillance stricte possible), **insuffisance cardiaque**, maladie d'Addison, syndrome de Brugada. 4.5 : AINS, diurétiques et IEC sont des **associations déconseillées** (pas des CI) ; éviter les variations d'apport sodé | Séparer CI et associations déconseillées ; remplacer « formellement contre-indiqué » par « déconseillé » dans le quiz |
| 10 | `antidiabetiques.html:445` (quiz n°10) | « Tous les antidiabétiques oraux sont contre-indiqués pendant la grossesse » | Glucophage (CIS 61052830), 4.6 : la metformine **peut être envisagée pendant la grossesse** quand c'est cliniquement justifié (appoint ou alternative à l'insuline) | Reformuler : « L'insuline est le traitement de référence pendant la grossesse » |
| 11 | `hypolipemiants.html:267` + quiz n°7 (l. 459) | Statines : « 1 comprimé le soir » ; quiz : bonne réponse « le soir au coucher » | Tahor (CIS 67143532) : **à n'importe quel moment de la journée**. Zocor (CIS 67037301) : le soir. Le soir n'est donc vrai que pour la simvastatine | « Atorvastatine et rosuvastatine : à heure fixe, quel que soit le moment ; simvastatine : le soir ». Corriger le quiz |
| 12 | `hypolipemiants.html:290` | Leqvio® (inclisiran) mis avec les anti-PCSK9 : « injection toutes les 2 à 4 semaines », auto-injection | RCP européen : l'inclisiran est un **petit ARN interférent** (pas un anticorps). Il est **injecté par un professionnel de santé à J0, M3, puis tous les 6 mois** | Lui consacrer une ligne à part |
| 13 | `antico.html:653` (quiz n°14) | « TP cible sous warfarine ≈ 35 % » | Le suivi des AVK se fait par l'**INR** (RCP Coumadine) ; le TP ne sert pas à suivre un AVK | Supprimer la question ou la remplacer par l'INR cible |
| 14 | `asthme.html:84` | « Alimémazine (Toplexil®) » | Toplexil = **oxomémazine** (CIS 62982231). L'alimémazine, c'est **Théralène®** (CIS 66801066) | « Oxomémazine (Toplexil®) » ou « Alimémazine (Théralène®) » |
| 15 | `antiinflam.html:408` (quiz n°1) | « Selon la **triade** de Celse… » avec 4 signes | Celse décrit 4 signes (*rubor, calor, tumor, dolor*) : c'est une **tétrade** | « Tétrade de Celse » |

## 2. Noms commerciaux absents de la BDPM ou non commercialisés (P2)

Tous les autres noms cités sur le site existent bien dans la BDPM, sont commercialisés et correspondent à la bonne DCI.

| Fiche / ligne | Cité sur le site | Constat BDPM | Remplacer par |
|---|---|---|---|
| `antico.html:444-445` | Edoxaban (Lixiana®) | **Aucune spécialité à l'édoxaban** dans la BDPM | Retirer (le mécanisme ne cite d'ailleurs que rivaroxaban et apixaban) |
| `antico.html:519` | Fluindione (Préviscan®) | Commercialisé, mais l'indication est limitée au **renouvellement d'un traitement équilibré** : ne doit plus être prescrit à l'initiation (risque immuno-allergique) | Ajouter cette mention |
| `antihta.html:156` | Captopril (Lopril®) | Lopril absent | Captopril (génériques : Captopril Biogaran, EG…) |
| `antihta.html:234` | Aliskiren | **Aucune spécialité** à l'aliskiren dans la BDPM | Retirer, ou préciser « non disponible en France » |
| `antihta.html:257` | Monotildiem® | Le nom exact est **Mono Tildiem® LP** | Corriger l'orthographe |
| `antihta.html:297`, `anxiolytiques.html:205` et 332 (quiz) | Avlocardyl® (propranolol) | Avlocardyl absent | Propranolol (génériques) ; forme injectable : Karnodyl® |
| `antiinflam.html:294` | Dexaméthasone (Decadron®) | Decadron absent (nom américain) | Dectancyl® ou Néofordex® |
| `anxiolytiques.html:122` | Noctamide® (lormétazépam) | Noctamide absent | Lormétazépam (générique Arrow) |
| `anxiolytiques.html:141` et 310, `psychotropes.html:205` et 347 | Flumazénil (Anexate®) | Anexate absent | Flumazénil (génériques Hikma, Viatris) |
| `antalgiques.html:641`, `psychotropes.html:130` | Duloxétine (Cymbalta®) | Cymbalta **non commercialisé** | Duloxétine (génériques) |
| `asthme.html:95` | Loratadine (Clarityne®) | Clarityne absent | Loratadine (génériques) |
| `digestif.html:82` | « Pantoprazole® » | Le pantoprazole est une DCI, pas une marque | Pantoprazole (Inipomp®, Eupantol®) |
| `digestif.html:91` | « Famotidine® » | DCI, pas une marque. Seul le générique Famotidine EG existe | « Famotidine » sans ® |
| `digestif.html:126` et 240 | Métoclopramide (Primpéran®) | Primpéran n'est plus commercialisé que sous forme **injectable** ; les comprimés sont des génériques | Garder le nom en précisant ; voir aussi le point 3.5 |
| `digestif.html:169` et 243 | Lopéramide (Imodium®) | Imodium 2 mg gélule **non commercialisé** | Imodiumcaps® ou Imodiumlingual® |
| `antiarythm.html:338` | « Digoxine® », « Hemigoxine® » | Noms exacts : Digoxine Nativelle®, Hémigoxine Nativelle® | Corriger |
| `antico.html:194` | « Acide acétylsalicylique — Kardegic® » | Kardegic contient de l'**acétylsalicylate de DL-lysine** | Facultatif : préciser |

## 3. Précisions tirées des RCP (P3)

1. **Benzodiazépines anxiolytiques** (`anxiolytiques.html`) : la limite de 12 semaines est juste (Temesta, Valium, Lexomil : 8 à 12 semaines, sevrage compris). Le RCP de **Xanax®** (CIS 69847791), cité en exemple, est plus strict : **2 à 4 semaines maximum**. À signaler.
2. **IEC et ARA II** (`antihta.html:174` et 222) : « contre-indiqués pendant la grossesse » est trop large. Renitec (CIS 68128273) et Tareg (CIS 61823653) : **CI aux 2e et 3e trimestres**, **déconseillés au 1er**.
3. **LABA et bêtabloquants** (`asthme.html:131`) : « contre-indiqués avec les bêtabloquants non sélectifs » n'est pas la formulation du RCP. Serevent (CIS 67274478) : les bêtabloquants, **sélectifs ou non**, « doivent être évités, sauf nécessité absolue ».
4. **Questran®** (`hypolipemiants.html:334` + quiz n°4 et 14) : RCP (CIS 65691327) : prendre les autres médicaments **1 à 2 h avant ou 4 h après**. Le Questran se prend **au moment des repas**, pas « avant les repas ».
5. **Métoclopramide** (`digestif.html:126`) : préciser **5 jours maximum**, **30 mg/j (0,5 mg/kg/j)** et **CI avant 1 an** (CIS 63177843).
6. **Paracétamol IV** (quiz n°19, `antalgiques.html:951`) : RCP (CIS 64454154) : début de l'effet en **5 à 10 min**, pic à 1 h. La réponse « 10 à 15 minutes » est à ajuster (le texte de la fiche, « 10 min », est correct).
7. **Amiodarone IV** (`antiarythm.html`) : RCP (CIS 62305927) : **voie veineuse centrale**, sauf réanimation d'un arrêt cardiaque. À ajouter à « uniquement dans du sérum glucosé ».
8. **Digoxine** : les CI citées (calcium IV, millepertuis) sont justes, mais le RCP (CIS 67681303) contre-indique aussi : **BAV 2e et 3e degrés non appareillés, hypokaliémie non corrigée, TV/FV, WPW**. À compléter si besoin.
9. **Lithium** : lithiémie de 0,5 à 0,8 mEq/L correcte pour Téralithe 250. Pour **Téralithe LP 400**, la cible du dosage du matin est de **0,8 à 1,2 mEq/L**. « À jeun » n'est pas dans le RCP.
10. **AOD** (`antico.html`) : sans l'édoxaban, la liste se limite à rivaroxaban, apixaban et dabigatran.
11. **Activité anti-Xa des HBPM** (« 0,6–1,0 UI/mL ») : cette fourchette n'apparaît pas dans le RCP de Lovenox, qui ne prévoit le dosage qu'en cas d'insuffisance rénale. **Non vérifié** : à valider par le relecteur. La fourchette de l'HNF (anti-Xa 0,2–0,6 ; TCA 1,5 à 3 fois le témoin) est conforme (CIS 64395923).

## 4. Alertes ANSM en cours sur des médicaments cités (facultatif)

Ces alertes viennent du fichier `CIS_InfoImportantes` de la BDPM. Les ajouter rendrait les fiches plus actuelles :

- **Tramadol et codéine** : **ordonnance sécurisée obligatoire depuis le 1er mars 2025** (`antalgiques.html`).
- **AINS** : risque de complications infectieuses graves ; éviter l'ibuprofène et le kétoprofène en première intention en cas d'infection hivernale (12/2025) ; AINS et grossesse (04/2025).
- **Prégabaline** : risque de malformations confirmé en cas d'exposition pendant la grossesse (`antalgiques.html`, co-analgésiques).
- **Valproate** : risque de troubles neurodéveloppementaux chez l'enfant quand **le père** a été traité dans les 3 mois avant la conception (2023) (`psychotropes.html`).
- **Neuroleptiques** : vigilance sur la **constipation** (06/2026). **Clozapine** : surveillance de la formule leucocytaire mise à jour (09/2025).
- **Escitalopram** : allongement du QT dose-dépendant. **Ondansétron** : à éviter au 1er trimestre de grossesse.
- **Dapagliflozine et autres gliflozines** : acidocétose et gangrène de Fournier (`antidiabetiques.html`, SGLT2).

## 5. Points hors BDPM à faire valider par le relecteur

Ces points ne peuvent pas se vérifier dans la BDPM, mais ils semblent inexacts ou dépassés au regard des référentiels habituels (OMS, HAS, ESC, GINA) :

1. **HbA1c diagnostique** (`antidiabetiques.html:109`) : « diabète si ≥ 7 % ». Le seuil OMS est **≥ 6,5 %** ; 7 % est l'objectif de suivi.
2. **Seuil d'hypoglycémie incohérent** dans la même fiche : « < 0,6 g/L » (l. 168) et « < 0,70 g/L » (l. 327). Le seuil habituel est **< 0,70 g/L**.
3. **Nombre de propriétés des BZD** : 5 dans `anxiolytiques.html`, 4 dans `psychotropes.html:185` (il manque « amnésiante »). À harmoniser.
4. **Biothérapies** (`immunosuppresseurs.html:263`) : « traitement d'induction en greffe » pour les anti-TNF et le rituximab, ce qui est discutable. L'induction utilise plutôt le basiliximab ou les sérums antilymphocytaires.
5. **Neuroleptiques** (`psychotropes.html:252`) : « impatiences (dyskinésies) ». Les impatiences, c'est l'**akathisie** ; les dyskinésies sont un autre effet.
6. **Classification ESC 2024** (`antihta.html:76`) : la PA « non élevée » est **< 120/70** (et non ≤).
7. **SCORE** (`hypolipemiants.html:190`) : l'ESC a remplacé SCORE par **SCORE2 / SCORE2-OP** en 2021.
8. **Asthme** : depuis GINA 2019, un SABA seul n'est plus recommandé. Le traitement de secours préféré est l'association corticoïde inhalé + formotérol à la demande. À nuancer si le cours IFSI le permet.

## 6. Vérifié et conforme

- **Noms commerciaux et DCI** : environ 180 sont exacts et commercialisés, notamment Doliprane, Dafalgan, Advil, Nurofen, Profénid (200 mg/j max, conforme), Acupan, Klipal, Codoliprane, Topalgic (400 mg/j, conforme), Ixprim, Skenan, Actiskenan, Durogesic, Actiq, Oxycontin, Oxynorm, Narcan, Neurontin (3 600 mg/j, conforme), Lyrica, Laroxyl (150 mg/j, conforme), Serecor, Rythmodan, Xylocard, Dilantin (indication « intoxication digitalique » conforme), Flécaïne (dilution dans du glucosé, conforme), Rythmol, Cordarone, Sotalex, Isoptine, Tildiem, Kardegic, Plavix, Efient, Brilique, Calciparine, Lovenox, Innohep, Fragmine, Xarelto, Eliquis, Pradaxa, Coumadine, Sintrom, Novorapid, Humalog, Apidra, Insulatard, Umuline NPH, Lantus, Levemir, Toujeo, Glucophage, Diamicron, Novonorm, Januvia, Invokana, Triatec, Coversyl, Renitec, Cozaar, Tareg, Aprovel, Atacand, Entresto, Amlor, Lercan, Lopressor, Cardensiel, Ténormine, Esidrex, Lasilix, Aldactone, Voltarène, Cortancyl, Solupred, Xanax, Temesta, Valium, Havlane, Stilnox (4 semaines, conforme), Imovane, Atarax, Donormyl, Circadin, Polaramine, Zyrtec, Aerius, Xyzall, Ventoline, Bricanyl, Serevent, Foradil, Becotide, Pulmicort, Flixotide, Symbicort, Seretide, Solumédrol, Atrovent, Spiriva, Xolair, Nucala, Dupixent, Singulair, Maalox, Gaviscon, Smecta, Zophren, Forlax, Dulcolax, Tiorfan, Tahor, Crestor, Zocor, Ezetrol, Praluent, Repatha, Lipanthyl, Befizal, Nilemdo, Questran, Neoral, Prograf, Imurel, Cellcept, Rapamune, Certican, Remicade, Humira, Mabthera, Deroxat, Zoloft, Seroplex, Effexor, Anafranil, Haldol, Tercian, Loxapac, Zyprexa, Risperdal, Leponex, Lepticur, Téralithe, Dépakine, Dépakote, Lamictal, Tégrétol, Seresta, Lexomil, Spasfon.
- **Points RCP conformes** : antidotes (N-acétylcystéine, naloxone, protamine, vitamine K, flumazénil), INR cible de 2 à 3, TCA de l'HNF, metformine contre-indiquée en cas d'insuffisance rénale sévère, amiodarone uniquement dans du sérum glucosé, hypnotiques limités à 4 semaines, anxiolytiques à 12 semaines (hors Xanax).
