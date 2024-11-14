interface CreateMaskComponent {
  mask?: Record<string, string>;
  pictureClass: string;
  imgClass: string;
  src: string;
  alt: string;
}

export const CreateMaskComponent = ({
  mask,
  pictureClass,
  imgClass,
  src,
  alt,
}: CreateMaskComponent) => {
  return (
    <picture style={mask} className={pictureClass}>
      <img className={imgClass} src={src} alt={alt} />
    </picture>
  );
};
