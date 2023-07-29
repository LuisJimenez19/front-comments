import "./App.css";
import CommentsSection from "./components/CommentsSection";
import Context from "./context/Context";

function App() {
  return (
    <div className="app">
      <Context>
        <CommentsSection />
        <div className="attribution">
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          Coded by{" "}
          <a
            target="_blank"
            href="https://github.com/luisjimenez19"
            rel="noreferrer"
          >
            Luis Ángel
          </a>
        </div>
      </Context>
    </div>
  );
}

export default App;
