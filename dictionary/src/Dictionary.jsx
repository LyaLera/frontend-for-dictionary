import { useState, useEffect } from "react";
import WordList from "./WordList";
import Filter from "./Filter";
import DictionaryPagination from "./DictionaryPagination";

export default function Dictionary() {
  const [wordList, setWordList] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(6);
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const nPages = Math.ceil(wordList.length / wordsPerPage);

    let currentWords = wordList.slice(
      indexOfFirstWord,
      indexOfLastWord
    )


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

  const filterByGender = (e) => {
    setGenderFilter(e.target.value);
  };

  const filterByTopic = (e) => {
    setTopicFilter(e.target.value);
  };

  const filteredWordList = currentWords.filter(
    (word) =>
      word.gender.includes(genderFilter) && word.topic.includes(topicFilter)
  );

  const resetFilter = () => {
    setGenderFilter("")
    setTopicFilter("")
  }

  return (
    <>
      <Filter
        genderFilter={genderFilter}
        topicFilter={topicFilter}
        filterByGender={filterByGender}
        filterByTopic={filterByTopic}
        resetFilter={resetFilter}
      />
      <WordList
        wordList={currentWords}
        deleteWord={deleteWord}
        changeWord={changeWord}
        filteredWordList={filteredWordList}
      />
      <DictionaryPagination 
              genderFilter={genderFilter}
              topicFilter={topicFilter}
      nPages={nPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}/>
    </>
  );
}
