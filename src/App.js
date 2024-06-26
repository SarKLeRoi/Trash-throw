import React, { useState } from "react";
import "./App.css";

function App() {
  const [people, setPeople] = useState([
    { name: "Rawi", ate: false, lastDate: null },
    { name: "Fadi", ate: false, lastDate: null },
    { name: "Emeel", ate: false, lastDate: null },
    { name: "Wissam", ate: false, lastDate: null },
  ]);

  const [nextPerson, setNextPerson] = useState(null);

  const handleCheckboxChange = (index) => {
    const newPeople = [...people];
    newPeople[index].ate = !newPeople[index].ate;
    setPeople(newPeople);
  };

  const findNextPerson = () => {
    const eligiblePeople = people
      .filter((person) => person.ate)
      .sort((a, b) => {
        if (a.lastDate === null) return -1;
        if (b.lastDate === null) return 1;
        return new Date(a.lastDate) - new Date(b.lastDate);
      });

    if (eligiblePeople.length === 0) {
      setNextPerson("No one who ate is assigned to take out the trash yet.");
      return;
    }

    const nextPersonToTakeTrash = eligiblePeople[0];
    const newPeople = people.map((person) =>
      person.name === nextPersonToTakeTrash.name
        ? { ...person, lastDate: new Date() }
        : person
    );

    setPeople(newPeople);
    setNextPerson(`${nextPersonToTakeTrash.name} should take out the trash.`);
  };

  return (
    <div className="App">
      <h1>Trash Duty Scheduler</h1>
      <div className="checklist">
        {people.map((person, index) => (
          <div key={index} className="person">
            <label>
              <input
                type="checkbox"
                checked={person.ate}
                onChange={() => handleCheckboxChange(index)}
              />
              {person.name} ate
            </label>
            <div>
              Last took out trash:{" "}
              {person.lastDate
                ? new Date(person.lastDate).toLocaleDateString()
                : "Never"}
            </div>
          </div>
        ))}
      </div>
      <button onClick={findNextPerson}>Who Takes Out the Trash?</button>
      <div className="result">{nextPerson}</div>
    </div>
  );
}

export default App;
