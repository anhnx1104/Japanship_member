import { SVGAttributes } from 'react';

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  spin?: boolean;
  isActive?: boolean;
  ref?: any;
}
