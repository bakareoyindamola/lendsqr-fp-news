import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

export type ExtendedEdge = Edge | 'start' | 'end';

const propertySuffixMap = {
  top: 'Top',
  bottom: 'Bottom',
  left: 'Start',
  right: 'End',
  start: 'Start',
  end: 'End',
};

const edgeInsetMap: Record<string, Edge> = {
  start: 'left',
  end: 'right',
};

export type SafeAreaInsetsStyle<
  Property extends 'padding' | 'margin' = 'padding', // defaults to padding if no value is provided
  Edges extends Array<ExtendedEdge> = Array<ExtendedEdge>,
> = {
  [K in Edges[number] as `${Property}${Capitalize<K>}`]: number;
};

/**
 * A hook that can be used to create a safe-area-aware style object that can be passed directly to a View.
 */
export function useSafeAreaInsetsStyle<
  Property extends 'padding' | 'margin' = 'padding',
  Edges extends Array<ExtendedEdge> = [],
>(
  safeAreaEdges: Edges = [] as unknown as Edges,
  property: Property = 'padding' as Property,
): SafeAreaInsetsStyle<Property, Edges> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {}) as SafeAreaInsetsStyle<Property, Edges>;
}
