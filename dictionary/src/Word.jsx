import { useState, useEffect } from "react";

export default function Word({ word, deleteWord, changeWord }) {
  const [isEditing, setIsEditing] = useState(false);
  const [objectsWithImg, setObjectsWithImg] = useState([]);

  const fetchImages = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary/topic_images/`
      );
      let data = await response.json();
      setObjectsWithImg(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  let imageFromObject = objectsWithImg.map((obj) => {
    return (
      obj.name === word.topic && (
        <img key={obj.name} src={obj.image} title="topic-img" />
      )
    );
  });

  let content;
  if (isEditing) {
    if (word.partOfSpeech === "Noun") {
      content = (
        <form className="editing-form">
          <label htmlFor="name">Word:</label>
          <input
            id="name"
            value={word.name}
            onChange={(e) => {
              changeWord({ ...word, name: e.target.value });
            }}
          />
          <label htmlFor="partOfSpeech">Part of speech:</label>
          <select
            name="partOfSpeech"
            id="partOfSpeech"
            value={word.partOfSpeech}
            onChange={(e) => {
              changeWord({ ...word, partOfSpeech: e.target.value });
            }}
          >
            <option></option>
            <option value="Noun">Noun</option>
            <option value="Verb">Verb</option>
          </select>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            value={word.gender}
            onChange={(e) => {
              changeWord({ ...word, gender: e.target.value });
            }}
          >
            <option></option>
            <option value="Feminin">Feminin</option>
            <option value="Neutral">Neutral</option>
            <option value="Masculin">Masculin</option>
          </select>
          <label htmlFor="plural">Plural Form:</label>
          <input
            id="plural"
            value={word.plural}
            onChange={(e) => {
              changeWord({ ...word, plural: e.target.value });
            }}
          />
          <label htmlFor="topic">Topic:</label>
          <select
            name="topic"
            id="topic"
            value={word.topic}
            onChange={(e) => {
              changeWord({ ...word, topic: e.target.value });
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
          <button
            className="form-button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </form>
      );
    } else {
      content = (
        <form className="editing-form">
          <label htmlFor="name">Word:</label>
          <input
            id="name"
            value={word.name}
            onChange={(e) => {
              changeWord({ ...word, name: e.target.value });
            }}
          />
          <label htmlFor="partOfSpeech">Part of speech:</label>
          <select
            name="partOfSpeech"
            id="partOfSpeech"
            value={word.partOfSpeech}
            onChange={(e) => {
              changeWord({ ...word, partOfSpeech: e.target.value });
            }}
          >
            <option></option>
            <option value="Noun">Noun</option>
            <option value="Verb">Verb</option>
          </select>
          <label htmlFor="topic">Topic:</label>
          <select
            name="topic"
            id="topic"
            value={word.topic}
            onChange={(e) => {
              changeWord({ ...word, topic: e.target.value });
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
          <button
            className="form-button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </form>
      );
    }
  } else {
    if (word.partOfSpeech === "Verb") {
      content = (
        <>
          {imageFromObject}
          <div>
            <h3>{word.name}</h3>
            <p>Part of speech: {word.partOfSpeech}</p>
            <p>Topic: {word.topic}</p>
            <button>Translate with DeepL</button>
            <br />
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteWord(word.id)}>Delete</button>
          </div>
        </>
      );
    } else {
      content = (
        <>
          {imageFromObject}
          <div>
            <h3>{word.name}</h3>
            <p>Part of speech: {word.partOfSpeech}</p>
            <p>Gender: {word.gender}</p>
            <p>Plural: {word.plural}</p>
            <p>Topic: {word.topic}</p>
            <button>Translate with DeepL</button>
            <br />
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteWord(word.id)}>Delete</button>
          </div>
        </>
      );
    }
  }

  return <>{content}</>;
}
