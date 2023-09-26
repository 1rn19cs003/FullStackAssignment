const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const Utils = require('../utils/decodeToken');
const Author = require('../models/author');

exports.getAllAuthor = async (req, res) => {
    try {
        const author = await Author.findAll();
        res.status(200).send(author);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error' });
    }
};


exports.createAuthor = async (req, res) => {
    try {
        console.log(req.body);
        let k = req.body;
        const author = await Author.create(k.name);
        res.status(200).send(author);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}

exports.getByAuthorId = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await Author.findOne(authorId);
        res.status(200).send(author);
    } catch (error) {
        console.log('error', error)
        res.status(500).send({ message: 'server error' });
    }
}


exports.deleteAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        const author = await Author.delete(authorId);
        res.status(200).send(author);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }

}

exports.updateAuthor = async (req, res) => {
    try {
        let authorId = req.params.authorId;
        let k = req.body;
        const author = await Author.update(authorId, k.name);
        res.status(200).send(author);
    } catch (err) {
        console.log('error', err);
        res.status(500).send({ message: 'server error' });
    }
}
