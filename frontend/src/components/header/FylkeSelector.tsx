import useDataStore, { type FylkeNr } from '../../hooks/useDataStore';
import useLanguageStore, { t } from '../../hooks/useLanguageStore';


function FylkeSelector() {
  const { dataModel, selectedFylke, setSelectedFylke } = useDataStore();
  const { l } = useLanguageStore();


  return (
    <label htmlFor="fylkeSelector"><span className="label" style={{ paddingRight: '0.5rem' }}>{l(t.header.selectedCounty)}:</span>
    <select
      id="fylkeSelector"
      className="fylkeSelector"
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
  )

}

export default FylkeSelector;