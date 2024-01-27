import Image from "next/image";
import Link from "next/link";

const Card = ({ product }) => {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={`/assets/${product.slug}.png`}
          alt={product.name}
          width={720}
          height={480}
        ></Image>
      </Link>
      <header>
        <p>{product.name}</p>
      </header>
      <footer>
        <Link href={`/products/${product.slug}`}>See More</Link>

        <div>
          <span className="pill">{product.category}</span>
        </div>
      </footer>
    </article>
  );
};

export default Card;
