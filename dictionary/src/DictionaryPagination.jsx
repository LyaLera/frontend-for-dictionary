import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function DictionaryPagination({
  nPages,
  currentPage,
  setCurrentPage
}) {

  const handleClick = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} alignItems={"center"}>
      <Pagination
        count={nPages}
        page={currentPage}
        onChange={handleClick}
        variant="outlined"
        sx={{color: "white"}}
      />
    </Stack>
  );
}
