const Menu = require("../models/Menu");
exports.getMenu = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const items = await Menu.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Menu.countDocuments(query);

    res.json({
      items,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// ADD new menu item
exports.addMenu = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const menuItem = new Menu({ title, price, description, imageUrl });
    await menuItem.save();

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add menu item", details: err.message });
  }
};

// DELETE menu item
exports.deleteMenu = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

// UPDATE menu item
exports.updateMenu = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { title, price, description, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
};
