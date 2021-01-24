const Product = require("../model/product");
const { default: slugify } = require("slugify");
const Category = require("../model/category");

exports.createProduct = (req, res) => {
  const { name, quantity, price, description, category } = req.body;
  let ProductPicture = [];
  if (req.files.length > 0) {
    ProductPicture = req.files.map((pic) => {
      return { img: pic.filename };
    });
  }
  const add = new Product({
    name,
    slug: slugify(name),
    quantity,
    price,
    description,
    picture: ProductPicture,
    category,
    createby: req.user._id,
  });

  add.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      return res.status(201).json({ product });
    }
  });
};

exports.getProduct = (req, res) => {
  Product.find({})
    .select("_id name slug quantity price description picture category")
    .populate({ path: "category", select: "_id name" })
    .exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
};

exports.deleteProduct = async (req, res) => {
  const { payload } = req.body;
  console.log(payload);
  let listDelete;

  if (payload.length > 0) {
    listDelete = payload.map((data) => {
      return { _id: data._id };
    });
  }
  try {
    for (let pro of listDelete) {
      await Product.findOneAndDelete({ _id: pro._id }).exec();
    }
    return res.status(200).json({ message: "Delete Success" });
  } catch (error) {
    return res.status(400).json({ message: "Delete Failure" });
  }
};

// exports.getProductsByslug = (req, res) => {
//   const { slug } = req.params;

//   Category.findOne({ slug: slug })
//     .select("_id")
//     .exec((error, category) => {
//       if (error) return res.status(400).json({ error });
//       if (category) {
//         Product.find({ category: category._id })
//           .select("_id name quantity price description category picture")
//           .exec((error, product) => {
//             if (error) return res.status(400).json({ error });
//             if (product) {
//               return res.status(200).json({ product });
//             }
//           });
//       }
//     });
// };

exports.getProductsByslug = async (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        Category.find({ parentId: category._id }).exec(
          async (error, categorylist) => {
            if (error) return res.status(400).json({ error });
            if (categorylist.length > 0) {
              const product = [];
              for (let pro of categorylist) {
                product.push(await Product.find({ category: pro._id }));
              }
              //flat ทำการรวมArray 2 ตัวให้เป็นตัวเดียว
              // console.log(product.flat(1));
              return res.status(200).json({ product: product.flat(1) });
            } else {
              Product.find({ category: category._id })
                .select("_id name quantity price description category picture")
                .exec((error, product) => {
                  if (error) return res.status(400).json({ error });
                  if (product) {
                    return res.status(200).json({ product });
                  }
                });
            }
          }
        );
      }
    });
};

exports.getAllProduct = (req, res) => {
  Product.find({}).exec((error, product) => {
    if (error) return res.status(400), json({ error });
    if (product) {
      return res.status(200).json({ product });
    }
  });
};
