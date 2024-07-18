import { useState } from 'react';
import { FilmComment, FilmInDetails } from '../../types/film';
import { Tabs } from '../../const';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import TabNavigationItem from './tab-navigation-item';
import ReviewsTab from './reviews-tab';

type TabsProps = {
  currentFilm: FilmInDetails;
  currentFilmComments: FilmComment[];
}

function DescriptionTabsComponent (props: TabsProps): JSX.Element {
  const {currentFilm, currentFilmComments} = props;
  const [currentTab, setCurrentTab] = useState(Tabs.Overview);

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          <TabNavigationItem tab={Tabs.Overview} activeTab={currentTab} setActiveTab={setCurrentTab} />
          <TabNavigationItem tab={Tabs.Details} activeTab={currentTab} setActiveTab={setCurrentTab} />
          <TabNavigationItem tab={Tabs.Reviews} activeTab={currentTab} setActiveTab={setCurrentTab} />
        </ul>
      </nav>

      {(() => {
        switch (currentTab) {
          case Tabs.Overview:
            return <OverviewTab {...currentFilm} />;
          case Tabs.Details:
            return <DetailsTab {...currentFilm} />;
          case Tabs.Reviews:
            return <ReviewsTab filmComments={currentFilmComments}/>;
        }
      })()}
    </div>
  );
}

export default DescriptionTabsComponent;
