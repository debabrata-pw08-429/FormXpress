import "../App.css";

const Home = () => {
  return (
    <div className="home">
      <h1>No Forms Available</h1>
      <div onClick={() => (window.location.href = "./edit")}>
        + Add New Form
      </div>
    </div>
  );
};

export default Home;
