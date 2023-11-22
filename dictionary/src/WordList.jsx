import Word from "./Word";

export default function WordList({
  wordList,
  filteredWordList,
  deleteWord,
  changeWord,
}) {
  if (wordList.length === 0 || filteredWordList.length === 0) {
    return <p>No words in your Dictionary</p>;
  } else if (filteredWordList === wordList) {
    return (
      <>
        <div className="words-container">
          {wordList.map((word) => (
            <div className={word.gender === "Neutral" ? "neutral" : word.gender === "Feminin" ? "feminin" : word.gender === "Masculin" ? "masculin" : "verb"} key={word.id}>
                <Word
                  key={word.id}
                  word={word}
                  changeWord={changeWord}
                  deleteWord={deleteWord}
                />
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="words-container">
        {filteredWordList.map((word) => (
          <div className={word.gender === "Neutral" ? "neutral card" : word.gender === "Feminin" ? "feminin card" : word.gender === "Masculin" ? "masculin card" :  "verb card"} key={word.id}>
            <Word
              key={word.id}
              word={word}
              changeWord={changeWord}
              deleteWord={deleteWord}
            />
          </div>
        ))}
      </div>
    );
  }
}
