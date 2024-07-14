import "./App.css";

function App() {
  return (
    <>
      <div id="main">
        <p id="1st">Starting with digit</p>
        <p id="_st">Starting with underscore</p>
        <p id="-st">Starting with hyphen</p>
        <p id="st">Starting with lower case alphabet</p>
        <p id="St">Starting with upper case alphabet</p>
        <p id="--1">Starting with double hyphen</p>
        <p id="s">only one alphabet</p>
        <p id="_1">underscore before digit</p>
        <p id="-">only hyphen</p>
        <p id="--">double hyphen</p>
        <p id="_">only underscore</p>
        <p id="__">double underscore</p>
        <button id="button:cool">Click here</button>
      </div>
      <div className="main">
        <h1>Vite + CSS</h1>
        <p className="1st">Starting with digit </p>
        <p className="_st">Starting with underscore</p>
        <p className="-st">Starting with hyphen</p>
        <p className="st">Starting with lower case alphabet</p>
        <p className="St">Starting with upper case alphabet</p>
        <p className="--1st">Starting with double hyphen</p>
        <p className="s">only one alphabet</p>
        <p className="_1">underscore before digit</p>
        <p className="-">only hyphen</p>
        <p className="--">double hyphen</p>
        <p className="_">only underscore</p>
        <p className="__">double underscore</p>
        <button className="button:cool">Click here</button>
      </div>
    </>
  );
}

export default App;
