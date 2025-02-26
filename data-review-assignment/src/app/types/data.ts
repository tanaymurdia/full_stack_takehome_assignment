export type Error = {
  message: string;
  severity: 'critical' | 'warning' | 'valid';
};

export type Record = {
  id: string;
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  status: string;
  errors: {
    [key: string]: Error;
  };
};

export type SortDirection = 'none' | 'asc' | 'desc';
export type SortConfig = {
  column: string;
  direction: SortDirection;
}; 