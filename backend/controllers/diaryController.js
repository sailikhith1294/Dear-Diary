import Diary from "../models/Diary.js";

export const createEntry = async (req, res) => {
  try {
    const newEntry = new Diary({
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ msg: "Create failed" });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await Diary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch {
    res.status(500).json({ msg: "Fetch failed" });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const updated = await Diary.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    await Diary.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
};
