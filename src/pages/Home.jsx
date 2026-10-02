import HeroExperience from '../components/HeroExperience/HeroExperience.jsx';
import WatchShowcase from '../components/WatchShowcase/WatchShowcase.jsx';
import Accessories from '../components/Accessories/Accessories.jsx';
import Sets from '../components/Sets/Sets.jsx';
import Locations from '../components/Locations/Locations.jsx';

export default function Home() {
  return (
    <>
      <HeroExperience />
      <WatchShowcase />
      <Accessories />
      <Sets />
      <Locations />
    </>
  );
}
