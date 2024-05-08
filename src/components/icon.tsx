type SvgIconProps = {
  iconRes: [number, number];
  linkHref: string;
}

function SvgIcon({iconRes, linkHref}: SvgIconProps): JSX.Element {
  return (
    <svg viewBox="0 0 19 19" width={iconRes[0]} height={iconRes[1]}>
      <use xlinkHref={linkHref}></use>
    </svg>
  );
}

export default SvgIcon;
