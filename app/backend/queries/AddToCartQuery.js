import formatePrice from "@/helpers/formatePrice";
import { cartModel } from "../models/CartModel";
import { ProductModel } from "../models/ProductModel";
import { dbConnect } from "../connection/dbConnect";
import { auth } from "@/auth";

export default async function AddToCartQuery(
  productId,
  quantity,
  userActiveSize
) {
  // Authenticate the user and get their ID
  const loggedAuth = await auth();
  const userId = loggedAuth?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated.",
    };
  }

  try {
    // Connect to the database
    await dbConnect();

    // Fetch product information for price, discount, and sizes
    const getProductInfo = await ProductModel.findById(productId).select([
      "price",
      "discount",
      "sizes",
    ]);

    if (!getProductInfo) {
      return {
        ok: false,
        message: "Product not found.",
      };
    }

    // Find the specific size in the product's sizes array
    const sizeInfo = getProductInfo?.sizes?.find(
      (size) => size.size === userActiveSize
    );

    // Validate size exists
    if (!sizeInfo) {
      return {
        ok: false,
        message: `Size ${userActiveSize} is not available for this product.`,
      };
    }

    // Check if size is in stock
    if (sizeInfo.stock === 0) {
      return {
        ok: false,
        message: `Size ${userActiveSize} is currently out of stock.`,
      };
    }

    // Check if requested quantity is available
    if (sizeInfo.stock < quantity) {
      return {
        ok: false,
        message: `Only ${sizeInfo.stock} item${
          sizeInfo.stock > 1 ? "s" : ""
        } available in size ${userActiveSize}.`,
      };
    }

    // Check if the product already exists in the user's cart with the same size
    const existingCartItem = await cartModel.findOne({
      productId: productId,
      userId: userId,
      size: userActiveSize, // Check for same size
    });

    // Format and clean up the price
    const originalPrice = formatePrice(
      getProductInfo.price,
      getProductInfo.discount
    );
    const cleanedStr = originalPrice.replace("BDT", "").trim();
    const getPrice = parseFloat(cleanedStr);

    if (existingCartItem) {
      // Calculate new total quantity
      const newTotalQuantity = existingCartItem.quantity + quantity;

      // Check if new total exceeds available stock
      if (newTotalQuantity > sizeInfo.stock) {
        return {
          ok: false,
          message: `Cannot add ${quantity} more items. You already have ${existingCartItem.quantity} in cart. Only ${sizeInfo.stock} available in size ${userActiveSize}.`,
        };
      }

      // Update existing cart item with new quantity
      const updatedCartItem = await cartModel.findByIdAndUpdate(
        existingCartItem._id,
        {
          quantity: newTotalQuantity, // Add to existing quantity
          price: getPrice, // Update price in case it changed
        },
        { new: true } // Return the updated document
      );

      if (updatedCartItem) {
        return {
          ok: true,
          message: `Cart updated. You now have ${newTotalQuantity} items of size ${userActiveSize}.`,
          data: JSON.parse(JSON.stringify(updatedCartItem)),
          action: "updated",
        };
      } else {
        return {
          ok: false,
          message: "Failed to update cart item.",
        };
      }
    }

    // Check if the same product exists in cart but with different size
    const existingCartItemDifferentSize = await cartModel.findOne({
      productId: productId,
      userId: userId,
      size: { $ne: userActiveSize }, // Different size
    });

    if (existingCartItemDifferentSize) {
      // User wants to add same product but different size
      // Create a new cart entry for this size
      const newCartItem = {
        productId,
        userId,
        quantity,
        size: userActiveSize,
        price: getPrice,
      };

      const response = await cartModel.create(newCartItem);

      if (response) {
        return {
          ok: true,
          message: `Size ${userActiveSize} added to cart. You also have size ${existingCartItemDifferentSize.size} in your cart.`,
          data: JSON.parse(JSON.stringify(response)),
          action: "created",
        };
      } else {
        return {
          ok: false,
          message: "Failed to add item to the cart.",
        };
      }
    }

    // Create a new cart item if it doesn't exist
    const newCartItem = {
      productId,
      userId,
      quantity,
      size: userActiveSize,
      price: getPrice,
    };

    const response = await cartModel.create(newCartItem);

    if (response) {
      return {
        ok: true,
        message: `Item successfully added to cart (Size: ${userActiveSize}, Qty: ${quantity}).`,
        data: JSON.parse(JSON.stringify(response)),
        action: "created",
      };
    } else {
      return {
        ok: false,
        message: "Failed to add item to the cart.",
      };
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    return {
      ok: false,
      message: "An error occurred while adding to the cart.",
    };
  }
}
