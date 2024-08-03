import Img from '@/ui/Img';

// Define the type for a single gallery image
type GalleryImage = {
  _key: string; // Ensure _key is included for key prop
  title: string;
  image: Sanity.Image; // Ensure this matches what Img expects
  size: string;
};

// Define the props type for the PhotoGallery component
type PhotoGalleryProps = {
  title: string; // Include title in the props
  images: GalleryImage[];
};

export default function PhotoGallery({ title, images }: PhotoGalleryProps) {
  return (
    <section className="section grid gap-x-4 gap-y-8">
      {/* Display the gallery title */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Grid for gallery images */}
      <div className="grid text-center grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <div key={image._key} className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Img
                image={image.image} // Pass the image object
                alt={image.title}
                className="pointer-events-none object-cover group-hover:opacity-75"
                width={300}
                height={300}
              />
              <button type="button" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View details for {image.title}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{image.title}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{image.size}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
