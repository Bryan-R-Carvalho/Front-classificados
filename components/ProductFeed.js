import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid gird-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .filter(
          (product) =>
            product.aprovado === true && product.disponibilidade === true
        )
        .slice(0, 4)
        .map(({ id, nome, descricao, categoria, foto, delivery }) => (
          <Product
            key={id}
            id={id}
            nome={nome}
            descricao={descricao}
            categoria={categoria}
            foto={foto}
            delivery={delivery}
          />
        ))}
      <img
        className="md:col-span-full w-full"
        src="https://canaisdigitaissitebr-wordpress.azurewebsites.net/wp-content/uploads/2021/01/banner-interno-atlantica-localiza.png"
        alt=""
      />
      <div className="md:col-span-2">
        {products
          .filter(
            (product) =>
              product.aprovado === true && product.disponibilidade === true
          )
          .slice(4, 5)
          .map(({ id, nome, descricao, categoria, delivery }) => (
            <Product
              key={id}
              id={id}
              nome={nome}
              descricao={descricao}
              categoria={categoria}
              foto={foto}
              delivery={delivery}
            />
          ))}
      </div>
      {products
        .filter(
          (product) =>
            product.aprovado === true && product.disponibilidade === true
        )
        .slice(5, products.lenght)
        .map(({ id, nome, descricao, categoria, delivery }) => (
          <Product
            key={id}
            id={id}
            nome={nome}
            descricao={descricao}
            categoria={categoria}
            foto={foto}
            delivery={delivery}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
