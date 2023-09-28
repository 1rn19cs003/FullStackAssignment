// Import necessary modules and models
const BookAuthor = require('../models/bookauthor'); // Model for BookAuthor
const Author = require('../models/author'); // Model for Author
const Books = require('../models/books'); // Model for Books

// Function to get all BookAuthor records
exports.getAllBookAuthor = async (req, res) => {
    try {
        const author = await BookAuthor.findAll();
        res.status(200).send(author);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};

// Function to create a new BookAuthor record
exports.createBookAuthor = async (req, res) => {
    try {
        let k = req.body;
        //checking valid Auther and book Ids
        const checkAuthor = await Author.findOne(k.authorId);
        const checkBook = await Books.findOne(k.bookId);
        if (checkAuthor && checkBook) {
            const author = await BookAuthor.create(k.authorId, k.bookId);
            if(author){
                res.status(200).send(author);
            }else{
                res.status(201).send({ message: "Book Author Not created Due to some internal error" });
            }
        } else {
            res.status(201).send({ message: "Author or Book Id is invalid" });
        }
    } catch (error) {
        res.status(500).send({ message: 'server error' });
    }
};

// Function to get a BookAuthor record by its ID
exports.getByBookAuthorId = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await BookAuthor.findOne(authorId);
        if (author) {
            res.status(200).send(author);
        } else {
            res.status(201).send({ message: "Book Author Id is invalid" });
        }
    } catch (error) {
        res.status(500).send({ message: 'server error' });
    }
};

// Function to delete a BookAuthor record by its ID
exports.deleteBookAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await BookAuthor.delete(authorId);
        if (author) {
            res.status(200).send(author);
        } else {
            res.status(201).send({ message: "Book Author Id is invalid" });
        }
    } catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
// Function to update a BookAuthor record by its ID
exports.updateBookAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let k = req.body;
        const author = await BookAuthor.update(authorId, k.AuthorId, k.bookId);
        if(author){
            res.status(200).send(author);
        }else{
            res.status(201).send({ message: "Book Author Id is invalid" });
        }
    } catch (err) {
        res.status(500).send({ message: 'server error' });
    }
};
