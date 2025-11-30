'use server';

import prisma from '@/lib/prisma';

interface OpenFoodFactsResponse {
  code: string;
  product?: {
    product_name?: string;
    product_name_es?: string;
    brands?: string;
    quantity?: string;
    categories?: string;
    image_url?: string;
    image_front_url?: string;
    nutriments?: {
      [ key: string ]: any;
    };
  };
  status: number;
  status_verbose: string;
}

interface UPCDatabaseResponse {
  code: string;
  total: number;
  items?: Array<{
    ean: string;
    title: string;
    description?: string;
    brand?: string;
    model?: string;
    category?: string;
    images?: string[];
    offers?: Array<{
      merchant: string;
      price: number;
      currency: string;
    }>;
  }>;
}

interface BarcodeLookupResponse {
  products?: Array<{
    barcode_number: string;
    barcode_type: string;
    barcode_formats: string;
    title: string;
    description?: string;
    brand?: string;
    manufacturer?: string;
    category?: string;
    images?: string[];
    stores?: Array<{
      name: string;
      price: string;
      currency_code: string;
    }>;
  }>;
}

interface ProductInfo {
  found: boolean;
  barcode: string;
  name?: string;
  brand?: string;
  description?: string;
  quantity?: string;
  category?: string;
  imageUrl?: string;
  images?: string[]; // Array de URLs de imágenes
  price?: number;
  source?: string;
  rawData?: any;
}

/**
 * Busca información de producto en Open Food Facts (productos alimenticios)
 */
async function searchOpenFoodFacts( barcode: string ): Promise<ProductInfo> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${ barcode }.json`,
      {
        headers: {
          'User-Agent': 'MyShop - Product Scanner',
        },
      }
    );

    if ( !response.ok ) {
      throw new Error( `HTTP error! status: ${ response.status }` );
    }

    const data: OpenFoodFactsResponse = await response.json();

    if ( data.status === 1 && data.product ) {
      const product = data.product;

      // Recopilar todas las imágenes disponibles
      const images: string[] = [];
      if ( product.image_front_url ) images.push( product.image_front_url );
      if ( product.image_url && product.image_url !== product.image_front_url ) {
        images.push( product.image_url );
      }

      return {
        found: true,
        barcode,
        name: product.product_name_es || product.product_name || 'Sin nombre',
        brand: product.brands || 'Sin marca',
        description: product.product_name || '',
        quantity: product.quantity || '',
        category: product.categories?.split( ',' )[ 0 ]?.trim() || 'Sin categoría',
        imageUrl: images[ 0 ] || '', // Primera imagen como principal
        images: images, // Array completo de imágenes
        source: 'Open Food Facts',
        rawData: product,
      };
    }

    return { found: false, barcode };
  } catch ( error ) {
    console.error( 'Error en Open Food Facts:', error );
    return { found: false, barcode };
  }
}

/**
 * Busca información de producto en UPC Database (productos generales)
 */
async function searchUPCDatabase( barcode: string ): Promise<ProductInfo> {
  try {
    // API Trial - No requiere key pero tiene límite de 100/día
    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${ barcode }`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'MyShop - Product Scanner',
        },
      }
    );

    if ( !response.ok ) {
      throw new Error( `HTTP error! status: ${ response.status }` );
    }

    const data: UPCDatabaseResponse = await response.json();

    if ( data.code === 'OK' && data.items && data.items.length > 0 ) {
      const product = data.items[ 0 ];

      // Obtener el array de imágenes completo
      const images = product.images || [];

      return {
        found: true,
        barcode,
        name: product.title || 'Sin nombre',
        brand: product.brand || 'Sin marca',
        description: product.description || product.title || '',
        category: product.category || 'Sin categoría',
        imageUrl: images.length > 0 ? images[ 0 ] : '', // Primera imagen como principal
        images: images, // Array completo de imágenes
        price: product.offers && product.offers.length > 0 ? product.offers[ 0 ].price : undefined,
        source: 'UPC Database',
        rawData: product,
      };
    }

    return { found: false, barcode };
  } catch ( error ) {
    console.error( 'Error en UPC Database:', error );
    return { found: false, barcode };
  }
}

/**
 * Busca información de producto en la base de datos local
 * Permite reutilizar productos ya registrados anteriormente
 */
async function searchLocalDatabase( barcode: string ): Promise<ProductInfo> {
  try {
    const product = await prisma.product.findUnique( {
      where: { codigoean13: barcode },
      include: {
        brand: true,
        category: true,
        ProductImage: true,
      }
    } );

    if ( product ) {
      const images = product.ProductImage?.map( img => img.url ) || [];

      return {
        found: true,
        barcode,
        name: product.title,
        brand: product.brand?.name || 'Sin marca',
        description: product.description,
        quantity: product.descriptionMeasure || '',
        category: product.category?.name || 'Sin categoría',
        imageUrl: images[ 0 ] || '',
        images: images,
        price: product.price,
        source: 'Base de datos local',
        rawData: product,
      };
    }

    return { found: false, barcode };
  } catch ( error ) {
    console.error( 'Error en búsqueda local:', error );
    return { found: false, barcode };
  }
}

/**
 * Busca información de producto en Barcode Lookup
 * API premium con excelente cobertura global
 */
async function searchBarcodeLookup( barcode: string ): Promise<ProductInfo> {
  const apiKey = process.env.BARCODE_LOOKUP_API_KEY;

  if ( !apiKey ) {
    console.log( 'BARCODE_LOOKUP_API_KEY no configurado en .env' );
    return { found: false, barcode };
  }

  try {
    const response = await fetch(
      `https://api.barcodelookup.com/v3/products?barcode=${ barcode }&formatted=y&key=${ apiKey }`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MyShop - Product Scanner',
        },
      }
    );

    if ( !response.ok ) {
      // 404 es normal cuando el producto no está en la base de datos
      if ( response.status === 404 ) {
        console.log( 'Producto no encontrado en Barcode Lookup' );
      } else {
        console.error( `Barcode Lookup API error: ${ response.status }` );
      }
      return { found: false, barcode };
    }

    const data: BarcodeLookupResponse = await response.json();

    if ( data.products && data.products.length > 0 ) {
      const product = data.products[ 0 ];

      // Obtener imágenes
      const images = product.images || [];

      // Obtener precio si está disponible
      let price: number | undefined;
      if ( product.stores && product.stores.length > 0 ) {
        const priceStr = product.stores[ 0 ].price.replace( /[^0-9.]/g, '' );
        price = parseFloat( priceStr );
      }

      return {
        found: true,
        barcode,
        name: product.title || 'Sin nombre',
        brand: product.brand || product.manufacturer || 'Sin marca',
        description: product.description || product.title || '',
        category: product.category || 'Sin categoría',
        imageUrl: images[ 0 ] || '',
        images: images,
        price: price,
        source: 'Barcode Lookup',
        rawData: product,
      };
    }

    return { found: false, barcode };
  } catch ( error ) {
    console.error( 'Error en Barcode Lookup:', error );
    return { found: false, barcode };
  }
}

/**
 * Busca información de producto en EAN-Search.org
 * Nota: Requiere registrarse para obtener un token gratuito
 */
async function searchEANSearch( barcode: string, token?: string ): Promise<ProductInfo> {
  if ( !token ) {
    console.log( 'EAN-Search requiere token. Regístrate en: https://www.ean-search.org/ean-database-api.html' );
    return { found: false, barcode };
  }

  try {
    const response = await fetch(
      `https://api.ean-search.org/api?token=${ token }&op=barcode-lookup&ean=${ barcode }&format=json`
    );

    if ( !response.ok ) {
      throw new Error( `HTTP error! status: ${ response.status }` );
    }

    const data = await response.json();

    if ( data && data.length > 0 ) {
      const product = data[ 0 ];

      // EAN-Search solo retorna una imagen
      const images = product.imageUrl ? [ product.imageUrl ] : [];

      return {
        found: true,
        barcode,
        name: product.name || 'Sin nombre',
        description: product.name || '',
        category: product.categoryName || 'Sin categoría',
        imageUrl: product.imageUrl || '',
        images: images,
        source: 'EAN-Search',
        rawData: product,
      };
    }

    return { found: false, barcode };
  } catch ( error ) {
    console.error( 'Error en EAN-Search:', error );
    return { found: false, barcode };
  }
}

/**
 * Busca información del producto en múltiples APIs
 * Intenta primero con Open Food Facts (ideal para alimentos),
 * luego con UPC Database como respaldo
 */
export async function fetchProductByBarcode( barcode: string ): Promise<ProductInfo> {

  console.log( `Buscando producto con código de barras con : ${ barcode }` );

  // Validar código de barras
  if ( !barcode || barcode.length < 8 ) {
    return {
      found: false,
      barcode,
    };
  }

  // Buscar primero en la base de datos local
  console.log( 'Buscando en base de datos local...' );
  let result = await searchLocalDatabase( barcode );

  if ( result.found ) {
    console.log( '✅ Producto encontrado en base de datos local' );
    console.log( `Imágenes encontradas: ${ result.images?.length || 0 }` );
    return result;
  }

  // Si no está en local, intentar con Open Food Facts
  console.log( 'Buscando en Open Food Facts...' );
  result = await searchOpenFoodFacts( barcode );

  if ( result.found ) {
    console.log( 'Producto encontrado en Open Food Facts' );
    console.log( `Imágenes encontradas: ${ result.images?.length || 0 }` );
    return result;
  }

  // Si no se encuentra, intentar con Barcode Lookup (API premium)
  console.log( 'Buscando en Barcode Lookup...' );
  result = await searchBarcodeLookup( barcode );

  if ( result.found ) {
    console.log( 'Producto encontrado en Barcode Lookup' );
    console.log( `Imágenes encontradas: ${ result.images?.length || 0 }` );
    return result;
  }

  // Si no se encuentra, intentar con UPC Database
  console.log( 'Buscando en UPC Database...' );
  result = await searchUPCDatabase( barcode );

  if ( result.found ) {
    console.log( 'Producto encontrado en UPC Database' );
    console.log( `Imágenes encontradas: ${ result.images?.length || 0 }` );
    return result;
  }

  // Si tienes token de EAN-Search, puedes agregarlo aquí
  // const eanToken = process.env.EAN_SEARCH_TOKEN;
  // if (eanToken) {
  //   result = await searchEANSearch(barcode, eanToken);
  //   if (result.found) return result;
  // }

  console.log( 'Producto no encontrado en ninguna API' );
  return {
    found: false,
    barcode,
  };
}
