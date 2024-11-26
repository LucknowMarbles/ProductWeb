import productsData from './products.json';

export const productService = {
  getAllProducts: () => {
    return productsData.products;
  },
  

  deleteProduct: (productId) => {
    const index = productsData.products.findIndex(p => p.id === productId);
    if (index > -1) {
      productsData.products.splice(index, 1);
    }
  },

  // Export current data as JSON file
  exportData: () => {
    const dataStr = JSON.stringify(productsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Import data from JSON file
  importData: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          const data = JSON.parse(content);
          productsData.products = data.products;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
};