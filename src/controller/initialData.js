const Product = require("../model/product");
const Category = require("../model/category");

exports.getInitialData = async (req, res) => {
  const category = await Category.find({}).exec();
  const product = await Product.find({})
    .select("_id name price quantity slug description picture category")
    .populate({ path: "category", select: "_id name" })
    .exec();
  res.status(200).json({ listcategory: createCategory(category), product });
};

const createCategory = (category, parentId = null) => {
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
      slug: cat.slug,
      parentId: cat.parentId,
      children: createCategory(category, cat._id),
    });
  }
  return listobj;
};
