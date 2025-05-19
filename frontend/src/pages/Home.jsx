import DoctorList from "../components/DoctorList";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Available Doctors</h1>
      <DoctorList />
    </div>
  );
};

export default Home;
