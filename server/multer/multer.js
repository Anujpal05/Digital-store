import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    removeUserImages(req.headers.id);
    cb(null, req.headers.id + "-" + file.originalname);
  },
});

//Remove user's unusual previous upload images
const removeUserImages = (prefixs) => {
  try {
    const folderPath = "./uploads";
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      const filesToDelete = files.filter((file) => file.startsWith(prefixs));

      filesToDelete.forEach((file) => {
        const filePath = path.join(folderPath, file);

        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${file}:`, err);
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const upload = multer({ storage: storage });
export default upload;
