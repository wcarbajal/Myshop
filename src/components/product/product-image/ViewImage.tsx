import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>[ 'className' ];
  style?: React.StyleHTMLAttributes<HTMLImageElement>[ 'style' ];
  width: number;
  height: number;
}

export const ViewImage = ( {
  src,
  alt,
  className,
  style,
  width,
  height
}: Props ) => {

  const localSrc = ( src )
    ? src.startsWith( 'http' ) // https://urlcompletodelaimagen.jpg
      ? src
      : `/products/${ src }`
    : '/imgs/placeholder.jpg';

  return (
    <Image
      src={ localSrc }
      width={ width }
      height={ height }
      alt={ alt }
      className={ className }
      style={ style }
      priority={ true }
      unoptimized={ true }
      loading="eager"
      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
    />
  );
};
