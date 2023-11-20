import { useState, useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";
import WordList from "./WordList"

export default function Dictionary() {
  const [wordList, setWordList] = useState([]);

  const fetchWords = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_WORDS}/dictionary`
      );
      let data = await response.json();
      let wordsFromServer = data.data
      setWordList(wordsFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

//   const addWord = (text) => {
//     const newWord = {
//       name: text,
//       partOfTheLang: text,
//       gender: text,
//       plural: text,
//       topic: text,
//       id: uuidv4(),
//     };
//     setWordList([...wordList, newWord]);
//     //postTask(newWord)
//   };

  const deleteWord = (id) => {
    let filteredList = wordList.filter((word) => {
      return word.id !== id;
    });
    setWordList(filteredList);
    //deleteWordInServer(id)
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
    //putEditedTask(changedWord)
  };

  return (
    <>
     <WordList 
     wordList={wordList}
     deleteWord={deleteWord}
     changeWord={changeWord}
     />
   </>
  )
}
