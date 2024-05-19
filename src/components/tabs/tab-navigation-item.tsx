import { Tabs } from '../../const';

type TabNavigationItemProps = {
  tab: Tabs;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

function TabNavigationItem({ tab, activeTab, setActiveTab }: TabNavigationItemProps): JSX.Element {
  const handleClick = () => {
    setActiveTab(tab);
  };

  return (
    <li className={`film-nav__item ${tab === activeTab ? 'film-nav__item--active' : ''}`}>
      <div onClick={ handleClick } className='film-nav__link'>{ tab }</div>
    </li>
  );
}

export default TabNavigationItem;
