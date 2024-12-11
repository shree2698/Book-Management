import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook } from "../redux/booksSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Pagination,
  Box,
  LinearProgress,
  Grid2,
  Typography,
  Divider,
  IconButton,
  Grid,
  styled,
  InputBase,
  Tooltip,
  Card,
  CardHeader,
} from "@mui/material";
import { Add, SearchNormal } from "iconsax-react";
import Asc from "../assets/ascending-sort.png";
import Desc from "../assets/sort.png";
import Asc2 from "../assets/ascending-sort2.png";
import Desc2 from "../assets/sort2.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  boxShadow: "10px 10px 20px rgba(84, 74, 113, 0.15)",
  backgroundColor: "#F4F0FF",
  borderRadius: "10px",
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#5F33E1",
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "14px",
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const BookList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.books);
  const [expandedBook, setExpandedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const handleToggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedBook(expandedBook === id ? null : id); // Toggle the expanded state
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    author: "",
    title: "",
    year: "",
    country: "",
    language: "",
    link: "",
    pages: "",
  });

  const totalPages = Math.ceil(items.length / booksPerPage);

  const handleSearch = () => {
    dispatch(
      fetchBooks({
        title: searchTerm,
        DIR: sortOrder,
        page: currentPage,
        limit: booksPerPage,
      })
    );
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F0FF";
    handleSearch();
  }, [dispatch, searchTerm, sortOrder, currentPage, booksPerPage]);

  const handleAddBook = () => {
    dispatch(addBook(newBook));
    setNewBook({
      author: "",
      title: "",
      year: "",
      country: "",
      language: "",
      link: "",
      pages: "",
    });
    setOpenDialog(false);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = items.slice(indexOfFirstBook, indexOfLastBook);

  if (error) return <p>Error: {error}</p>;

  return (
    <Grid2>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="#5F33E1" />
        </Box>
      )}

      <Grid2
        m={"3%"}
        p={2}
        bgcolor={"#fff"}
        borderRadius={5}
        boxShadow={"20px 20px 20px rgba(84, 74, 113, 0.15)"}
      >
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Grid>
            <Typography variant="h4" fontWeight={900} color={"#5F33E1"}>
              Book List
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Search>
              <SearchIconWrapper>
                <SearchNormal style={{ color: "#5F33E1" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by Title"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </Search>
          </Grid>
        </Grid>

        <Grid display={"flex"} alignItems={"baseline"}>
          <Tooltip title="Asc">
            <img
              src={sortOrder === "ASC" ? Asc2 : Asc}
              height={"25px"}
              width={"25px"}
              onClick={() => setSortOrder("ASC")}
            />
          </Tooltip>
          <Tooltip title="Desc">
            <img
              src={sortOrder === "DESC" ? Desc2 : Desc}
              height={"25px"}
              width={"25px"}
              onClick={() => setSortOrder("DESC")}
            />
          </Tooltip>
        </Grid>
        <Box display="flex" position="relative">
          <Divider
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
            }}
          />
          <Box flex={1} />
          <IconButton
            style={{
              background: "#5F33E1",
              color: "#fff",
              boxShadow:
                "10px 10px 20px rgba(84, 74, 113, 0.2), -5px -5px 10px #FFFFFF",
            }}
            onClick={() => setOpenDialog(true)}
          >
            <Add />
          </IconButton>
        </Box>

        <Grid container spacing={2} mt={1}>
          {currentBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    boxShadow: "20px 20px 20px rgba(84, 74, 113, 0.15)",
                    borderRadius: 5,
                    padding: 5,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Author:</strong> {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Year:</strong> {book.year}
                  </Typography>

                  {/* Conditionally render the expanded information */}
                  {expandedBook === book.id && (
                    <>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Country:</strong> {book.country}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Language:</strong> {book.language}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Pages:</strong> {book.pages}
                      </Typography>
                    </>
                  )}

                  {/* Read More / Read Less button */}
                  <Button
                    variant="text"
                    onClick={(e) => handleToggleExpand(book.id, e)}
                    sx={{ marginTop: 1, backgroundColor: '#5F33E1', borderRadius: 2, color: '#fff' }}
                  >
                    {expandedBook === book.id ? "Read Less" : "Read More"}
                  </Button>
                </Card>
              </a>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#5F33E1",
                color: "#fff",
              },
              "& .MuiPaginationItem-root": {
                "&:hover": {
                  backgroundColor: "#D3BFFA",
                },
              },
            }}
          />
        </Box>
      </Grid2>

      {/* Dialog for Adding Book */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            variant="outlined"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            variant="outlined"
            type="number"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Country"
            fullWidth
            variant="outlined"
            value={newBook.country}
            onChange={(e) =>
              setNewBook({ ...newBook, country: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Language"
            fullWidth
            variant="outlined"
            value={newBook.language}
            onChange={(e) =>
              setNewBook({ ...newBook, language: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Link"
            fullWidth
            variant="outlined"
            value={newBook.link}
            onChange={(e) => setNewBook({ ...newBook, link: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Pages"
            fullWidth
            variant="outlined"
            type="number"
            value={newBook.pages}
            onChange={(e) => setNewBook({ ...newBook, pages: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddBook} color="primary">
            Add Book
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};

export default BookList;
