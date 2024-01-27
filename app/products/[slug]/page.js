"use client";

import { supabase } from "@/supabase";
import Image from "next/image";
import PromoCard from "../_components/PromoCard";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SubscriberCard from "../_components/SubscriberCard";

const Product = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [productContent, setProductContent] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
    };

    getData();
  }, []);

  useEffect(() => {
    const getProductData = async () => {
      let { data: productData } = await supabase
        .from("product")
        .select("*")
        .eq("slug", params.slug)
        .single();

      setProduct(productData);

      const { data: productContentData } = await supabase
        .from("product_content")
        .select("*")
        .eq("id", productData.product_content_id)
        .single();

      setProductContent(productContentData);
    };

    getProductData();
  }, [params]);

  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url && (
            <a
              href={`/assets/${productContent.download_url}`}
              download
              className="download-link large-button"
            >
              <span className="large-button-text">Download</span>
            </a>
          )}
          {productContent?.video_url ? (
            <ReactPlayer
              controls
              url={productContent.video_url}
            />
          ) : (
            <Image
              src={`/assets/${product?.slug}.png`}
              alt={product?.name}
              width={1000}
              height={300}
            />
          )}
        </div>
        <section>
          <header>
            <h3>{product?.name}</h3>
          </header>
          <section>
            <div>
              <p>{product?.description}</p>
            </div>
          </section>
        </section>
        <section>{session ? <SubscriberCard /> : <PromoCard />}</section>
      </article>
    </section>
  );
};

export default Product;
