export const base64ToSvgStr = (base64Data?: string) => {
  const data = base64Data?.replace('data:image/svg+xml;base64,', '');
  // return atob(data || svgEmpty);
  return data && atob(data);
};

export const getSvgAspect = (svg: string) => {
  let aspect = 1;
  try {
    const re = /viewBox="(.[0-9 ]*)"/;
    const aspectStr = re.exec(svg);
    if (aspectStr) {
      // Use capture group 1
      const aspectValues = aspectStr[1].split(' ');
      // Values "x y w h"
      aspect = Number(aspectValues[2] || 0) / Number(aspectValues[3] || 0);
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (e: any) {
    aspect = 1;
  }
  return aspect;
};
