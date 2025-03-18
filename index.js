
const express = require("express");
const app = express();
const PORT = 3000;
const student_num = {'Student Number':2683459}
// Middleware to parse JSON request bodies
app.use(express.json());

let books=[];

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/whoami",(request,response)=>{
    response.json(student_num);
})

app.get("/books", (request, response) => {
    response.json(books);
});


app.get("/books/:id", (request, response) => {
    const book = books.find(b => b.id === parseInt(request.params.id));
    if (!book) {
        return response.status(404).json({ error: "Book not found" });
    }
    response.json(book);
});


app.post("/books", (request, response) => {
    const {id,title,details} = request.body;



    const newBook = {
        id,
        title,
        details
        
    };    
    //console.log("iamhere")
    books.push(newBook);
    response.status(201)
    response.send(books);
    console.log("i am here")
});

app.put("/books/:id", (request, response) => {
    const book = books.find(b => b.id === parseInt(request.params.id));
    if (!book) {
        return response.status(404).json({ error: "Book not found" });
    }
    
    const {title, details } = request.body;
    

    

    if (title) book.title = title;
    if (details) book.details = details;
    
    response.status(201)
    response.send(books);
    
});


app.delete("/books/:id", (request, response) => {
    
    const bookIndex = books.findIndex(book => book.id === parseInt(request.params.id));
    if (bookIndex >books.length) {
        return response.status(404).json({ error: "Book not found" });
    }
    if (bookIndex === -1) {
        return response.status(404).json({ error: "Book not found" });
    }

    books.splice(bookIndex, 1);
    response.status(204).send();
    response.send(books);
});


app.post("/books/:id/details", (request, response) => {
    const book = books.find(b => b.id === parseInt(request.params.id));
    if (!book) {
        return response.status(404).json({ error: "Book not found" });
    }

    const { id,author, genre, year } = request.body;
    if (!author || !genre || !year||!id) {
        return response.status(400).json({ error: "Details are required" });
    }

    const newDetail = { id,author, genre, year }; 
    book.details.push(newDetail); 
    response.status(201).json(newDetail); 
    response.send(books);
});


app.delete("/books/:id/details/:detailIndex", (request, response) => {
    const book = books.find(c => c.id === parseInt(request.params.id));
    if (!book) {
        return response.status(404).json({ error: "Book not found" });
    }

    const bookIndex = parseInt(request.params.detailIndex);
    if (specIndex < 0 || specIndex >= car.specs.length) {
        return response.status(404).json({ error: "Detail not found" });
    }

    books.details.splice(detailId, 1);
    response.send(books);
    
});



