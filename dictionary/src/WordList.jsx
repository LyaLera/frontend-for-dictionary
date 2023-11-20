import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function WordList({ wordList, deleteWord, changeWord }) {
  if (wordList.length === 0) {
    return <p>No words in your Dictionary</p>;
  }
  console.log(wordList);
  return (
    <>
      <h3>Dictionary</h3>
      <div>
        {wordList.map((word) => {
          console.log(word);
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
  const [isEditing, setIsEditing] = useState(false);
  let content;
  if (isEditing) {
    if (word.partOfTheLang === "Noun") {
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
            value={word.partOfTheLang}
            onChange={(e) => {
              changeWord({ ...word, partOfTheLang: e.target.value });
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
            <option value="feminin">Feminin</option>
            <option value="neutral">Neutral</option>
            <option value="masculin">Masculin</option>
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
            value={word.partOfTheLang}
            onChange={(e) => {
              changeWord({ ...word, partOfTheLang: e.target.value });
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
    if (word.partOfTheLang === "Verb") {
      content = (
        <>
          <CardMedia sx={{ height: 140 }} image="" title="topic-img" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {word.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Part of speech: {word.partOfTheLang}
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
          <CardMedia sx={{ height: 140 }} image="" title="topic-img" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {word.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Part of speech: {word.partOfTheLang}
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
