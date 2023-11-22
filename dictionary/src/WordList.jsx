import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
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
        <Grid
        container
        rowSpacing={3}
        sx={{ margin: 0, marginBottom: 3 }}
        >
          {wordList.map((word) => 
             (
              <Grid
              key={word.id}
              container item
              xs={12}
              sm={6}
              md={4}
              justifyContent="center"
              >
                <Card sx={{ maxWidth: 250 }}>
                  <Word
                    key={word.id}
                    word={word}
                    changeWord={changeWord}
                    deleteWord={deleteWord}
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
        </>
    );
  } else {
    return ( 
        <Grid
        container
        rowSpacing={3}
        sx={{ margin: 0, marginBottom: 3 }}
      >
        {filteredWordList.map((word) => 
        (
            <Grid
            key={word.id}
            container item
            justifyContent="center"
            xs={12}
            sm={6}
            md={4}
          >
            <Card sx={{ maxWidth: 250 }} key={word.id}>
              <Word
                word={word}
                key={word.id}
                changeWord={changeWord}
                deleteWord={deleteWord}
              />
            </Card>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}
