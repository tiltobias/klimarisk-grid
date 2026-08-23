import './Header.css';
// import YearSelect from './YearSelect';
import LayoutSelect from './LayoutSelect';
import LanguageSelect from './LanguageSelect';
import FylkeSelector from './FylkeSelector';
// import ReportButton from './ReportButton';
import useLanguageStore, { t } from '../../hooks/useLanguageStore';


interface Props {
  noControls?: boolean;
}


function Header({ noControls }: Props) {
  const { l } = useLanguageStore();

  return (
    <header>
      <h1>
        <a href="https://github.com/tiltobias/klimarisk-grid" target="_blank" rel="noopener noreferrer">
          {l(t.header.title)}
        </a>
      </h1>
      {!noControls && (
        <div className="headerControls">
          <FylkeSelector />
          <LayoutSelect />
          {/* <YearSelect /> */}
          {/* <ReportButton /> */}
        </div>
      )}
      <LanguageSelect />
    </header>
  )
}

export default Header;