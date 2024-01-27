import { supabase } from "@/supabase";
import ProductCard from "./_components/ProductCard";

async function getProducts() {
  let { data: products, error } = await supabase.from("product").select("*");

  return products;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <div className="section bg-blue">
        <div className="container section-intro">
          <h1>The latest products</h1>
        </div>
      </div>
      <div className="section small">
        <div className="container">
          <ul className="product-card-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
