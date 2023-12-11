import { useState, useEffect } from 'react';

interface CategoryData {
  name: string;
  value: number;
}

const useCategoryData = (refresh: number): CategoryData[] => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetch(`http://3.84.112.106/budget`)
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((category: any) => ({
          name: category.category_name,
          value: category.amount_spent, 
        }));
        setCategories(processedData);
      })
      .catch((error) => console.error('Error fetching category data:', error));
  }, [refresh]);

  return categories;
};

export default useCategoryData;
