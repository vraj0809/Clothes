import uploadcloudinary from "../config/claudinary.js";
import Product from "../model/product-model.js";

export const addproduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      price,
      // bestseller,
      sizes,
      description,
      numberofproducts,
    } = req.body;

    const image1 = req.files?.image1
      ? await uploadcloudinary(req.files.image1[0].path)
      : null;

    const image2 = req.files?.image2
      ? await uploadcloudinary(req.files.image2[0].path)
      : null;

    const image3 = req.files?.image3
      ? await uploadcloudinary(req.files.image3[0].path)
      : null;

    const image4 = req.files?.image4
      ? await uploadcloudinary(req.files.image4[0].path)
      : null;

    const productdata = {
      name,
      brand,
      category,
      subcategory: subcategory?.trim() || "Topwear",
      price: Number(price),
      // bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      description,
      numberofproducts: typeof numberofproducts === 'string' ? JSON.parse(numberofproducts) : numberofproducts,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productdata);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Add product error",
    });
  }
};

export const updateproduct = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      brand,
      category,
      subcategory,
      price,
      // bestseller,
      sizes,
      description,
      numberofproducts
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }


    const image1 = req.files?.image1
      ? await uploadcloudinary(req.files.image1[0].path)
      : product.image1;

    const image2 = req.files?.image2
      ? await uploadcloudinary(req.files.image2[0].path)
      : product.image2;

    const image3 = req.files?.image3
      ? await uploadcloudinary(req.files.image3[0].path)
      : product.image3;

    const image4 = req.files?.image4
      ? await uploadcloudinary(req.files.image4[0].path)
      : product.image4;



    const updatedproduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        brand,
        category,
        subcategory: subcategory?.trim() || product.subcategory || "Topwear",
        price: Number(price),
        // bestseller: bestseller === "true",
        sizes: JSON.parse(sizes),
        description,
        image1,
        image2,
        image3,
        image4,
        numberofproducts: typeof numberofproducts === 'string' ? JSON.parse(numberofproducts) : numberofproducts,
      },
      { new: true }
    );


    return res.status(200).json({
      success: true,
      product: updatedproduct
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Update product error"
    });

  }
};
export const listproduct = async (req, res) => {

  try {
    const product = await Product.find()
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "list product error",
    });
  }

}

export const removeproduct = async (req, res) => {
  try {
    console.log(req.params)
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id)
    return res.status(200).json(product);
  } catch (error) {
    console.log(error, "errro in remove");
    return res.status(500).json({
      success: false,
      message: "remove product error",
    });
  }
}

export const filterproduct = async (req, res) => {
  try {

    const { category, subcategory, sort, maxprice, search } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (subcategory) {
      filter.subcategory = subcategory;
    }

    if (search) {
      filter.$or = [
         { category: { $regex: search, $options: "i" } },
        { subcategory: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ];
    }

    if (maxprice) {
      filter.price = { $lt: Number(maxprice) };
    }

    let sortOption = {};

    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "latest") sortOption.createdAt = -1;

    const products = await Product.find(filter).sort(sortOption);

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: "Filter problem" });
  }
};

export const fetchsingleproduct = async (req, res) => {
  const { id } = req.params
  const singleproduct = await Product.findById(id)
  try {
    if (singleproduct) {
      return res.status(200).json(singleproduct)
    } else {
      return res.status(500).json({ message: "errro in single product fetch" })
    }
  } catch (error) {
    return res.status(500).json({ message: "errro in single product fetch", error })
  }
}

export const rating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingRatingIndex = product.ratings.findIndex(r => r.userId === req.userId);

    if (existingRatingIndex !== -1) {
      product.ratings[existingRatingIndex].rating = rating;
      product.ratings[existingRatingIndex].comment = comment;
      product.ratings[existingRatingIndex].date = Date.now();
      product.markModified('ratings');
    } else {
      product.ratings.push({
        userId: req.userId,
        rating: rating,
        comment: comment,
        date: Date.now()
      });
    }

    await product.save();
    return res.status(200).json({ message: "Rating added successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Error in rating", error })
  }
}

export const ratingcount = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    const ratings = product.ratings;

    const avg = Math.round(
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    );

    console.log(avg);

    return res.status(200).json(avg);
  } catch (error) {
    return res.status(500).json({ message: "Error in rating count", error })
  }
}

export const numberofproducts = async (req, res) => {
  try {
    const { id, quentity, size } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const sizeKey = size.toUpperCase();
    if (product.numberofproducts[sizeKey] !== undefined) {
      product.numberofproducts[sizeKey] -= Number(quentity);
      product.markModified('numberofproducts');
      await product.save();
      return res.status(200).json({ message: "Stock updated successfully" });
    } else {
      return res.status(400).json({ message: "Invalid size" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in number of products", error })
  }
}