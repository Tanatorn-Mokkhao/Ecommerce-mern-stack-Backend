const { default: slugify } = require("slugify");
const Category = require("../model/category");

exports.createCategory = (req, res) => {
  const obj = {
    name: req.body.payload.name,
    slug: req.body.payload.name,
    createby: req.user._id,
  };
  if (req.body.payload.parentId) {
    obj.parentId = req.body.payload.parentId;
  }
  const add = new Category(obj);
  add.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

const listCategory = (category, parentId = null) => {
  const listobj = [];
  let categories;
  if (parentId == null) {
    categories = category.filter((cat) => cat.parentId == undefined);
  } else {
    categories = category.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of categories) {
    listobj.push({
      _id: cat._id,
      name: cat.name,
      parentId: cat.parentId,
      children: listCategory(category, cat._id),
    });
  }
  return listobj;
};

exports.getCategory = (req, res) => {
  Category.find({}).exec((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      const categoryList = listCategory(category);

      return res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategory = async (req, res) => {
  const { payload } = req.body;
  console.log(payload);
  let UpdateArray = [];
  payload.map((item) => {
    UpdateArray.push({
      _id: item._id,
      name: item.name,
      slug: slugify(item.name),
      parentId: item.parentId,
    });
  });

  try {
    for (let cat of UpdateArray) {
      await Category.findOneAndUpdate(
        { _id: cat._id },
        {
          $set: {
            name: cat.name,
            slug: slugify(cat.name),
            parentId: cat.parentId,
          },
        },
        { new: true }
      );
    }
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error: "this catetegory already add" });
  }
  // payload.forEach((data) =>
  //   Category.findOneAndDelete({ _id: data._id }, { new: true })
  // );

  // payload.slug = slugify(payload.name);
  // Category.findOneAndUpdate(
  //   { _id: payload._id },
  //   { $set: payload },
  //   { new: true }
  // ).exec((error, category) => {
  //   if (error) return res.status(400).json({ error });
  //   if (category) {
  //     return res.status(200).json({ category });
  //   }
  // });
};

exports.deleteCategory = async (req, res) => {
  const { payload } = req.body;
  const listDelete = [];
  try {
    payload.map((data) => {
      listDelete.push({ _id: data });
    });
    for (let cat of listDelete) {
      await Category.findOneAndDelete({ _id: cat._id });
    }
    res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};
