import Word from "./Word";

export default function WordList({
  wordList,
  wordsData,
  deleteWord,
  changeWord,
}) {
  if (wordList.length === 0) {
    return <p>No words in your Dictionary</p>;
  } else {
    return (
      <div className="words-container">
        {wordsData.map((word) => (
          <div
            className={
              word.gender === "Neutral"
                ? "neutral card"
                : word.gender === "Feminin"
                ? "feminin card"
                : word.gender === "Masculin"
                ? "masculin card"
                : "verb card"
            }
            key={word.id}
          >
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
