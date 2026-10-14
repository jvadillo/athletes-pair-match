import { Language } from '@/contexts/LanguageContext';

type Localized = Record<Language, string>;

export type AthleteSource = {
  label: string;
  url: string;
};

export type AthleteProfile = {
  personKey: string;
  emoji: string;
  color: string;
  sport: Localized;
  born: Localized;
  achievements: Localized[];
  funFact: Localized;
  today: Localized;
  inspiration: Localized;
  sources: AthleteSource[];
};

// Data reviewed in October 2026 from the sources listed in each profile
export const ATHLETE_PROFILES: AthleteProfile[] = [
  {
    personKey: 'aitana_bonmati',
    emoji: '⚽',
    color: '#9334ea',
    sport: {
      en: 'Football',
      es: 'Fútbol',
      eu: 'Futbola',
      ca: 'Futbol',
      gl: 'Fútbol'
    },
    born: {
      en: 'Born in 1998 · Grew up in Sant Pere de Ribes (Barcelona)',
      es: 'Nacida en 1998 · Creció en Sant Pere de Ribes (Barcelona)',
      eu: '1998an jaioa · Sant Pere de Ribesen (Bartzelona) hazi zen',
      ca: 'Nascuda el 1998 · Va créixer a Sant Pere de Ribes (Barcelona)',
      gl: 'Nada en 1998 · Medrou en Sant Pere de Ribes (Barcelona)'
    },
    achievements: [
      {
        en: '3 Ballon d\'Or awards in a row (2023, 2024 and 2025): the first female footballer ever to win it three times',
        es: '3 Balones de Oro seguidos (2023, 2024 y 2025): la primera futbolista de la historia en ganarlo tres veces',
        eu: '3 Urrezko Baloi jarraian (2023, 2024 eta 2025): hiru aldiz irabazi duen historiako lehen futbolaria',
        ca: '3 Pilotes d\'Or seguides (2023, 2024 i 2025): la primera futbolista de la història a guanyar-la tres vegades',
        gl: '3 Balóns de Ouro seguidos (2023, 2024 e 2025): a primeira futbolista da historia en gañalo tres veces'
      },
      {
        en: 'World Champion with Spain in 2023 and best player of the tournament',
        es: 'Campeona del Mundo con España en 2023 y mejor jugadora del torneo',
        eu: 'Munduko txapelduna Espainiarekin 2023an eta txapelketako jokalari onena',
        ca: 'Campiona del Món amb Espanya el 2023 i millor jugadora del torneig',
        gl: 'Campioa do Mundo con España en 2023 e mellor xogadora do torneo'
      },
      {
        en: '3 FIFA The Best awards (2023, 2024 and 2025)',
        es: '3 premios The Best de la FIFA (2023, 2024 y 2025)',
        eu: 'FIFAren 3 The Best sari (2023, 2024 eta 2025)',
        ca: '3 premis The Best de la FIFA (2023, 2024 i 2025)',
        gl: '3 premios The Best da FIFA (2023, 2024 e 2025)'
      },
      {
        en: '4 Champions League titles (2021, 2023, 2024 and 2026) and 7 league titles with FC Barcelona',
        es: '4 Champions League (2021, 2023, 2024 y 2026) y 7 Ligas con el FC Barcelona',
        eu: '4 Txapeldunen Liga (2021, 2023, 2024 eta 2026) eta 7 Liga FC Bartzelonarekin',
        ca: '4 Champions League (2021, 2023, 2024 i 2026) i 7 Lligues amb el FC Barcelona',
        gl: '4 Champions League (2021, 2023, 2024 e 2026) e 7 Ligas co FC Barcelona'
      },
      {
        en: 'Best player of Euro 2025',
        es: 'Mejor jugadora de la Eurocopa 2025',
        eu: '2025eko Eurokopako jokalari onena',
        ca: 'Millor jugadora de l\'Eurocopa 2025',
        gl: 'Mellor xogadora da Eurocopa 2025'
      }
    ],
    funFact: {
      en: 'As a child she was the only girl among some 400 boys at her first club, CD Ribes. Some teased her for being small, but she says playing with boys made her stronger and more intense. She also has a degree in Sports Science.',
      es: 'De pequeña era la única niña entre unos 400 niños en su primer club, el CD Ribes. Algunos se burlaban de su estatura, pero ella dice que jugar con chicos la hizo más fuerte e intensa. Además, es graduada en Ciencias de la Actividad Física y del Deporte.',
      eu: 'Txikitan, 400 bat mutilen artean neska bakarra zen bere lehen klubean, CD Ribesen. Batzuek bere altueragatik iseka egiten zioten, baina berak dio mutilekin jokatzeak indartsuago eta biziago egin zuela. Gainera, Jarduera Fisikoaren eta Kirolaren Zientzietan graduatua da.',
      ca: 'De petita era l\'única nena entre uns 400 nens al seu primer club, el CD Ribes. Alguns es burlaven de la seva estatura, però ella diu que jugar amb nois la va fer més forta i intensa. A més, és graduada en Ciències de l\'Activitat Física i de l\'Esport.',
      gl: 'De pequena era a única nena entre uns 400 nenos no seu primeiro club, o CD Ribes. Algúns burlábanse da súa estatura, pero ela di que xogar con rapaces a fixo máis forte e intensa. Ademais, é graduada en Ciencias da Actividade Física e do Deporte.'
    },
    today: {
      en: 'In November 2025 she broke her fibula, the first serious injury of her career. After months of recovery she came back to play and lifted the 2026 Champions League with Barça.',
      es: 'En noviembre de 2025 se rompió el peroné, la primera lesión grave de su carrera. Tras meses de recuperación volvió a jugar y levantó la Champions League de 2026 con el Barça.',
      eu: '2025eko azaroan peronea hautsi zuen, bere ibilbideko lehen lesio larria. Hilabeteetako errekuperazioaren ondoren, berriro jokatzera itzuli eta 2026ko Txapeldunen Liga altxatu zuen Barçarekin.',
      ca: 'El novembre de 2025 es va trencar el peroné, la primera lesió greu de la seva carrera. Després de mesos de recuperació va tornar a jugar i va aixecar la Champions League de 2026 amb el Barça.',
      gl: 'En novembro de 2025 rompeu o peroné, a primeira lesión grave da súa carreira. Tras meses de recuperación volveu xogar e levantou a Champions League de 2026 co Barça.'
    },
    inspiration: {
      en: 'She was never the tallest or the strongest: she reached the top with talent, intelligence and lots of hard work. Your way of playing has a place too!',
      es: 'Nunca fue la más alta ni la más fuerte: llegó a lo más alto con talento, inteligencia y muchísimo trabajo. ¡Tu forma de jugar también tiene su sitio!',
      eu: 'Ez zen inoiz altuena ezta indartsuena ere: talentuarekin, adimenarekin eta lan handiarekin iritsi zen gorenera. Zure jokatzeko moduak ere badu bere lekua!',
      ca: 'Mai va ser la més alta ni la més forta: va arribar al cim amb talent, intel·ligència i moltíssima feina. La teva manera de jugar també té el seu lloc!',
      gl: 'Nunca foi a máis alta nin a máis forte: chegou ao máis alto con talento, intelixencia e moitísimo traballo. A túa forma de xogar tamén ten o seu sitio!'
    },
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Aitana_Bonmat%C3%AD' },
      { label: 'Olympics.com', url: 'https://www.olympics.com/en/news/aitana-bonmati-ballon-dor-football-carving-own-legacy' },
      { label: 'ESPN', url: 'https://espndeportes.espn.com/futbol/nota/_/id/14370789/aitana-bonmati-barcelona-gano-balon-de-oro-femenino-mejor-jugadora-del-mundo' }
    ]
  },
  {
    personKey: 'carolina_marin',
    emoji: '🏸',
    color: '#33C3F0',
    sport: {
      en: 'Badminton',
      es: 'Bádminton',
      eu: 'Badmintona',
      ca: 'Bàdminton',
      gl: 'Bádminton'
    },
    born: {
      en: 'Born in 1993 in Huelva',
      es: 'Nacida en 1993 en Huelva',
      eu: '1993an jaioa Huelvan',
      ca: 'Nascuda el 1993 a Huelva',
      gl: 'Nada en 1993 en Huelva'
    },
    achievements: [
      {
        en: 'Olympic champion at Rio 2016: the first non-Asian woman to win Olympic gold in singles badminton',
        es: 'Campeona olímpica en Río 2016: la primera mujer no asiática en ganar el oro olímpico de bádminton individual',
        eu: 'Olinpiar txapelduna Rio 2016an: banakako badmintonean urrezko domina olinpikoa irabazi zuen Asiaz kanpoko lehen emakumea',
        ca: 'Campiona olímpica a Rio 2016: la primera dona no asiàtica a guanyar l\'or olímpic de bàdminton individual',
        gl: 'Campioa olímpica en Río 2016: a primeira muller non asiática en gañar o ouro olímpico de bádminton individual'
      },
      {
        en: '3-time World Champion (2014, 2015 and 2018)',
        es: '3 veces campeona del mundo (2014, 2015 y 2018)',
        eu: '3 aldiz munduko txapelduna (2014, 2015 eta 2018)',
        ca: '3 vegades campiona del món (2014, 2015 i 2018)',
        gl: '3 veces campioa do mundo (2014, 2015 e 2018)'
      },
      {
        en: '7-time European Champion',
        es: '7 veces campeona de Europa',
        eu: '7 aldiz Europako txapelduna',
        ca: '7 vegades campiona d\'Europa',
        gl: '7 veces campioa de Europa'
      },
      {
        en: 'Princess of Asturias Award for Sports 2024',
        es: 'Premio Princesa de Asturias de los Deportes 2024',
        eu: 'Asturiasko Printzesa Kirol Saria 2024',
        ca: 'Premi Princesa d\'Astúries dels Esports 2024',
        gl: 'Premio Princesa de Asturias dos Deportes 2024'
      }
    ],
    funFact: {
      en: 'As a little girl she danced flamenco. At 8, a friend took her to try badminton, a sport almost unknown in Spain at the time, and she fell in love with it. Her motto: "I can because I think I can".',
      es: 'De niña bailaba flamenco. A los 8 años una amiga la llevó a probar el bádminton, un deporte casi desconocido entonces en España, y se enamoró de él. Su lema: «Puedo porque pienso que puedo».',
      eu: 'Txikitan flamenkoa dantzatzen zuen. 8 urterekin lagun batek badmintona probatzera eraman zuen, garai hartan Espainian ia ezezaguna zen kirola, eta maitemindu egin zen. Bere leloa: «Ahal dut, ahal dudala uste dudalako».',
      ca: 'De petita ballava flamenc. Als 8 anys una amiga la va portar a provar el bàdminton, un esport gairebé desconegut aleshores a Espanya, i se\'n va enamorar. El seu lema: «Puc perquè penso que puc».',
      gl: 'De nena bailaba flamenco. Aos 8 anos unha amiga levouna a probar o bádminton, un deporte case descoñecido entón en España, e namorouse del. O seu lema: «Podo porque penso que podo».'
    },
    today: {
      en: 'After several serious knee injuries, she retired in March 2026. A sports arena in Huelva bears her name.',
      es: 'Tras varias lesiones graves de rodilla, se retiró en marzo de 2026. En Huelva, un pabellón deportivo lleva su nombre.',
      eu: 'Belauneko hainbat lesio larriren ondoren, 2026ko martxoan erretiratu zen. Huelvan, kiroldegi batek bere izena darama.',
      ca: 'Després de diverses lesions greus de genoll, es va retirar el març de 2026. A Huelva, un pavelló esportiu porta el seu nom.',
      gl: 'Tras varias lesións graves de xeonllo, retirouse en marzo de 2026. En Huelva, un pavillón deportivo leva o seu nome.'
    },
    inspiration: {
      en: 'She got back up again and again after very tough injuries. Her example shows that perseverance and believing in yourself can overcome anything.',
      es: 'Se levantó una y otra vez tras lesiones muy duras. Su ejemplo demuestra que la constancia y creer en una misma pueden con todo.',
      eu: 'Behin eta berriz altxatu zen lesio oso gogorren ondoren. Bere adibideak erakusten du iraunkortasunak eta norberarengan sinesteak dena gaindi dezaketela.',
      ca: 'Es va aixecar una vegada i una altra després de lesions molt dures. El seu exemple demostra que la constància i creure en una mateixa poden amb tot.',
      gl: 'Levantouse unha e outra vez tras lesións moi duras. O seu exemplo demostra que a constancia e crer nunha mesma poden con todo.'
    },
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Carolina_Mar%C3%ADn' },
      { label: 'AP / AOL', url: 'https://www.aol.com/articles/olympic-world-badminton-champion-carolina-144157316.html' },
      { label: 'Diari de Tarragona', url: 'https://www.diaridetarragona.com/deportes/polideportivo/255856/carolina-marin-retirada-leyenda-eterna.html' }
    ]
  },
  {
    personKey: 'edurne_pasaban',
    emoji: '🏔️',
    color: '#4ade80',
    sport: {
      en: 'Mountaineering',
      es: 'Alpinismo',
      eu: 'Mendizaletasuna',
      ca: 'Alpinisme',
      gl: 'Alpinismo'
    },
    born: {
      en: 'Born in 1973 in Tolosa (Gipuzkoa)',
      es: 'Nacida en 1973 en Tolosa (Gipuzkoa)',
      eu: '1973an jaioa Tolosan (Gipuzkoa)',
      ca: 'Nascuda el 1973 a Tolosa (Guipúscoa)',
      gl: 'Nada en 1973 en Tolosa (Gipuzkoa)'
    },
    achievements: [
      {
        en: 'First woman in the world to climb all 14 mountains over 8,000 metres',
        es: 'Primera mujer del mundo en subir las 14 montañas de más de 8.000 metros',
        eu: '8.000 metrotik gorako 14 mendiak igo zituen munduko lehen emakumea',
        ca: 'Primera dona del món a pujar les 14 muntanyes de més de 8.000 metres',
        gl: 'Primeira muller do mundo en subir as 14 montañas de máis de 8.000 metros'
      },
      {
        en: 'Her first eight-thousander was Everest, in 2001',
        es: 'Su primer ochomil fue el Everest, en 2001',
        eu: 'Bere lehen zortzimilakoa Everest izan zen, 2001ean',
        ca: 'El seu primer vuitmil va ser l\'Everest, el 2001',
        gl: 'O seu primeiro oitomil foi o Everest, en 2001'
      },
      {
        en: 'She completed the challenge on 17 May 2010 on Shishapangma (Tibet)',
        es: 'Completó el reto el 17 de mayo de 2010 en el Shishapangma (Tíbet)',
        eu: '2010eko maiatzaren 17an osatu zuen erronka Shishapangman (Tibet)',
        ca: 'Va completar el repte el 17 de maig de 2010 al Shishapangma (Tibet)',
        gl: 'Completou o reto o 17 de maio de 2010 no Shishapangma (Tíbet)'
      },
      {
        en: 'Spanish Sportswoman of the Year 2010',
        es: 'Mejor deportista española del año 2010',
        eu: '2010eko Espainiako kirolari onena',
        ca: 'Millor esportista espanyola de l\'any 2010',
        gl: 'Mellor deportista española do ano 2010'
      }
    ],
    funFact: {
      en: 'She is an industrial engineer and worked in her family\'s company. On K2 (2004), one of the most dangerous mountains on Earth, she suffered frostbite and lost parts of her toes, but she kept climbing.',
      es: 'Es ingeniera técnica industrial y trabajó en la empresa familiar. En el K2 (2004), una de las montañas más peligrosas del planeta, sufrió congelaciones y perdió parte de los dedos de los pies, pero siguió escalando.',
      eu: 'Industria ingeniari teknikoa da eta familiaren enpresan lan egin zuen. K2n (2004), planetako mendirik arriskutsuenetako batean, izozteak jasan eta oinetako behatz zati batzuk galdu zituen, baina eskalatzen jarraitu zuen.',
      ca: 'És enginyera tècnica industrial i va treballar a l\'empresa familiar. Al K2 (2004), una de les muntanyes més perilloses del planeta, va patir congelacions i va perdre part dels dits dels peus, però va continuar escalant.',
      gl: 'É enxeñeira técnica industrial e traballou na empresa familiar. No K2 (2004), unha das montañas máis perigosas do planeta, sufriu conxelacións e perdeu parte dos dedos dos pés, pero seguiu escalando.'
    },
    today: {
      en: 'She talks openly about the depression she suffered and how important it is to ask for help. She gives talks, still lives for the mountains, and in 2025 her life story was told in a comic book.',
      es: 'Habla abiertamente de la depresión que sufrió y de lo importante que es pedir ayuda. Da charlas, sigue viviendo por la montaña y en 2025 su vida se contó en un cómic.',
      eu: 'Jasan zuen depresioaz eta laguntza eskatzea zein garrantzitsua den irekiki hitz egiten du. Hitzaldiak ematen ditu, mendiarengatik bizi da oraindik eta 2025ean bere bizitza komiki batean kontatu zen.',
      ca: 'Parla obertament de la depressió que va patir i de com és d\'important demanar ajuda. Fa xerrades, continua vivint per la muntanya i el 2025 la seva vida es va explicar en un còmic.',
      gl: 'Fala abertamente da depresión que sufriu e do importante que é pedir axuda. Dá charlas, segue vivindo pola montaña e en 2025 a súa vida contouse nun cómic.'
    },
    inspiration: {
      en: 'She says she came closer to death with depression than climbing mountains. Asking for help is brave too.',
      es: 'Ella cuenta que vio la muerte más cerca con la depresión que escalando montañas. Pedir ayuda también es de valientes.',
      eu: 'Berak dio heriotza gertuago ikusi zuela depresioarekin mendiak eskalatzen baino. Laguntza eskatzea ere ausarten kontua da.',
      ca: 'Ella explica que va veure la mort més a prop amb la depressió que escalant muntanyes. Demanar ajuda també és de valents.',
      gl: 'Ela conta que viu a morte máis preto coa depresión que escalando montañas. Pedir axuda tamén é de valentes.'
    },
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Edurne_Pasaban' },
      { label: 'IE University', url: 'https://www.ie.edu/es/universidad/acerca-de/claustro/edurne-pasaban-lizarribal/' },
      { label: 'Diario de León', url: 'https://www.diariodeleon.es/sociedad/250204/1809800/edurne-pasaban-he-visto-muerte-cerca-depresion-escalando-montanas-exito-superar-enfermedad-mental.html' }
    ]
  },
  {
    personKey: 'nuria_picas',
    emoji: '🏃‍♀️',
    color: '#f472b6',
    sport: {
      en: 'Ultra trail running',
      es: 'Ultratrail (carreras de montaña)',
      eu: 'Ultratraila (mendi lasterketak)',
      ca: 'Ultratrail (curses de muntanya)',
      gl: 'Ultratrail (carreiras de montaña)'
    },
    born: {
      en: 'Born in 1976 in Manresa (Barcelona)',
      es: 'Nacida en 1976 en Manresa (Barcelona)',
      eu: '1976an jaioa Manresan (Bartzelona)',
      ca: 'Nascuda el 1976 a Manresa (Barcelona)',
      gl: 'Nada en 1976 en Manresa (Barcelona)'
    },
    achievements: [
      {
        en: 'Ultra trail World Champion (Skyrunner World Series 2012)',
        es: 'Campeona del mundo de ultratrail (Skyrunner World Series 2012)',
        eu: 'Ultratraileko munduko txapelduna (Skyrunner World Series 2012)',
        ca: 'Campiona del món d\'ultratrail (Skyrunner World Series 2012)',
        gl: 'Campioa do mundo de ultratrail (Skyrunner World Series 2012)'
      },
      {
        en: '2-time winner of the Ultra-Trail World Tour (2014 and 2015)',
        es: '2 veces ganadora del Ultra-Trail World Tour (2014 y 2015)',
        eu: '2 aldiz Ultra-Trail World Tour-eko irabazlea (2014 eta 2015)',
        ca: '2 vegades guanyadora de l\'Ultra-Trail World Tour (2014 i 2015)',
        gl: '2 veces gañadora do Ultra-Trail World Tour (2014 e 2015)'
      },
      {
        en: 'Winner of the Ultra-Trail du Mont-Blanc 2017: more than 160 km around Mont Blanc',
        es: 'Ganadora del Ultra-Trail du Mont-Blanc 2017: ¡más de 160 km alrededor del Mont Blanc!',
        eu: '2017ko Ultra-Trail du Mont-Blanc-eko irabazlea: 160 km baino gehiago Mont Blanc inguruan!',
        ca: 'Guanyadora de l\'Ultra-Trail du Mont-Blanc 2017: més de 160 km al voltant del Mont Blanc!',
        gl: 'Gañadora do Ultra-Trail du Mont-Blanc 2017: máis de 160 km arredor do Mont Blanc!'
      },
      {
        en: 'Victories in races on five continents',
        es: 'Victorias en carreras de los cinco continentes',
        eu: 'Garaipenak bost kontinenteetako lasterketetan',
        ca: 'Victòries en curses dels cinc continents',
        gl: 'Vitorias en carreiras dos cinco continentes'
      }
    ],
    funFact: {
      en: 'In 2000 she had a serious climbing accident in Montserrat and doctors told her she would never run again. About ten years later she was a world champion.',
      es: 'En el año 2000 sufrió un grave accidente escalando en Montserrat y los médicos le dijeron que nunca volvería a correr. Unos diez años después era campeona del mundo.',
      eu: '2000. urtean istripu larria izan zuen Montserraten eskalatzen ari zela, eta medikuek esan zioten ez zuela inoiz berriro korrika egingo. Hamar bat urte geroago munduko txapelduna zen.',
      ca: 'L\'any 2000 va patir un greu accident escalant a Montserrat i els metges li van dir que mai tornaria a córrer. Uns deu anys després era campiona del món.',
      gl: 'No ano 2000 sufriu un grave accidente escalando en Montserrat e os médicos dixéronlle que nunca volvería correr. Uns dez anos despois era campioa do mundo.'
    },
    today: {
      en: 'She is a firefighter for the Government of Catalonia and a high mountain guide. She lives in Berguedà with her twins, keeps racing and gives motivational talks.',
      es: 'Es bombera de la Generalitat de Catalunya y guía de alta montaña. Vive en el Berguedà con sus mellizos, sigue compitiendo y da charlas motivacionales.',
      eu: 'Kataluniako Generalitateko suhiltzailea eta goi mendiko gida da. Berguedàn bizi da bere bikiekin, lehiatzen jarraitzen du eta hitzaldi motibagarriak ematen ditu.',
      ca: 'És bombera de la Generalitat de Catalunya i guia d\'alta muntanya. Viu al Berguedà amb els seus bessons, continua competint i fa xerrades motivacionals.',
      gl: 'É bombeira da Generalitat de Catalunya e guía de alta montaña. Vive no Berguedà cos seus xemelgos, segue competindo e dá charlas motivacionais.'
    },
    inspiration: {
      en: 'When they told her "never", she answered with kilometres. Sometimes limits only exist until someone crosses them.',
      es: 'Cuando le dijeron «nunca», ella respondió con kilómetros. A veces los límites solo existen hasta que alguien los cruza.',
      eu: '«Inoiz ez» esan ziotenean, kilometroekin erantzun zuen. Batzuetan mugak norbaitek zeharkatzen dituen arte baino ez dira existitzen.',
      ca: 'Quan li van dir «mai», ella va respondre amb quilòmetres. De vegades els límits només existeixen fins que algú els creua.',
      gl: 'Cando lle dixeron «nunca», ela respondeu con quilómetros. Ás veces os límites só existen ata que alguén os cruza.'
    },
    sources: [
      { label: 'nuriapicas.com', url: 'https://www.nuriapicas.com/en/biography/' },
      { label: 'Enciclopèdia Catalana', url: 'https://www.enciclopedia.cat/gran-enciclopedia-catalana/nuria-picas-i-albets' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/N%C3%BAria_Picas' }
    ]
  },
  {
    personKey: 'garbine_muguruza',
    emoji: '🎾',
    color: '#fb923c',
    sport: {
      en: 'Tennis',
      es: 'Tenis',
      eu: 'Tenisa',
      ca: 'Tennis',
      gl: 'Tenis'
    },
    born: {
      en: 'Born in 1993 in Caracas (Venezuela)',
      es: 'Nacida en 1993 en Caracas (Venezuela)',
      eu: '1993an jaioa Caracasen (Venezuela)',
      ca: 'Nascuda el 1993 a Caracas (Veneçuela)',
      gl: 'Nada en 1993 en Caracas (Venezuela)'
    },
    achievements: [
      {
        en: 'Won Roland Garros 2016, beating Serena Williams in the final',
        es: 'Ganó Roland Garros 2016 venciendo en la final a Serena Williams',
        eu: 'Roland Garros 2016 irabazi zuen, finalean Serena Williams garaituz',
        ca: 'Va guanyar Roland Garros 2016 vencent a la final Serena Williams',
        gl: 'Gañou Roland Garros 2016 vencendo na final a Serena Williams'
      },
      {
        en: 'Won Wimbledon 2017, beating Venus Williams in the final',
        es: 'Ganó Wimbledon 2017 venciendo en la final a Venus Williams',
        eu: 'Wimbledon 2017 irabazi zuen, finalean Venus Williams garaituz',
        ca: 'Va guanyar Wimbledon 2017 vencent a la final Venus Williams',
        gl: 'Gañou Wimbledon 2017 vencendo na final a Venus Williams'
      },
      {
        en: 'World No. 1 in September 2017',
        es: 'Número 1 del mundo en septiembre de 2017',
        eu: 'Munduko 1. zenbakia 2017ko irailean',
        ca: 'Número 1 del món el setembre de 2017',
        gl: 'Número 1 do mundo en setembro de 2017'
      },
      {
        en: 'WTA Finals champion 2021 and 10 WTA titles',
        es: 'Campeona de las WTA Finals 2021 y 10 títulos WTA',
        eu: '2021eko WTA Finals-eko txapelduna eta 10 WTA titulu',
        ca: 'Campiona de les WTA Finals 2021 i 10 títols WTA',
        gl: 'Campioa das WTA Finals 2021 e 10 títulos WTA'
      }
    ],
    funFact: {
      en: 'She started playing tennis at just 3 years old on some courts near Caracas. Later her family moved to Spain so she could keep training.',
      es: 'Empezó a jugar al tenis con solo 3 años en unas pistas cerca de Caracas. Después su familia se trasladó a España para que pudiera seguir entrenando.',
      eu: '3 urte besterik ez zituela hasi zen tenisean jokatzen, Caracas inguruko pista batzuetan. Gero bere familia Espainiara joan zen entrenatzen jarraitu ahal izateko.',
      ca: 'Va començar a jugar a tennis amb només 3 anys en unes pistes a prop de Caracas. Després la seva família es va traslladar a Espanya perquè pogués continuar entrenant.',
      gl: 'Comezou a xogar ao tenis con só 3 anos nunhas pistas preto de Caracas. Despois a súa familia trasladouse a España para que puidese seguir adestrando.'
    },
    today: {
      en: 'She retired in 2024. Today she is the first former player to direct the WTA Finals and, since 2026, co-director of the Mutua Madrid Open. A leader on and off the court!',
      es: 'Se retiró en 2024. Hoy es la primera extenista que dirige las WTA Finals y, desde 2026, codirectora del Mutua Madrid Open. ¡Una líder dentro y fuera de la pista!',
      eu: '2024an erretiratu zen. Gaur egun WTA Finals zuzentzen duen lehen tenislari ohia da eta, 2026tik, Mutua Madrid Open-eko zuzendarikidea. Lider bat pistan eta pistatik kanpo!',
      ca: 'Es va retirar el 2024. Avui és la primera extennista que dirigeix les WTA Finals i, des del 2026, codirectora del Mutua Madrid Open. Una líder dins i fora de la pista!',
      gl: 'Retirouse en 2024. Hoxe é a primeira extenista que dirixe as WTA Finals e, desde 2026, codirectora do Mutua Madrid Open. Unha líder dentro e fóra da pista!'
    },
    inspiration: {
      en: 'She beat the Williams sisters, tennis legends, in two Grand Slam finals. Today she shows that women can also lead the biggest tournaments.',
      es: 'Ganó a las hermanas Williams, leyendas del tenis, en dos finales de Grand Slam. Hoy demuestra que las mujeres también pueden liderar los grandes torneos.',
      eu: 'Williams ahizpak, tenisaren kondairak, garaitu zituen Grand Slameko bi finaletan. Gaur egun erakusten du emakumeek ere txapelketa handiak zuzendu ditzaketela.',
      ca: 'Va guanyar les germanes Williams, llegendes del tennis, en dues finals de Grand Slam. Avui demostra que les dones també poden liderar els grans tornejos.',
      gl: 'Gañou ás irmás Williams, lendas do tenis, en dúas finais de Grand Slam. Hoxe demostra que as mulleres tamén poden liderar os grandes torneos.'
    },
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Garbi%C3%B1e_Muguruza' },
      { label: 'WTA', url: 'https://wtatennis.com/news/4045381/garbi-e-muguruza-named-tournament-director-of-wta-finals-riyadh' },
      { label: 'Tennis.com', url: 'https://prod.tennis.com/news/articles/garbine-muguruza-returns-to-madrid-as-co-tournament-director' }
    ]
  },
  {
    personKey: 'mireia_belmonte',
    emoji: '🏊‍♀️',
    color: '#2dd4bf',
    sport: {
      en: 'Swimming',
      es: 'Natación',
      eu: 'Igeriketa',
      ca: 'Natació',
      gl: 'Natación'
    },
    born: {
      en: 'Born in 1990 in Badalona (Barcelona)',
      es: 'Nacida en 1990 en Badalona (Barcelona)',
      eu: '1990ean jaioa Badalonan (Bartzelona)',
      ca: 'Nascuda el 1990 a Badalona (Barcelona)',
      gl: 'Nada en 1990 en Badalona (Barcelona)'
    },
    achievements: [
      {
        en: 'First Spanish woman to become Olympic swimming champion: gold in the 200 m butterfly at Rio 2016',
        es: 'Primera española campeona olímpica de natación: oro en 200 m mariposa en Río 2016',
        eu: 'Igeriketako olinpiar txapeldun izan zen lehen espainiarra: urrea 200 m tximeletan Rio 2016an',
        ca: 'Primera espanyola campiona olímpica de natació: or en 200 m papallona a Rio 2016',
        gl: 'Primeira española campioa olímpica de natación: ouro en 200 m bolboreta en Río 2016'
      },
      {
        en: '4 Olympic medals: 1 gold, 2 silver (London 2012) and 1 bronze (Rio 2016)',
        es: '4 medallas olímpicas: 1 oro, 2 platas (Londres 2012) y 1 bronce (Río 2016)',
        eu: '4 domina olinpiko: urre 1, 2 zilar (Londres 2012) eta brontze 1 (Rio 2016)',
        ca: '4 medalles olímpiques: 1 or, 2 plates (Londres 2012) i 1 bronze (Rio 2016)',
        gl: '4 medallas olímpicas: 1 ouro, 2 pratas (Londres 2012) e 1 bronce (Río 2016)'
      },
      {
        en: 'World Champion in the 200 m butterfly (Budapest 2017)',
        es: 'Campeona del mundo de 200 m mariposa (Budapest 2017)',
        eu: '200 m tximeletako munduko txapelduna (Budapest 2017)',
        ca: 'Campiona del món de 200 m papallona (Budapest 2017)',
        gl: 'Campioa do mundo de 200 m bolboreta (Budapest 2017)'
      },
      {
        en: 'Several short-course world records and the first woman to swim the 200 m butterfly in under 2 minutes (short course, 2014)',
        es: 'Varios récords del mundo en piscina corta y primera mujer en nadar los 200 m mariposa en menos de 2 minutos (piscina corta, 2014)',
        eu: 'Hainbat munduko errekor igerileku laburrean eta 200 m tximeleta 2 minutu baino gutxiagoan egin zuen lehen emakumea (igerileku laburra, 2014)',
        ca: 'Diversos rècords del món en piscina curta i primera dona a nedar els 200 m papallona en menys de 2 minuts (piscina curta, 2014)',
        gl: 'Varios récords do mundo en piscina curta e primeira muller en nadar os 200 m bolboreta en menos de 2 minutos (piscina curta, 2014)'
      }
    ],
    funFact: {
      en: 'She started swimming at the age of 5 because a doctor recommended it for her health. That medical advice ended up turning into an Olympic gold!',
      es: 'Empezó a nadar a los 5 años porque un médico se lo recomendó por salud. ¡Aquel consejo médico acabó convirtiéndose en un oro olímpico!',
      eu: '5 urterekin hasi zen igerian, mediku batek osasunagatik gomendatu ziolako. Mediku-aholku hura urrezko domina olinpiko bihurtu zen azkenean!',
      ca: 'Va començar a nedar als 5 anys perquè un metge li ho va recomanar per salut. Aquell consell mèdic va acabar convertint-se en un or olímpic!',
      gl: 'Comezou a nadar aos 5 anos porque un médico llo recomendou por saúde. Aquel consello médico acabou converténdose nun ouro olímpico!'
    },
    today: {
      en: 'She has not officially retired, although she has serious injuries in both shoulders. She says that when the time comes to decide, she will leave "super happy".',
      es: 'No se ha retirado oficialmente, aunque arrastra lesiones graves en los dos hombros. Dice que cuando llegue el momento de decidir, se irá «súper contenta».',
      eu: 'Ez da ofizialki erretiratu, bi sorbaldetan lesio larriak dituen arren. Dio erabakitzeko unea iristen denean «oso pozik» joango dela.',
      ca: 'No s\'ha retirat oficialment, tot i que arrossega lesions greus a les dues espatlles. Diu que quan arribi el moment de decidir, se\'n anirà «súper contenta».',
      gl: 'Non se retirou oficialmente, aínda que arrastra lesións graves nos dous ombros. Di que cando chegue o momento de decidir, irase «súper contenta».'
    },
    inspiration: {
      en: 'You never know how far something you start trying out can take you. Dive in!',
      es: 'Nunca sabes hasta dónde te puede llevar algo que empiezas a probar. ¡Lánzate al agua!',
      eu: 'Ez dakizu inoiz probatzen hasten zaren zerbaitek noraino eraman zaitzakeen. Bota zaitez uretara!',
      ca: 'Mai saps fins on et pot portar una cosa que comences a provar. Llença\'t a l\'aigua!',
      gl: 'Nunca sabes ata onde te pode levar algo que comezas a probar. Bótate á auga!'
    },
    sources: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mireia_Belmonte' },
      { label: 'COPE', url: 'https://www.cope.es/programas/el-partidazo-de-cope/noticias/mireia-belmonte-habla-sobre-futuro-partidazo-cope-dos-tendones-rotos-dia-toque-tomar-decision-me-ire-contenta-20261001_3447368.html' },
      { label: 'The Objective', url: 'https://theobjective.com/deportes/2026-10-04/mireia-belmonte-campeona-olimpica-sobre-el-dolor-de-los-hombros-no-podia-peinarme-abrir-la-puerta-del-coche-o-cortar-carne/' }
    ]
  }
];
