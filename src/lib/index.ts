import { Category, Product } from "@/src/interfaces";
import { promises as fs } from "fs";

export async function getData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  if (process.env.NODE_ENV === "development") {
    const res = await fs.readFile(process.cwd() + "/public/data.json", "utf8");
    return JSON.parse(res);
  } else {
    const res = await fetch("https://next-ecomm-one.vercel.app/data.json");
    return res.json();
  }
}

export async function getProducts(
  filter?: "category" | "search",
  filterValue?: string,
): Promise<Product[]> {
  const { products } = await getData();

  if (filter === undefined || filterValue === undefined) {
    return products;
  }

  switch (filter) {
    case "category":
      return products.filter(
        (product) =>
          product.category.toLowerCase() === filterValue.toLowerCase(),
      );
    case "search":
      const productsByProductTitle = products.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase()),
      );

      if (productsByProductTitle.length > 0) return productsByProductTitle;

      const productsByCategory = products.filter((product) =>
        product.category.toLowerCase().includes(filterValue.toLowerCase()),
      );

      if (productsByCategory.length > 0) return productsByCategory;

      return [];
    default:
      return products;
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const { products } = await getData();

  return products.find(
    (product) => product.id.toString() === handle || product.title === handle,
  );
}

export async function getCategories(): Promise<Category[]> {
  const { categories } = await getData();
  return categories;
}
