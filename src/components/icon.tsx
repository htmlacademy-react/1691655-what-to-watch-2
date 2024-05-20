type SvgIconProps = {
  viewBoxSize: [number, number];
  iconRes: [number, number];
  linkHref: string;
}

function SvgIcon({viewBoxSize, iconRes, linkHref}: SvgIconProps): JSX.Element {
  return (
    <svg viewBox={`0 0 ${viewBoxSize[0]} ${viewBoxSize[1]}`} width={iconRes[0]} height={iconRes[1]}>
      <use xlinkHref={linkHref}></use>
    </svg>
  );
}

export default SvgIcon;
