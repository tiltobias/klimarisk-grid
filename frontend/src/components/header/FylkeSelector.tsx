import useDataStore, { type FylkeNr } from '../../hooks/useDataStore';
import useLanguageStore, { t } from '../../hooks/useLanguageStore';


function FylkeSelector() {
  const { dataModel, selectedFylke, setSelectedFylke } = useDataStore();
  const { l } = useLanguageStore();


  return (
    <>
      {selectedFylke === null && <div className="fylkeOverlay" />}

      <label htmlFor="fylkeSelector" className={`${selectedFylke === null ? "fylkeSelectorActive" : ""}`}>
        <span className="label" style={{ paddingRight: '0.5rem' }}>
          {l(t.header.selectedCounty)}:
        </span>
        <select
          id="fylkeSelector"
          value={selectedFylke || ''}
          onChange={(e) => {
            const fylkeNr = e.target.value || null;
            if (fylkeNr && dataModel?.fylker.some((fylke) => fylke.nr === fylkeNr)) {
              setSelectedFylke(fylkeNr as FylkeNr);
            }
          }}
        >
          <option value=""></option>
          {[...(dataModel?.fylker || [])].sort((a, b) => a.name.localeCompare(b.name, "nb")).map((fylke) => (
            <option key={fylke.nr} value={fylke.nr}>
              {fylke.name}
            </option>
          ))}

        </select>
      </label>
    </>
  )

}

export default FylkeSelector;