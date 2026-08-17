import { useEffect, useState } from "react";
import useDataStore, { type FylkeNr } from '../../hooks/useDataStore';
import useLanguageStore, { t } from '../../hooks/useLanguageStore';
import { useSearchParams } from "react-router-dom";


function FylkeSelector() {
  const { dataModel, selectedFylke, setSelectedFylke } = useDataStore();
  const { l } = useLanguageStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!dataModel || isInitialized) return;
    const fylkeParam = searchParams.get("f");
    if (dataModel.fylker.some(f => f.nr === fylkeParam)) setSelectedFylke(fylkeParam as FylkeNr)
    setIsInitialized(true);
  }, [dataModel, isInitialized, searchParams, setSelectedFylke]);

  useEffect(() => {
    if (!isInitialized) return;
    setSearchParams(currentParams => {
      const nextParams = new URLSearchParams(currentParams);
      if (selectedFylke) {
        nextParams.set("f", selectedFylke);
      } else {
        nextParams.delete("f");
      }
      return nextParams;
    }, {
      replace: true,
    })
  }, [isInitialized, selectedFylke, setSearchParams]);

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