const Books = require('../models/books');

exports.getAllBooks = async (req, res) => {
    try {
        // const authToken = req.cookies.authToken;
        // console.log(authToken);
        // const decodedInfo = await Utils.decodeToken(authToken, secretKey);
        // console.log(decodedInfo);
        const books = await Books.findAll();
        res.status(200).send(books);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createBook = async (req, res) => {
    try {
        let k = req.body;
        const books = await Books.create(k.title, k.isbn, k.price, k.QuantityInStock);
        if (books) {
            res.status(200).send(books);
        } else {
            res.status(201).send({ message: "Book Not Created due to some internal error" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByBookId = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        const books = await Books.findOne(bookId);
        if (books) {
            res.status(200).send(books);
        } else {
            res.status(201).send({ message: "Book Not Found" });
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteBook = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        const books = await Books.delete(bookId);
        if (books) {
            res.status(200).send(books);
        } else {
            res.status(201).send({ message: "Book Not Found" });
        }
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateBook = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let k = req.body;
        const books = await Books.update(bookId, k.title, k.isbn, k.price, k.QuantityInStock);
        if (books) {
            res.status(200).send(books);
        } else {
            res.status(201).send({ message: "Book Not Found" });
        }
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
