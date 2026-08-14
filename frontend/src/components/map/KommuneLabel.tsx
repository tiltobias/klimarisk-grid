import useDataStore from "../../hooks/useDataStore";
import "./Map.css";

interface Props {
  mouseOnMap: boolean;
}

function KommuneLabel({ mouseOnMap }: Props) {
  const {
    highlightedKommune,
  } = useDataStore();

  return (
    <>
      {mouseOnMap ? (
        <>
          {highlightedKommune && (
            <div className="kommuneLabel">
              {highlightedKommune}
            </div>
          )}
        </>
      ) : (
        <>
          {/* {selectedKommune && data && selectedYear && (
            <div className="kommuneLabel">
              {data.years[selectedYear].byKommune[selectedKommune].klimarisk_name}
            </div>
          )} */}
        </>
      )}
    </>
  )
}

export default KommuneLabel;