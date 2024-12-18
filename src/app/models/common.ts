
export interface PaginationData<T> {
    data?: Array<T>;
    totalElements?: number;
    totalPages?: number;
    totalAll?: number;
}

export interface EditModal<T> {
    title: string;
    action: string
    data?: T;
}