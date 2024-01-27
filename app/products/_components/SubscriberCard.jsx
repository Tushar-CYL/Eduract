import Link from "next/link"

const SubscriberCard = () => {
  return (
    <section>
      <div>
        <h4>See All Products</h4>
        <p style={{fontSize: '1rem'}}>Go back to see the entire catalogue.</p>
      </div>
      <Link href={'/products'} className="primary button">
        Back to Products
      </Link>
    </section>
  )
}

export default SubscriberCard