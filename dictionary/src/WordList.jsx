import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function WordList({ wordList, deleteWord, changeWord }) {
  if (wordList.length === 0) {
    return <p>No words in your Dictionary</p>;
  }
  return (
    <>
      <h3>Dictionary</h3>
      <div>
        {wordList.map((word) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={word.id}>
              <Word
                word={word}
                changeWord={changeWord}
                deleteWord={deleteWord}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
}

function Word({ word, deleteWord, changeWord }) {
  const [isEditing, setIsEditing] = useState(false)
  const [objectsWithImg, setObjectsWithImg] = useState([])

  const fetchImages = async () => {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_SERVER_WORDS}/dictionary/topic_images/`
    );
    let data = await response.json();
    setObjectsWithImg(data)
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchImages();
}, []);

let imageFromObject = objectsWithImg.map((obj) => {
    return (
        obj.name === word.topic ? 
        <CardMedia key={obj.name} sx={{ height: 170 }} image={obj.image} title="topic-img" /> :
        <img src="" />
)});

  let content;
  if (isEditing) {
    if (word.partOfSpeech === "Noun") {
      content = (
        <form>
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
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </form>
      );
    } else {
      content = (
        <form>
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
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </form>
      );
    }
  } else {
    if (word.partOfSpeech === "Verb") {
      content = (
        <>
          {imageFromObject}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {word.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Part of speech: {word.partOfSpeech}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Topic: {word.topic}
            </Typography>
            <Button>Translate with DeepL</Button>
            <br />
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => deleteWord(word.id)}>Delete</Button>
          </CardContent>
        </>
      );
    } else {
      content = (
        <>
          {imageFromObject}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {word.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Part of speech: {word.partOfSpeech}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {word.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Plural: {word.plural}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Topic: {word.topic}
            </Typography>
            <Button>Translate with DeepL</Button>
            <br />
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => deleteWord(word.id)}>Delete</Button>
          </CardContent>
        </>
      );
    }
  }

  return <>{content}</>;
}
