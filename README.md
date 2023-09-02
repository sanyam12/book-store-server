# book-store-server
This is a backend for the Book Store app built in Flutter


This is a Node.js server built with Express.js that does XYZ. Follow the instructions below to run it locally.
## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine
- [npm](https://www.npmjs.com/) (Node Package Manager) installed

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/sanyam12/book-store-server.git
   cd book-store-server-main
   npm install
   node index.js

Your server should now be running locally at http://localhost:3000. You can access it in your web browser or make API requests to it.

## Usage

- To retrieve a book, make a GET request to `/getBook` with the required parameters.
- To create a book, make a POST request to `/uploadBook` with a JSON payload.
- To retrieve all the books, make a Get request to `/getBooks`
- To save a Book to User's Library, make a POST request to `/saveToLibrary` with a JSON payload containing all the required parameters.
- To get all the Books saved in User's Library, make a POST requext to `/getLibrary` with a JSON payload containing all the required parameters.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

- Check the [issue tracker](https://github.com/sanyam12/book-store-server/issues) for open issues or open a new issue to discuss changes.
- Fork the repository and create your own branch for your contributions.
- Make your changes and submit a pull request.

## Contact

For inquiries, please contact me at [sanyamratreja18@gmail.com](mailto:sanyamratreja18@gmail.com).
