import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Dummy_Products = [
  { id: 'p1', title: 'My first Book', price: 6, description: 'This is first book I ever wrote' },
  { id: 'p2', title: 'My second Book', price: 6, description: 'This second book I ever wrote' },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_Products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
