type Property = {
  type: string;
  key: string;
  name: string;
};

export interface PreTemplate<T> {
  id: string;
  name: string;
  thumbnail: string;
  f: React.FC<T>;
  props: Property[];
  defaultProps: T;
}
