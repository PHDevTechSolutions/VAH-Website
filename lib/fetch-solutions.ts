'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  pdfUrl: string;
}

export interface Series {
  id: string;
  name: string;
  products: Product[];
}

export interface Solution {
  id: string;
  index: number;
  title: string;
  description: string;
  mainImage?: string;
  series: Series[];
}

export async function fetchAllSolutions(): Promise<Solution[]> {
  try {
    // Fetch all solutions ordered by createdAt
    const solutionsRef = collection(db, 'solutions');
    const solutionsQuery = query(solutionsRef, orderBy('createdAt', 'asc'));
    const solutionsDocs = await getDocs(solutionsQuery);

    const solutions: Solution[] = [];

    // Process each solution
    for (const solutionDoc of solutionsDocs.docs) {
      const solutionData = solutionDoc.data();

      // Fetch series subcollection
      const seriesRef = collection(db, 'solutions', solutionDoc.id, 'series');
      const seriesDocs = await getDocs(seriesRef);

      const series: Series[] = [];

      // Process each series
      for (const seriesDoc of seriesDocs.docs) {
        const seriesData = seriesDoc.data();

        // Fetch products subcollection
        const productsRef = collection(
          db,
          'solutions',
          solutionDoc.id,
          'series',
          seriesDoc.id,
          'products'
        );
        const productsDocs = await getDocs(productsRef);

        const products: Product[] = [];

        // Process each product
        for (const productDoc of productsDocs.docs) {
          const productData = productDoc.data();
          products.push({
            id: productDoc.id,
            name: productData.name || '',
            pdfUrl: productData.pdfUrl || '',
          });
        }

        series.push({
          id: seriesDoc.id,
          name: seriesData.name || '',
          products,
        });
      }

      solutions.push({
        id: solutionDoc.id,
        index: solutionData.index || solutions.length + 1,
        title: solutionData.title || '',
        description: solutionData.description || '',
        mainImage: solutionData.mainImage,
        series,
      });
    }

    return solutions;
  } catch (error) {
    console.error('Error fetching solutions from Firestore:', error);
    return [];
  }
}
