import useDataStore, { type FylkeNr } from '../../hooks/useDataStore';


function FylkeSelector() {
  const { dataModel, selectedFylke, setSelectedFylke } = useDataStore();


  return (
    <select
      className="fylkeSelector"
      value={selectedFylke || ''}
      onChange={(e) => {
        const fylkeNr = e.target.value || null;
        setSelectedFylke(fylkeNr as FylkeNr | null);
      }}
    >
      <option value="">Velg fylke</option>
      {dataModel?.fylker.map((fylke) => (
        <option key={fylke.nr} value={fylke.nr}>
          {fylke.name}
        </option>
      ))}

    </select>
  )

}

export default FylkeSelector;