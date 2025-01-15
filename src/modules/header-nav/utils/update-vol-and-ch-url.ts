export const updateVolAndChUrl = ({
  url,
  newVol,
  newCh,
}: {
  url: string;
  newVol: number;
  newCh: number;
}) => {
  const volRegex = /vol\d+/;
  const chRegex = /ch\d+(\.\d+)?/;

  let updatedPath = url.replace(volRegex, `vol${newVol}`);
  updatedPath = updatedPath.replace(chRegex, `ch${newCh}`);

  return `${updatedPath}#page=0`;
};
