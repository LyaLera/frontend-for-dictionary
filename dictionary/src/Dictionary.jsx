import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import WordList from "./WordList";
import AddWord from "./AddWord";

export default function Dictionary() {
  const [wordList, setWordList] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("")

  const fetchWords = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary`
      );
      let data = await response.json();
      let wordsFromServer = data.data;
      setWordList(wordsFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const postWord = async (newWord) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWord),
        }
      );
      if (response.status === 201) {
        console.log("Word successfully was added to db");
      } else {
        let error = new Error("Could not add word to db");
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addWord = (name, partOfSpeech, gender, plural, topic) => {
    const newWord = {
      name: name,
      partOfSpeech: partOfSpeech,
      gender: gender,
      plural: plural,
      topic: topic,
      id: uuidv4(),
    };
    setWordList([...wordList, newWord]);
    postWord(newWord);
  };

  const deleteWordInServer = async (id) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      alert("Word was deleted in a server");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWord = (id) => {
    let filteredList = wordList.filter((word) => {
      return word.id !== id;
    });
    setWordList(filteredList);
    deleteWordInServer(id);
  };

  const putEditedWord = async (changedWord) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary/${changedWord.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changedWord),
        }
      );
      if (response.status === 201) {
        console.log("Word successfully edited in a server");
      } else {
        let error = new Error("Could not edit word in a server");
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeWord = (changedWord) => {
    let updatedWord = wordList.map((word) => {
      if (word.id === changedWord.id) {
        return changedWord;
      } else {
        return word;
      }
    });
    setWordList(updatedWord);
    putEditedWord(changedWord);
  };

  return (
    <>
        {/* <input
        type="text"
        placeholder="Filter by gender"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
      <label htmlFor="gender">Filter words by Gender</label>
      <select type="text"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}>
            <option></option>
            <option value="Feminin">Feminin</option>
            <option value="Neutral">Neutral</option>
            <option value="Masculin">Masculin</option>
      </select>
      <label htmlFor="topic">Filter words by Topic</label>
      <select type="text"
        value={topicFilter}
        onChange={(e) => setTopicFilter(e.target.value)}>
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
      <WordList
        wordList={wordList}
        genderFilter={genderFilter}
        topicFilter={topicFilter}
        deleteWord={deleteWord}
        changeWord={changeWord}
      /> 
      <AddWord addWord={addWord} />
    </>
  );
}
