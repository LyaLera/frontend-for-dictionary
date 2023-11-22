import { useState, useEffect, useMemo } from "react";
import WordList from "./WordList";
import Filter from "./Filter";
import DictionaryPagination from "./DictionaryPagination";


export default function Dictionary() {
  const [wordList, setWordList] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1)
  const [totalWordList, setTotalWordList] = useState(0)
  const wordsPerPage = 6

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

  const pageNumbers = []
  for (let i=1; i <= Math.ceil(totalWordList / wordsPerPage); i++) {
    pageNumbers.push(i)
  }

  const wordsData = useMemo(() => {
    let computedWords = wordList

    if(genderFilter || topicFilter) {
      computedWords = computedWords.filter(word =>
        word.gender.includes(genderFilter) && word.topic.includes(topicFilter))
    } 
    setTotalWordList(computedWords.length)
    return computedWords.slice(
      (currentPage -1) * wordsPerPage,
      (currentPage - 1) * wordsPerPage + wordsPerPage
    )
  }, [wordList, currentPage, genderFilter, topicFilter])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const resetFilter = () => {
    setGenderFilter("")
    setTopicFilter("")
    setCurrentPage(1)
  }

  return (
    <>
      <Filter
        genderFilter={genderFilter}
        topicFilter={topicFilter}
        setGenderFilter={setGenderFilter}
        setTopicFilter={setTopicFilter}
        setCurrentPage={setCurrentPage}
        resetFilter={resetFilter}
      />
      <WordList
        wordList={wordList}
        deleteWord={deleteWord}
        changeWord={changeWord}
        wordsData={wordsData}
      />
      <DictionaryPagination pageNumbers={pageNumbers} paginate={paginate}/>
    </>
  );
}
