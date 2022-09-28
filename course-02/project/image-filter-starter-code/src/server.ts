import express from 'express';
import bodyParser from 'body-parser';
const path = require('path');
const fs = require('fs');
import authentication from './middlewares/auth'

import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  app.get("/filteredimage", authentication, async (req, res) => {
    try {
      if (req.query.image_url) {
        let filteredpath = await filterImageFromURL(req.query.image_url);
        res.status(200).sendFile(filteredpath, () => {
          deleteLocalFiles([filteredpath]);
          console.log(filteredpath);
        })
      } else {
        res.status(404).json("Image url not exist. Please try again and put image url.")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();