const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' }
  ];
  
  const productIdToFind = 2;
  
  const foundProduct = products.find(product => product.id === productIdToFind);
  
  if (foundProduct) {
    console.log('Found product:', foundProduct);
  } else {
    console.log('Product not found');
  }