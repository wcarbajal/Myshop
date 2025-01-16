"use client";

import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";

import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from 'next/navigation';
import { ViewImage } from '@/components';
import { Brands, Measure } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from './Modal';

interface Props {
  productIn: Partial<Product> & { ProductImage?: ProductWithImage[]; };
  categories: Category[];
  brands: Brands[];
}

const sizes = [ "XS", "S", "M", "L", "XL", "XXL" ];

interface FormInputs {
  codigoean13: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  brandId: string; //todo: brand field
  descriptionMeasure: string; //todo: descriptionMeasure field
  measure: Measure; //todo: measure field

  sizes?: string[];
  tags: string;
  gender?: "men" | "women" | "kid" | "unisex";
  categoryId: string;



  images?: FileList;
}

export const ProductForm = ( { productIn, categories, brands }: Props ) => {


  const [ isModalOpen, setIsModalOpen ] = useState( false );

  const openModal = () => { setIsModalOpen( true ); };
  const closeModal = () => { setIsModalOpen( false ); };

  const router = useRouter();


  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>( {
    defaultValues: {
      codigoean13: productIn.codigoean13 ?? '',
      title: productIn.title ?? '',
      slug: productIn.slug ?? '',
      description: productIn.description ?? '',
      price: productIn.price ?? 0,
      inStock: productIn.inStock ?? 0,
      brandId: productIn.brand?.id ?? '',
      descriptionMeasure: productIn.descriptionMeasure ?? '',
      measure: productIn.measure ?? 'nodefinido',
      sizes: productIn.sizes ?? [],
      tags: productIn.tags?.join( ", " ) ?? '',
      gender: productIn.gender ?? 'unisex',
      categoryId: productIn.categoryId ?? '',
      images: undefined,
    },
  } );

  /* const onSizeChanged = ( size: string ) => {
    const sizes = new Set( getValues( "sizes" ) );
    sizes.has( size ) ? sizes.delete( size ) : sizes.add( size );
    setValue( "sizes", Array.from( sizes ) );
  }; */

  const onSubmit = async ( data: FormInputs ) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if ( productIn.id ) {
      formData.append( "id", productIn.id ?? "" );
    }

    formData.append( "title", productToSave.title );
    formData.append( "codigoean13", productToSave.codigoean13 );
    formData.append( "slug", productToSave.slug );
    formData.append( "description", productToSave.description );
    formData.append( "price", productToSave.price.toString() );
    formData.append( "inStock", productToSave.inStock.toString() );    
    formData.append( "tags", productToSave.tags );
    formData.append( "categoryId", productToSave.categoryId );
    formData.append( "gender", productToSave.gender ?? 'unisex' );
    formData.append( "brandId", productToSave.brandId );
    formData.append( "descriptionMeasure", productToSave.descriptionMeasure );
    formData.append( "measure", productToSave.measure );

    if ( images ) {
      for ( let i = 0; i < images.length; i++ ) {
        formData.append( 'images', images[ i ] );
      }
    }



    const { ok, product } = await createUpdateProduct( formData );

    if ( !ok ) {
      
      alert( 'Producto no se pudo actualizar' );
      return;
    }

    router.replace( `/admin/product/${ product?.slug }` );


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */ }

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Código de barras</span>
          <div className="flex gap-2">
            <input
            
              type="text"
              className="p-2 border rounded-md bg-gray-200 w-full"
              { ...register( "codigoean13", {
                required: {
                  value: true,
                  message: "El Código de barras  es obligatorio",
                },
                pattern: {
                  value: /^[0-9]{13}$/i,
                  message: "Formato de código EAN-13 inválido",
                }

              } ) }
              tabIndex={1} 
            />
            <button tabIndex={2}  className="btn-primary" onClick={ openModal } type='button'>Escanear</button>

            <Modal isOpen={ isModalOpen } onClose={ closeModal }>
              <h2>Hello, Im a Modal</h2>
              <p>This is a simple modal example without using react-modal.</p>
            </Modal>
          </div>
        </div>
        {
          errors.codigoean13 && (
            <span className="text-md text-red-500">{ errors.codigoean13.message }</span>
          )
        }
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
          tabIndex={4}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "title", {
              required: {
                value: true,
                message: "El título es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El título debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El título no debe tener más de 50 caracteres",
              },
            } ) }
          />
        </div>
        {
          errors.title && (
            <span className="text-md text-red-500">{ errors.title.message }</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
          tabIndex={6}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "slug", {
              required: {
                value: true,
                message: "El slug es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El slug debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El slug no debe tener más de 50 caracteres",
              },

            } ) }
          />
        </div>

        {
          errors.slug && (
            <span className="text-md text-red-500">{ errors.slug.message }</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
          tabIndex={7}
            rows={ 5 }
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "description", { required: true } ) }
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Marca</span>
          <select
          tabIndex={8}

            className="p-2 border rounded-md bg-gray-200"
            { ...register( "brandId", { required: true } ) }

          >
            <option value="">[Seleccione]</option>
            {
              brands.map( marca => (
                <option key={ marca.id } value={ marca.id }>
                  { marca.name }
                </option>
              ) )
            }

          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Medida</span>
          <select
          tabIndex={9}
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "measure", { required: true } ) }

          >
            <option value="">[Seleccione]</option>
            <option value="barra" >Barra </option>
            <option value="bolsa" >Bolsa </option>
            <option value="botella" >Botella </option>
            <option value="caja" >Caja </option>
            <option value="frasco" >Frasco </option>
            <option value="galonera" >Galonera </option>
            <option value="gramo" >Gramo </option>
            <option value="kilogramo">Kilogramo </option>
            <option value="lata" >lata </option>
            <option value="litro" >litro </option>
            <option value="mililitro" >mililitro </option>
            <option value="pack" >pack </option>
            <option value="paquete" >paquete </option>
            <option value="tetrapack" >tetrapack </option>
            <option value="unidad" >unidad </option>
            <option value="vaso" >vaso </option>
            <option value="nodefinido" >No denifnido </option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Detalle de medida</span>
          <input
          tabIndex={10}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "descriptionMeasure", { required: true } ) }
          />
        </div>


        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
          tabIndex={11}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "tags", { required: true } ) }
          />
        </div>

        {/* <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "gender", { required: true } ) }
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div> */}



        <button tabIndex={14} className="btn-primary w-full focus:font-bold focus:text-md">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */ }
      <div className="w-full">
      <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
          tabIndex={3} 
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "categoryId", { required: true } ) }
          >
            <option value="">[Seleccione]</option>
            { categories.map( ( category ) => (
              <option key={ category.id } value={ category.id }>
                { category.name }
              </option>
            ) ) }
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
          tabIndex={5} 

            type="number"
            min="0" step="0.10"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "price", { required: true, min: 0 } ) }
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
          tabIndex={7}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "inStock", { required: true, min: 0 } ) }
          />
        </div>

        {/* As checkboxes */ }
        <div className="flex flex-col">
          {/* <span>Tallas</span>
          <div className="flex flex-wrap">
            { sizes.map( ( size ) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={ size }
                onClick={ () => onSizeChanged( size ) }
                className={ clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white": getValues( "sizes" ).includes( size ),
                  }
                ) }
              >
                <span>{ size }</span>
              </div>
            ) ) }
          </div> */}

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
            tabIndex={13}
              type="file"
              { ...register( 'images' ) }
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            { productIn.ProductImage?.map( ( image ) => (
              <div key={ image.id }>
                <ViewImage
                  alt={ productIn.title ?? "" }
                  src={ image.url }
                  width={ 300 }
                  height={ 300 }
                  className="rounded-t shadow-md"
                />

                <button                
                  type="button"
                  onClick={ () => deleteProductImage( image.id, image.url ) }
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </form>
  );
};
