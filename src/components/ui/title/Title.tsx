import { titleFont } from '@/config/fonts';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}



export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={ `ml-1 mt-2 sm:mt-3 ${ className }` }>
      <h1 className={ `${ titleFont.className } antialiased text-2xl sm:text-3xl md:text-4xl font-semibold my-4 sm:my-7` }>
        { title }
      </h1>

      {
        subtitle && (
          <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-5">{ subtitle }</h3>
        )
      }

    </div>
  )
}