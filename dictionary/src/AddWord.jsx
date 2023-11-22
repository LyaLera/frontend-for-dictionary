import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid"; 

export default function AddWord () {
    const [wordList, setWordList] = useState([]);

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

    const initialValues = {
        name: "",
        partOfSpeech: "",
        gender: "",
        plural: "",
        topic: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string()
        .required("Plase type new word!")
        .max(60, "Must be 60 characters or less")
        .min(2, "Must be 2 characters or more")
        .matches(/[A-Za-z]/, "Only latin letters are allowed"),
        partOfSpeech: Yup.string()
        .required("Plase choose part of speech!")
        .max(60, "Must be 60 characters or less")
        .min(2, "Must be 2 characters or more")
        .matches(/[A-Za-z]/, "Only latin letters are allowed"),
        gender: Yup.string()
        .required()
        .max(60, "Must be 60 characters or less")
        .min(2, "Must be 2 characters or more")
        .matches(/[A-Za-z]/, "Only latin letters are allowed"),
        plural: Yup.string()
        .required()
        .max(60, "Must be 60 characters or less")
        .min(2, "Must be 2 characters or more")
        .matches(/[A-Za-z]/, "Only latin letters are allowed"),
        topic: Yup.string()
        .required("Plase choose topic!")
        .max(60, "Must be 60 characters or less")
        .min(2, "Must be 2 characters or more")
        .matches(/[A-Za-z]/, "Only latin letters are allowed"),
    })

    return (
        <div>
        <h2>Add new word to the dictionary</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            addWord(values.name,
                values.partOfSpeech, 
                values.gender, 
                values.plural, 
                values.topic)
             resetForm()
            }}
        >
          <Form>
            <div>
              <label htmlFor="name">New Word</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="partOfSpeech">Part Of Speech:</label>
              <Field as="select" id="partOfSpeech" name="partOfSpeech">
            <option></option>
              <option value="Noun">Noun</option>
              <option value="Verb">Verb</option>
              </Field>
              <ErrorMessage name="partOfSpeech" />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <Field as="select" 
              id="gender" 
              name="gender">
              <option></option>
              <option value="Feminin">Feminin</option>
            <option value="Neutral">Neutral</option>
            <option value="Masculin">Masculin</option>
            </Field>
              <ErrorMessage name="gender" />
            </div>
            <div>
              <label htmlFor="plural">
                Plural form:
              </label>
              <Field
                type="text"
                id="plral"
                name="plural"
              />
              <ErrorMessage name="plural" />
            </div>
              <label htmlFor="topic">Topic:</label>
              <Field as="select" id="topic" name="topic">
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
                </Field>
              <ErrorMessage name="topic" /><br />
            <button type="submit">Add word</button>
          </Form>   
        </Formik>
      </div>

    )
}

