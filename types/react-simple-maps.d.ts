declare module "react-simple-maps" {
  import { ComponentType, ReactNode, SVGProps, MouseEvent } from "react";

  export interface ComposableMapProps {
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (position: { coordinates: [number, number]; zoom: number }) => void;
    onMove?: (position: { x: number; y: number; zoom: number; dragging: boolean }) => void;
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  export interface Geography {
    rsmKey: string;
    properties: Record<string, unknown>;
    type: string;
    id?: string;
    geometry?: Record<string, unknown>;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
    onClick?: (event: MouseEvent<SVGPathElement>) => void;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Graticule: ComponentType<Record<string, unknown>>;
  export const Sphere: ComponentType<Record<string, unknown>>;
  export const Marker: ComponentType<Record<string, unknown>>;
  export const Line: ComponentType<Record<string, unknown>>;
  export const Annotation: ComponentType<Record<string, unknown>>;
}
