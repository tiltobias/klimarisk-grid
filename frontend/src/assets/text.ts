const text = {
  common: {
    loading: {
      en: "Loading...",
      no: "Laster...",
    },
  },
  header: {
    layout: {
      l1: {
        en: "County overview",
        no: "Fylkesoversikt",
      },
      l2: {
        en: "Grid-cell analysis",
        no: "Ruteanalyse",
      },
      label: {
        en: "Analysis mode",
        no: "Analysemodus",
      }
    },
    year: {
      label: {
        en: "Selected time",
        no: "Valgt tidspunkt",
      },
    },
    selectedCounty: {
      en: "Selected county",
      no: "Valgt fylke",
    },
  },
  panels: {
    tree: {
      en: "Risk Structure",
      no: "Risikoens oppbygning",
      tooltip: {
        en: "This list shows how the overall risk is structured into determinants and indicators. The checkboxes indicate which metrics have data available for the selected county. They are for information only and cannot be changed. Metrics without available data are shown as disabled. Hover over a determinant or indicator to read more about it. The method and weighting used to calculate aggregated risk values are described in the corresponding tooltips.",
        no: "Denne listen viser hvordan den overordnede risikoen er bygget opp av determinanter og indikatorer. Avkrysningsboksene viser hvilke mål som har data for det valgte fylket. De er kun til informasjon og kan ikke endres. Mål uten tilgjengelige data vises som deaktivert. Hold pekeren over en determinant eller indikator for å lese mer om den. Metode og vekting for beregning av aggregerte risikoverdier er beskrevet i de tilhørende verktøytipsene.",
      },
    },
    map: {
      en: "Map View",
      no: "Kartvindu",
      tooltip: {
        en: "This map shows the selected metric for the grid cells in the selected county. The selected grid cell is highlighted with a black outline. You can zoom and pan the map to explore the area, and click on a grid cell to select it. The colors represent the values of the selected metric, where stronger colors indicate higher values and greater risk.",
        no: "Dette kartet viser det valgte målet for rutene i det valgte fylket. Den valgte ruten er markert med en svart kantlinje. Du kan zoome og flytte kartet for å utforske området, og klikke på en rute for å velge den. Fargene representerer verdiene for det valgte målet, der sterkere farger indikerer høyere verdier og større risiko.",
      },
    },
    chart: {
      en: "Grid-cell Distribution",
      no: "Rutefordeling",
      tooltip: {
        en: "This chart shows the distribution of the selected metric among grid cells in the selected county and in the municipality containing the selected grid cell. The mean and median values for the county and municipality can be shown or hidden by clicking their values below the chart. Hover over the chart to see how many grid cells have values within each interval. Above the chart, you can choose which metric to display.",
        no: "Dette diagrammet viser fordelingen av det valgte målet blant rutene i det valgte fylket og i kommunen den valgte ruten ligger i. Gjennomsnitts- og medianverdier for fylket og kommunen kan vises eller skjules ved å klikke på verdiene under diagrammet. Hold pekeren over diagrammet for å se hvor mange ruter som har verdier innenfor hvert intervall. Over diagrammet kan du velge hvilket mål som skal vises.",
      },
    },
    table: {
      en: "Data Table",
      no: "Datatabell",
      tooltip: {
        en: "This table displays all grid cells in the selected county. Click a column header to sort and rank the grid cells by that value, and click again to reverse the sorting direction. All determinants and indicators are included in the table only in the 'Grid-cell analysis' mode. Click a row to select that grid cell throughout the dashboard. The colored square at the beginning of each row matches the grid cell's color on the map for the currently selected metric.",
        no: "Denne tabellen viser alle rutene i det valgte fylket. Klikk på en kolonneoverskrift for å sortere og rangere rutene etter den verdien, og klikk igjen for å bytte sorteringsretning. Alle determinanter og indikatorer er inkludert i tabellen kun i analysemodusen 'Ruteanalyse'. Klikk på en rad for å velge den ruten i hele dashbordet. Fargestripen i starten av hver rad tilsvarer rutens farge på kartet for det valgte målet.",
      },
    },
    details: {
      en: "Grid-cell Rankings",
      no: "Rangering av ruten",
      tooltip: {
        en: "This panel shows the selected grid cell's rankings for all determinants and indicators. The rankings are shown both within the selected county and within the municipality containing the selected grid cell. A ranking of 1 means that the grid cell has the highest climate risk for that metric within the comparison area, so lower ranking numbers indicate higher relative risk. The color marker beside each metric matches the grid cell's color on the map when that metric is selected. Clicking a determinant or indicator selects it throughout the dashboard. The determinants are sorted by their contribution to the overall risk, while the indicators within each determinant are sorted by their contribution to that determinant.",
        no: "Dette panelet viser rangeringene til den valgte ruten for alle determinanter og indikatorer. Rangeringene vises både innenfor det valgte fylket og innenfor kommunen den valgte ruten ligger i. En rangering på 1 betyr at ruten har høyest klimarisiko for det aktuelle målet innenfor sammenligningsområdet, slik at lave rangeringstall indikerer høyere relativ risiko. Fargemarkøren ved siden av hvert mål tilsvarer rutens farge på kartet når målet er valgt. Ved å klikke på en determinant eller indikator velges den i hele dashbordet. Determinantene er sortert etter hvor mye de bidrar til den overordnede risikoen, mens indikatorene innenfor hver determinant er sortert etter hvor mye de bidrar til determinantens verdi.",
      },
    },
  },
  chart: {
    tooltip: {
      value: {
        en: "Value",
        no: "Verdi",
      },
      norway: {
        en: "County",
        no: "Fylke",
      },
      county: {
        en: "Municipality",
        no: "Kommune",
      },
      kommuner: {
        en: "grid-cells",
        no: "ruter",
      },
      interval: {
        en: "Interval",
        no: "Intervall",
      },
    },
    stats: {
      mean: {
        en: "Mean",
        no: "Gjennomsnitt",
      },
      median: {
        en: "Median",
        no: "Median",
      },
      tooltip: {
        norge: {
          en: "This column shows the mean and median value of all grid cells in the selected county.",
          no: "Denne kolonnen viser gjennomsnitt og median for alle rutene i det valgte fylket.",
        },
        fylke: {
          en: "This column shows the mean and median value of all grid cells in the municipality containing the selected grid cell.",
          no: "Denne kolonnen viser gjennomsnitt og median for alle rutene i kommunen den valgte ruten ligger i.",
        },
      },
    },
  },
  table: {
    kommune: {
      en: "Grid cell ID",
      no: "Rute-ID",
    },
  },
  details: {
    selectSomething: {
      en: "Select a grid cell.",
      no: "Velg en rute.",
    },
    tooltip: {
      norge: {
        en: "The number represents the selected grid cell's ranking among all grid cells in the selected county. Ranking number 1 means the selected grid cell has the highest risk value, with no other grid cells in the county having a higher value.",
        no: "Nummeret viser den valgte rutens rangering blant alle rutene i det valgte fylket. Rangering nummer 1 betyr at den valgte ruten har den høyeste risikoverdien, og at ingen andre ruter i fylket har en høyere verdi.",
      },
      fylke: {
        en: "The number represents the selected grid cell's ranking among all grid cells in the municipality containing it. Ranking number 1 means the selected grid cell has the highest risk value, with no other grid cells in the municipality having a higher value.",
        no: "Nummeret viser den valgte rutens rangering blant alle rutene i kommunen den ligger i. Rangering nummer 1 betyr at den valgte ruten har den høyeste risikoverdien, og at ingen andre ruter i kommunen har en høyere verdi.",
      },
    },
    generateReport: {
      en: "Generate Report",
      no: "Generer rapport",
    },
  },
  report: {
    title: {
      en: "Municipality climate risk report",
      no: "Kommunal klimarisikorapport",
    },
    viewer: {
      generating: {
        en: "Generating report...",
        no: "Genererer rapport...",
      },
      error: {
        en: "Could not generate report.",
        no: "Kunne ikke generere rapport.",
      },
    },
    selectMunicipality: {
      en: "Select municipality",
      no: "Velg kommune",
    },
    selectMunicipalityDescription: {
      en: "Select the municipality you want to generate a report for.",
      no: "Velg kommunen du ønsker å generere en rapport for.",
    },
    selectYear: {
      en: "Select time period",
      no: "Velg tidsperiode",
    },
    selectYearDescription: {
      en: "Select the time period you want to generate a report for.",
      no: "Velg tidsperioden du ønsker å generere en rapport for.",
    },
    download: {
      download: {
        en: "Download report",
        no: "Last ned rapport",
      },
      generating: {
        en: "Generating report",
        no: "Genererer rapport",
      },
      fileName: {
        en: "municipality-climate-risk-report.pdf",
        no: "kommunal-klimarisikorapport.pdf",
      },
    },
    document: {
      urlLabel: {
        en: "Detailed description:",
        no: "Detaljert forklaring:",
      },
      score: {
        en: "Score:",
        no: "Skår:",
      },
      ranked: {
        p1: {
          en: "Ranked",
          no: "Rangert som nr.",
        },
        p2: {
          en: "out of",
          no: "av",
        },
        p3: {
          en: "municipalities in",
          no: "kommuner i",
        },
        norge: {
          en: "Norway",
          no: "Norge",
        },
        fylke: {
          en: "its county",
          no: "fylket",
        },
        p4: {
          en: "(1 = highest climate risk)",
          no: "(1 = høyest klimarisiko)",
        },
      },
      titlePage: {
        chosenKommune: {
          en: "Selected municipality:",
          no: "Valgt kommune:",
        },
        chosenYear: {
          en: "Selected time period:",
          no: "Valgt tidsperiode:",
        },
      },
      undefinedIndicator: {
        en: "The municipality has not received a score for this indicator.",
        no: "Kommunen har ikke fått en skår for denne indikatoren.",
      },
      documentationPage: {
        title: {
          en: "Documentation",
          no: "Dokumentasjon",
        },
      },
    },
  },
} as const;

export default text;