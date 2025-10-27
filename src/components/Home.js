import Notes from './Notes';
import TagStack from './TagStack';
const Home = props => {
  const { showAlert } = props;
  return (
    // --- Inside your Home.jsx component ---
    <div>
      <TagStack />
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
