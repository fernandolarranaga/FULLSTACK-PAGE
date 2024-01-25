const router = require("express").Router();

const Song = require("../../models/song.model");

router.get("/", (req, res) => {
  Song.find()
    .populate("author", "email username")
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(songs);
    });
});

router.get("/:songId", (req, res) => {
  const { songId } = req.params;
  Song.findById(songId)
  .populate("author", "email username")
  .then((song) => {
    res.json(song);
  });
});

router.post("/", async (req, res) => {
  const author = {
    _id: req.user._id,
    email: req.user.email,
  };

  req.body.author = author;

  Song.create({
    ...req.body,
    email: req.user.email,
    username: req.user.username,
  })
    .then((song) => Song.findById(song._id).populate("author", "email username"))
    .then((populatedSong) => {
      console.log("Canción creada exitosamente:", populatedSong);
      res.json({
        message: "Canción creada exitosamente",
        song: populatedSong,
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.put("/:songId", (req, res) => {
  const { songId } = req.params;

  Song.findById(songId, (err, song) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (song.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para realizar esta acción" });
    }
    Song.findByIdAndUpdate(songId, req.body, { new: true })
      .then((updatedSong) => {
        res.json(updatedSong);
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });
});

router.delete("/:songId", (req, res) => {
  const { songId } = req.params;

  Song.findById(songId, (err, song) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (song.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para realizar esta acción" });
    }
    song.remove((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: "Canción eliminada exitosamente" });
    });
  });
});

module.exports = router;

