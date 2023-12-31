export default function Filter({
  genderFilter,
  topicFilter,
  resetFilter,
  setGenderFilter,
  setTopicFilter,
  setCurrentPage,
}) {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="gender">Filter words by Gender</label>
        <select
          type="text"
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option></option>
          <option value="Feminin">Feminin</option>
          <option value="Neutral">Neutral</option>
          <option value="Masculin">Masculin</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="topic">Filter words by Topic</label>
        <select
          type="text"
          value={topicFilter}
          onChange={(e) => {
            setTopicFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option></option>
          <option value="Family">Family</option>
          <option value="Numbers">Numbers</option>
          <option value="Food">Food</option>
          <option value="Apartment">Apartment</option>
          <option value="Time">Time</option>
          <option value="Free Time">Free Time</option>
          <option value="Weather">Weather</option>
          <option value="Profession and Work">Profession and Work</option>
          <option value="Health">Health</option>
          <option value="Body">Body</option>
          <option value="Transport">Transport</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Clothes">Clothes</option>
          <option value="Celebration">Celebration</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="filter-item filter-button">
        <button onClick={resetFilter}>Reset Filter</button>
      </div>
    </div>
  );
}
