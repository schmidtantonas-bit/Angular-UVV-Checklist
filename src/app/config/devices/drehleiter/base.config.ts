import type { CheckSectionModel } from '@features/sections/check-section/check-section';

// Shared sections for Drehleiter family (L32, L32/S, ...)
export const DREHLEITER_BASE_SECTIONS: CheckSectionModel[] = [
  {
    id: 'sec-l-1',
    title: 'Fahrerhaus Innen',
    total: 11,
    completed: 0,
    items: [
      { id: '1-01', title: 'Gangssperre', status: null },
      { id: '1-02', title: 'Nebenabtrieb Kontrollleuchte', status: null },
      {
        id: '1-03',
        title: 'Kontrollleuchte für sämtliche Funktionen im Fahrerhaus prüfen (soweit möglich)',
        status: null
      },
      { id: '1-04', title: 'Warnsummer für \"Fahrzeug nicht in Grundstellung\"', status: null },
      { id: '1-05', title: 'Verriegelung / Notbetätigung Pressluftapparat (PA)', status: null },
      { id: '1-06', title: 'Ladeerhaltung (Handscheinwerfer, Funk ...)', status: null },
      { id: '1-07', title: 'Durchsageanlage', status: null },
      { id: '1-08', title: 'Batteriehauptschalter', status: null },
      { id: '1-09', title: 'Rückfahrkamerasystem', status: null },
      { id: '1-10', title: 'Lagerung / Sicherung sonstiger Gegenstände', status: null },
      { id: '1-11', title: 'Beschilderung Fahrzeugmaße / Gewichte', status: null }
    ]
  },
  {
    id: 'sec-l-2',
    title: 'Fahrerhaus Außen',
    total: 4,
    completed: 0,
    items: [
      { id: '2-01', title: 'Akustische und optische Warneinrichtungen', status: null },
      { id: '2-02', title: 'Beleuchtungseinrichtungen am Gesamtfahrzeug (Chassis + Aufbau)', status: null },
      { id: '2-03', title: 'Abdeckkappen Ladeerhaltung', status: null },
      { id: '2-04', title: 'Beschilderung am Fahrerhaus', status: null }
    ]
  },
  {
    id: 'sec-l-3',
    title: 'Fahrzeugaufbau',
    total: 6,
    completed: 0,
    items: [
      { id: '3-01', title: 'Fahrzeug auf Unfallschäden prüfen', status: null },
      { id: '3-08', title: 'Aufstiege', status: null },
      { id: '3-10', title: 'Unterlegplatten, Radkeile inkl. Halter und Verriegelung', status: null },
      { id: '3-11', title: 'Aufstiegsleitern', status: null },
      { id: '3-12', title: 'Verriegelung, Funktion, Sprossen, Griffe', status: null },
      { id: '3-13', title: 'Ölstand Haupthydraulik prüfen', status: null }
    ]
  },
  {
    id: 'sec-l-4',
    title: 'Geräteräume',
    total: 5,
    completed: 0,
    items: [
      { id: '3-06', title: 'Gerätekästen auf Beschädigungen prüfen', status: null },
      { id: '3-07', title: 'Funktion der Überwachungseinrichtung', status: null },
      { id: '3-09', title: 'Beleuchtung der Gerätekästen', status: null },
      { id: '3-14', title: 'Seitliche Profildichtungen prüfen', status: null },
      { id: '3-15', title: 'Untere Abschluss-Profildichtung prüfen', status: null }
    ]
  },
  {
    id: 'sec-l-5',
    title: 'Abstützung',
    total: 12,
    completed: 0,
    items: [
      { id: '4-01', title: 'Beleuchtungen / Funktionen / Befestigungen / Dichtheit', status: null },
      { id: '4-02', title: 'Abstützung Sicht- und Funktionskontrolle', status: null },
      { id: '4-03', title: 'Abstützbedienpulte Sicht- und Funktionskontrolle', status: null },
      {
        id: '4-04',
        title: 'Hydraulik: Dichtheit / Zustand Komponenten (Zylinder, Sperrblöcke, Rohrleitungen etc.)',
        status: null
      },
      { id: '4-05', title: 'Überwachung (Sensorik)', status: null },
      { id: '4-06', title: 'Kabel / Anschlussstecker / Sensoren - Sichtprüfung', status: null },
      {
        id: '4-07',
        title: 'Bodenkontaktmechanik (Faltenbalg, Bodenteller, Schutzglocke, Kugel, Halteschelle)',
        status: null
      },
      { id: '4-08', title: 'Abstützbalken / Stützträger - Sichtprüfung', status: null },
      { id: '4-09', title: 'Schweißnähte der Abstützträger prüfen', status: null },
      { id: '4-10', title: 'Schmierstellen im Unterwagen (Abstützung, AV, Drehgestell)', status: null },
      { id: '4-11', title: 'Wartungsdeckel Abstützträger öffnen + Sichtkontrolle', status: null },
      { id: '4-12', title: 'Energiezuführungen / Teleskop-Ölzuführung', status: null }
    ]
  },
  {
    id: 'sec-l-6',
    title: 'Achsverriegelung',
    total: 3,
    completed: 0,
    items: [
      { id: '4-13', title: 'Mechanischer Zustand & Freigängigkeit der Achsverriegelung', status: null },
      { id: '4-14', title: 'Hydraulik / Dichtheit / Korrosionsschutz der Achsverriegelung', status: null },
      { id: '4-15', title: 'Sensorik, Einstellungen & Funktionsprüfung der Achsverriegelung', status: null }
    ]
  },
  {
    id: 'sec-l-7',
    title: 'Notbetriebseinrichtungen',
    total: 5,
    completed: 0,
    items: [
      { id: '4-16', title: 'Notbetriebseinrichtungen Unterwagen', status: null },
      { id: '4-17', title: 'Notbetriebspumpen / Notbetriebsmotor', status: null },
      { id: '4-18', title: 'Ventile Notbetrieb Abstützung', status: null },
      { id: '4-19', title: 'Energiefreigabe Korbmotoren', status: null },
      { id: '4-20', title: 'Umschaltventil Unterwagen/Oberwagen', status: null }
    ]
  },
  {
    id: 'sec-l-8',
    title: 'Podium',
    total: 4,
    completed: 0,
    items: [
      { id: '5-01', title: 'Podium vollständig auf Beschädigungen / Korrosion prüfen', status: null },
      {
        id: '5-02',
        title: 'Beklebung (Warnmarkierungen, Hinweisschilder, Safety-Walk, Kantenschutz) prüfen',
        status: null
      },
      {
        id: '5-03',
        title: 'Podiumsdeckfläche — Beschädigungen / Verunreinigungen / Befestigung',
        status: null
      },
      { id: '5-04', title: 'Zusatzklappen, Verschlüsse, Wartungsöffnungen prüfen', status: null }
    ]
  },
  {
    id: 'sec-l-9',
    title: 'Fahrzeug von unten',
    total: 7,
    completed: 0,
    items: [
      { id: '6-01', title: 'Hydraulikpumpe + Antrieb (Kardanwelle, Flansche, Befestigung)', status: null },
      { id: '6-02', title: 'Fahrzeugrahmen, Hilfsrahmen, Podium, Gerätekästen – Sichtprüfung', status: null },
      { id: '6-03', title: 'Elektrische Drehdurchführung', status: null },
      { id: '6-04', title: 'Verschraubungen zum Fahrzeugrahmen', status: null },
      { id: '6-05', title: 'Zusätzliche Spritzklappen / Energiezuführung Abstützung angebracht', status: null },
      { id: '6-06', title: 'Spritzschutzwinkel an Abstützträgern', status: null },
      { id: '6-07', title: 'Ölkühler Sichtprüfung', status: null }
    ]
  },
  {
    id: 'sec-l-10',
    title: 'Drehgestell',
    total: 7,
    completed: 0,
    items: [
      { id: '7-01', title: 'Drehkranzschrauben', status: null },
      { id: '7-02', title: 'Verkleidungen / Bleche / Designverkleidungen', status: null },
      { id: '7-03', title: 'Grundplatte / Drehgestell / Lafette / Rahmen / Schweißnähte / Korrosion', status: null },
      { id: '7-04', title: 'Hydraulikanlage', status: null },
      { id: '7-05', title: 'Drehgetriebe', status: null },
      { id: '7-06', title: 'Elektrische Bauteile', status: null },
      { id: '7-07', title: 'Sicherungskästen / Schaltkästen / Verteilerdosen', status: null }
    ]
  },
  {
    id: 'sec-l-11',
    title: 'Hauptbedienstand',
    total: 12,
    completed: 0,
    items: [
      { id: '7-08', title: 'Sitz / Sitzschale / Armlehne / Rückenlehne / Wetterschutz', status: null },
      { id: '7-09', title: 'Beklebung / Beschilderung', status: null },
      { id: '7-10', title: 'Bedienelemente HBST', status: null },
      { id: '7-11', title: 'ABA (Automatische Bewegungsabschaltung)', status: null },
      { id: '7-12', title: 'Fahrbewegungen inkl. Automatikfunktionen (TMS, VRS, ARF, etc.)', status: null },
      { id: '7-13', title: 'Zuladungsgrenzen / Lastgrenzen', status: null },
      { id: '7-14', title: 'Notbetrieb Baugruppen', status: null },
      { id: '7-15', title: 'Gradbogen', status: null },
      { id: '7-16', title: 'Beleuchtungseinrichtungen HBST', status: null },
      { id: '7-17', title: 'Sprechanlage', status: null },
      { id: '7-18', title: 'Fußtaster', status: null },
      { id: '7-19', title: 'Verstellung Scheinwerfer Unterleiter', status: null }
    ]
  },
  {
    id: 'sec-l-12',
    title: 'Lafette',
    total: 6,
    completed: 0,
    items: [
      { id: '7-20', title: 'Dehnschrauben Leitersatz', status: null },
      { id: '7-21', title: 'Lastmessbolzen', status: null },
      { id: '7-22', title: 'Dynamometerbolzen', status: null },
      { id: '7-23', title: 'Segmentbogen', status: null },
      { id: '7-24', title: 'Messingführungsschienen', status: null },
      { id: '7-25', title: 'Aufrichtachse', status: null }
    ]
  },
  {
    id: 'sec-l-13',
    title: 'Generatorplattform',
    total: 5,
    completed: 0,
    items: [
      { id: '7-26', title: 'Generatorplattform', status: null },
      { id: '7-27', title: 'Generator', status: null },
      { id: '7-28', title: '230 / 400 Volt-Anlage', status: null },
      { id: '7-29', title: 'Atemluftanlage', status: null },
      { id: '7-30', title: 'Halte- & Umlenkpunkte Absturzsicherung', status: null }
    ]
  },
  {
    id: 'sec-l-14',
    title: 'Leitersatz',
    total: 23,
    completed: 0,
    items: [
      { id: '8-01', title: 'Leiterauflage Sichtprüfung', status: null },
      { id: '8-02', title: 'Designbleche, Schutzgitter, Eingreifschutz', status: null },
      { id: '8-03', title: 'Halterungen am Leitersatz', status: null },
      { id: '8-04', title: 'Beklebung / Beschilderung', status: null },
      { id: '8-05', title: 'Leiterteile / Sprossen / K-Verbände / Gurte', status: null },
      { id: '8-06', title: 'Sprossenbeläge', status: null },
      { id: '8-07', title: 'Spannung Drahtseile', status: null },
      { id: '8-08', title: 'Zustand Drahtseile', status: null },
      { id: '8-09', title: 'Umlenkrollen', status: null },
      { id: '8-10', title: 'Kopfrollen / Führungsrollen / Messingführungen / Kunststoffgleitklötze', status: null },
      { id: '8-11', title: 'Ausschubzylinder', status: null },
      { id: '8-12', title: 'Leitersatzverriegelung', status: null },
      { id: '8-13', title: 'Kabel (Hauptsteuer-, 400 V-, Neigekabel)', status: null },
      { id: '8-14', title: 'Klemmdosen', status: null },
      { id: '8-15', title: 'Atemluftanlage im Leitersatz', status: null },
      { id: '8-16', title: 'Hydrauliksystem Korbsteuerung', status: null },
      { id: '8-17', title: 'Lastösen', status: null },
      { id: '8-18', title: 'Kabel & Kabelführungen', status: null },
      { id: '8-19', title: 'Sensoren', status: null },
      { id: '8-20', title: 'Oberleiterkasten', status: null },
      { id: '8-21', title: 'Panzersteckrohre', status: null },
      { id: '8-22', title: 'Kranwinde', status: null },
      { id: '8-23', title: 'Lift', status: null }
    ]
  },
  {
    id: 'sec-l-15',
    title: 'Korb',
    total: 5,
    completed: 0,
    items: [
      { id: '9-01', title: 'Korbgabel / Korbaufnahme / Korbsegment', status: null },
      { id: '9-02', title: 'Korbverriegelung', status: null },
      { id: '9-03', title: 'Verbindungen hydraulisch & elektrisch zwischen Leiterspitze & Korb', status: null },
      { id: '9-04', title: 'Korbwinkelgeber', status: null },
      { id: '9-05', title: 'Schubstange / Drahtseile / E-Antrieb Korbnivellierung', status: null }
    ]
  },
  {
    id: 'sec-l-16',
    title: 'Allgemein',
    total: 10,
    completed: 0,
    items: [
      { id: '10-01', title: 'Überlastwarneinrichtung (Lasthupe)', status: null },
      { id: '10-02', title: 'Filtereinsatz Haupthydraulikanlage wechseln', status: null },
      { id: '10-03', title: 'Eintrag ins Prüfbuch', status: null },
      { id: '10-04', title: 'Rolladenführung & Profildichtungen reinigen & schmieren', status: null },
      { id: '10-05', title: 'Abstützung und Achsverriegelung reinigen & schmieren', status: null },
      { id: '10-06', title: 'Drehkranz und Drehlager reinigen & schmieren', status: null },
      { id: '10-07', title: 'Leitersatz und Gleitbahnen reinigen & schmieren', status: null },
      { id: '10-08', title: 'Gelenkzylinderaugen reinigen & schmieren', status: null },
      { id: '10-09', title: 'Seile einstellen', status: null },
      { id: '10-10', title: 'Sensoren kalibrieren / Software Update', status: null }
    ]
  },
  {
    id: 'sec-battery-1',
    title: 'Batterien',
    total: 4,
    completed: 0,
    items: [
      { id: '3-02', title: 'Batterie / Batteriefach', status: null },
      { id: '3-03', title: 'Allgemeiner Zustand Starterbatterien', status: null },
      { id: '3-04', title: 'Austausch empfohlen', status: null },
      { id: '3-05', title: 'Zustand der Lagerung und Befestigung der Batterien', status: null }
    ]
  },
  {
    id: 'sec-speed-1',
    title: 'Geschwindigkeiten',
    total: 0,
    completed: 0,
    items: []
  },
  {
    id: 'sec-overload-1',
    title: 'Überlastprüfung',
    total: 4,
    completed: 0,
    items: [
      { id: '10-01', title: 'Sicherheitseinrichtungen', status: null },
      { id: '10-02', title: 'Gebrauchstauglichkeit', status: null },
      { id: '10-03', title: 'Anstoßsicherungen', status: null },
      { id: '10-04', title: 'Seiteneinstellvorrichtung', status: null }
    ]
  },
  {
    id: 'sec-misc-1',
    title: 'Sonstiges',
    total: 0,
    completed: 0,
    items: []
  }
];
